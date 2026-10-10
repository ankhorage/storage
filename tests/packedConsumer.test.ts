import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { expect, test } from 'bun:test';

/*** Run a command and report its output when the packed-consumer boundary fails. */
const runAsync = async (command: string[], cwd: string): Promise<void> => {
  const process = Bun.spawn(command, { cwd, stderr: 'pipe', stdout: 'pipe' });
  const exitCode = await process.exited;

  if (exitCode === 0) return;

  throw new Error(
    `${command.join(' ')} failed:\n${await new Response(process.stdout).text()}${await new Response(process.stderr).text()}`,
  );
};

test('packed fresh consumer imports every public entrypoint', async () => {
  const consumerDirectory = await mkdtemp(join(tmpdir(), 'ankhorage-storage-consumer-'));

  try {
    await runAsync(
      ['bun', 'pm', 'pack', '--destination', consumerDirectory, '--quiet'],
      process.cwd(),
    );
    const packedFiles = await Array.fromAsync(
      new Bun.Glob('*.tgz').scan({ cwd: consumerDirectory }),
    );
    const packedTarball = packedFiles.at(0);

    expect(packedTarball).toBeDefined();
    await writeFile(join(consumerDirectory, 'package.json'), '{"type":"module"}\n');
    await runAsync(['bun', 'add', `./${packedTarball}`], consumerDirectory);
    const requireFromStorage = createRequire(
      join(consumerDirectory, 'node_modules', '@ankhorage', 'storage', 'package.json'),
    );
    expect(requireFromStorage.resolve('@ankhorage/capability')).toContain('@ankhorage/capability');
    await writeFile(
      join(consumerDirectory, 'consumer.ts'),
      `import type { StoragePort } from '@ankhorage/storage';
import { CAPABILITIES } from '@ankhorage/storage/capabilities';
import packageManifest from '@ankhorage/storage/package.json' with { type: 'json' };

type ConsumerStoragePort = StoragePort;
if (CAPABILITIES.length !== 4 || packageManifest.name !== '@ankhorage/storage') throw new Error('public entrypoint failed');
void (undefined as ConsumerStoragePort | undefined);
`,
    );
    await runAsync(['bun', 'consumer.ts'], consumerDirectory);
  } finally {
    await rm(consumerDirectory, { force: true, recursive: true });
  }
});
