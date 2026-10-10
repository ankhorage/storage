import { readFile } from 'node:fs/promises';

import type { Capability } from '@ankhorage/contracts/capability';
import {
  STORAGE_LIST_INPUT_SCHEMA,
  STORAGE_LIST_OPERATION_RESULT_SCHEMA,
  STORAGE_REMOVE_INPUT_SCHEMA,
  STORAGE_RESOLVE_INPUT_SCHEMA,
  STORAGE_RESOLVE_OPERATION_RESULT_SCHEMA,
  STORAGE_UPLOAD_INPUT_SCHEMA,
  STORAGE_UPLOAD_OPERATION_RESULT_SCHEMA,
  STORAGE_VOID_RESULT_SCHEMA,
} from '@ankhorage/contracts/storage';
import { describe, expect, test } from 'bun:test';

import { CAPABILITIES } from '../src/capabilities/index.js';

describe('storage capability catalog', () => {
  test('publishes exactly the four canonical descriptors with exact access and binding semantics', () => {
    expect(CAPABILITIES).toHaveLength(4);
    expect(CAPABILITIES.map((capability) => capability.id)).toEqual([
      'storage.upload',
      'storage.remove',
      'storage.list',
      'storage.resolve',
    ]);
    expect(CAPABILITIES.map((capability) => capability.owner)).toEqual([
      '@ankhorage/storage',
      '@ankhorage/storage',
      '@ankhorage/storage',
      '@ankhorage/storage',
    ]);
    expect(CAPABILITIES.map((capability) => capability.access)).toEqual([
      ['invoke'],
      ['invoke'],
      ['read'],
      ['read'],
    ]);
    expect(CAPABILITIES.map((capability) => capability.binding)).toEqual([
      { kind: 'storage', bindableAs: [] },
      { kind: 'storage', bindableAs: [] },
      { kind: 'storage', bindableAs: [] },
      { kind: 'storage', bindableAs: [] },
    ]);
  });

  test('uses released Contracts storage schemas without local copies', () => {
    expect(CAPABILITIES.map((capability) => capability.input?.schema)).toEqual([
      STORAGE_UPLOAD_INPUT_SCHEMA,
      STORAGE_REMOVE_INPUT_SCHEMA,
      STORAGE_LIST_INPUT_SCHEMA,
      STORAGE_RESOLVE_INPUT_SCHEMA,
    ]);
    expect(CAPABILITIES.map((capability) => capability.output?.schema)).toEqual([
      STORAGE_UPLOAD_OPERATION_RESULT_SCHEMA,
      STORAGE_VOID_RESULT_SCHEMA,
      STORAGE_LIST_OPERATION_RESULT_SCHEMA,
      STORAGE_RESOLVE_OPERATION_RESULT_SCHEMA,
    ]);
  });

  test('materializes the catalog into package metadata without drift', async () => {
    const packageManifest = JSON.parse(await readFile('package.json', 'utf8')) as {
      readonly ankh: { readonly capabilities: readonly Capability[] };
    };

    expect(packageManifest.ankh.capabilities).toEqual(CAPABILITIES);
  });
});
