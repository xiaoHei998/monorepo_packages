#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCOPE = '@xiaohei998';

const packageName = process.argv[2];

if (!packageName) {
  console.error('Usage: pnpm create-package <name>');
  console.error('Example: pnpm create-package string-utils');
  process.exit(1);
}

if (!/^[a-z][a-z0-9-]*$/.test(packageName)) {
  console.error('Package name must be kebab-case (e.g. my-utils)');
  process.exit(1);
}

const rootDir = join(fileURLToPath(new URL('..', import.meta.url)));
const pkgDir = join(rootDir, 'packages', packageName);
const scopedName = `${SCOPE}/${packageName}`;

const files = {
  'package.json': JSON.stringify(
    {
      name: scopedName,
      version: '0.0.0',
      description: `${packageName} package`,
      license: 'MIT',
      author: '黑仔',
      repository: {
        type: 'git',
        url: 'git+https://github.com/xiaoHei998/monorepo_packages.git',
        directory: `packages/${packageName}`,
      },
      type: 'module',
      main: './dist/index.cjs',
      module: './dist/index.js',
      types: './dist/index.d.ts',
      exports: {
        '.': {
          import: {
            types: './dist/index.d.ts',
            default: './dist/index.js',
          },
          require: {
            types: './dist/index.d.cts',
            default: './dist/index.cjs',
          },
        },
        './package.json': './package.json',
      },
      files: ['dist'],
      sideEffects: false,
      scripts: {
        build: 'tsup',
        dev: 'tsup --watch',
        lint: 'eslint src',
        typecheck: 'tsc --noEmit',
        test: 'vitest run',
        clean: 'rm -rf dist',
      },
      devDependencies: {
        tsup: '^8.5.0',
        typescript: '^5.8.3',
      },
      engines: {
        node: '>=18',
      },
      publishConfig: {
        access: 'public',
      },
    },
    null,
    2,
  ),
  'tsconfig.json': JSON.stringify(
    {
      extends: '../../tsconfig.base.json',
      compilerOptions: {
        rootDir: './src',
        noEmit: true,
      },
      include: ['src/**/*'],
      exclude: ['dist', 'node_modules'],
    },
    null,
    2,
  ),
  'tsup.config.ts': `import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
});
`,
  'vitest.config.ts': `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.ts'],
    environment: 'node',
  },
});
`,
  'README.md': `# ${scopedName}

${packageName} package.

## Installation

\`\`\`bash
pnpm add ${scopedName}
\`\`\`

## Usage

\`\`\`typescript
import {} from '${scopedName}';
\`\`\`

## License

MIT
`,
  'CHANGELOG.md': `# Changelog

## [Unreleased]

### Added

- Initial release
`,
  'src/index.ts': `export {};
`,
};

await mkdir(join(pkgDir, 'src'), { recursive: true });

for (const [relativePath, content] of Object.entries(files)) {
  await writeFile(join(pkgDir, relativePath), content);
}

console.log(`Created packages/${packageName}`);
console.log('');
console.log('Next steps:');
console.log('  1. pnpm install');
console.log('  2. Implement src/index.ts');
