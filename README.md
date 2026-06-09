# monorepo_packages

用于发布个人 npm 包的 **pnpm monorepo** 仓库。

## 技术栈

| 工具 | 用途 |
|------|------|
| [pnpm workspaces](https://pnpm.io/workspaces) | 包管理与 workspace 依赖 |
| [Turborepo](https://turbo.build/) | 任务编排与构建缓存 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全（strict 模式） |
| [tsup](https://tsup.egoist.dev/) | 库构建（ESM + CJS + d.ts） |
| [Vitest](https://vitest.dev/) | 单元测试 |
| [ESLint 9](https://eslint.org/) + [Prettier](https://prettier.io/) | 代码检查与格式化 |
| [Changesets](https://github.com/changesets/changesets) | 版本管理与 npm 发布 |

## 目录结构

```
monorepo_packages/
├── .changeset/          # Changesets 配置
├── .github/workflows/   # CI / Release 流水线
├── .cursor/rules/       # AI 开发规范
├── packages/            # npm 包
│   └── utils/           # @xiaohei998/utils
├── scripts/             # 脚手架脚本
├── package.json         # 根 workspace
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── eslint.config.js
└── vitest.config.ts
```

## 快速开始

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 开发模式（watch）
pnpm dev

# 代码检查
pnpm lint
pnpm typecheck
pnpm format:check

# 运行测试
pnpm test
```

## 新增包

```bash
pnpm create-package my-lib
```

创建后执行 `pnpm install` 即可。

## 发布流程

1. 开发完成后创建 changeset：

   ```bash
   pnpm changeset
   ```

2. 合并到 `main` 后，Release workflow 会自动：
   - 创建「Version Packages」PR（更新版本号与 CHANGELOG）
   - 合并该 PR 后自动 `npm publish`

3. 本地手动发布（需配置 `NPM_TOKEN`）：

   ```bash
   pnpm version-packages   # 更新版本
   pnpm release            # 构建 + 发布
   ```

## 包列表

| 包名 | 描述 |
|------|------|
| [`@xiaohei998/utils`](./packages/utils) | 通用工具函数 |

## CI

- **CI**：push/PR 到 `main` 时运行 format、lint、typecheck、test、build
- **Release**：push 到 `main` 时通过 Changesets 自动发版

发布前请在 GitHub 仓库 Settings → Secrets 中配置 `NPM_TOKEN`。

## License

MIT
