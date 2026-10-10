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

/*** Publish the canonical provider-neutral object-storage capability catalog. */
export const CAPABILITIES = [
  {
    id: 'storage.upload',
    owner: '@ankhorage/storage',
    access: ['invoke'],
    binding: { kind: 'storage', bindableAs: [] },
    input: { schema: STORAGE_UPLOAD_INPUT_SCHEMA },
    output: { schema: STORAGE_UPLOAD_OPERATION_RESULT_SCHEMA },
  },
  {
    id: 'storage.remove',
    owner: '@ankhorage/storage',
    access: ['invoke'],
    binding: { kind: 'storage', bindableAs: [] },
    input: { schema: STORAGE_REMOVE_INPUT_SCHEMA },
    output: { schema: STORAGE_VOID_RESULT_SCHEMA },
  },
  {
    id: 'storage.list',
    owner: '@ankhorage/storage',
    access: ['read'],
    binding: { kind: 'storage', bindableAs: [] },
    input: { schema: STORAGE_LIST_INPUT_SCHEMA },
    output: { schema: STORAGE_LIST_OPERATION_RESULT_SCHEMA },
  },
  {
    id: 'storage.resolve',
    owner: '@ankhorage/storage',
    access: ['read'],
    binding: { kind: 'storage', bindableAs: [] },
    input: { schema: STORAGE_RESOLVE_INPUT_SCHEMA },
    output: { schema: STORAGE_RESOLVE_OPERATION_RESULT_SCHEMA },
  },
] as const satisfies readonly Capability[];
