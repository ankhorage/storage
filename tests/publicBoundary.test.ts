import { readFile } from 'node:fs/promises';

import { describe, expect, test } from 'bun:test';

describe('public boundary', () => {
  test('does not expose provider-specific concepts or alternate capability operations', async () => {
    const publicSources = await Promise.all([
      readFile('src/index.ts', 'utf8'),
      readFile('src/features/storage/StoragePort.ts', 'utf8'),
      readFile('src/capabilities/index.ts', 'utf8'),
    ]);

    expect(publicSources.join('\n')).not.toMatch(/supabase|\br2\b|credential|publicUrl|signedUrl/i);
  });
});
