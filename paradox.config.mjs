export default {
  mode: 'write',
  docs: {
    title: 'Ankhorage Storage',
    description: 'Provider-neutral object-storage execution and capabilities for Ankhorage.',
  },
  package: {
    entrypoints: ['src/index.ts', 'src/capabilities/index.ts'],
  },
  output: {
    dir: 'paradox',
  },
};
