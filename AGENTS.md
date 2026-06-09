# Agent 指南

本仓库是一个 **npm 多包 monorepo**，用于发布个人/团队的 npm 包。AI 助手在本仓库中工作时，必须遵循 `.cursor/rules/` 下的全部规则。

## 项目目标

- 在 `packages/` 下维护多个独立、可发布的 npm 包
- 每个包应有清晰的 API 边界、类型定义、测试与文档
- 通过统一的工具链（TypeScript、ESLint、Prettier、测试、构建）保证质量
- 发布流程可重复、可审计、可回滚

## 目录结构（预期）

```
monorepo_packages/
├── packages/              # 各 npm 包源码
│   └── utils/             # @xiaohei998/utils
├── .cursor/rules/         # AI 与开发规范
├── .github/workflows/     # CI + Release
├── .changeset/            # Changesets 版本管理
├── scripts/               # create-package 等脚本
├── AGENTS.md              # 本文件
├── package.json           # 根 workspace 配置
├── pnpm-workspace.yaml
├── turbo.json             # Turborepo 任务编排
├── tsconfig.base.json
├── eslint.config.js
└── vitest.config.ts
```

## AI 工作原则

1. **先读规则再动手**：修改代码前确认适用的 `.cursor/rules/*.mdc`
2. **最小改动**：只改与任务相关的文件，不顺手重构无关代码
3. **不擅自提交/发布**：除非用户明确要求，不执行 git commit、npm publish
4. **不重复搭建**：monorepo 工具链已就绪，新增包用 `pnpm create-package <name>`
5. **中文沟通、英文代码**：与用户用中文交流；代码、注释、提交信息、API 命名用英文
6. **遵循现有约定**：新代码必须与已有包的风格、结构、依赖保持一致

## 规则索引

| 规则文件 | 适用范围 |
|---------|---------|
| `project-core.mdc` | 全局：monorepo 核心约定 |
| `ai-agent-behavior.mdc` | 全局：AI 行为约束 |
| `typescript.mdc` | `*.ts` / `*.tsx` |
| `eslint-prettier.mdc` | 代码风格与 lint |
| `monorepo-packages.mdc` | `packages/**` 包结构与依赖 |
| `npm-publishing.mdc` | 发布、版本、exports |
| `testing.mdc` | 测试文件与测试策略 |
| `documentation.mdc` | README、JSDoc、CHANGELOG |
| `security-deps.mdc` | 安全与依赖管理 |

## 常用命令（搭建完成后）

```bash
pnpm install          # 安装依赖
pnpm build            # 构建所有包
pnpm test             # 运行测试
pnpm lint             # ESLint 检查
pnpm typecheck        # TypeScript 类型检查
pnpm changeset        # 创建版本变更记录
pnpm create-package   # 脚手架创建新包
```

## npm scope

所有包使用 scope **`@xiaohei998`**，与 GitHub 账号一致。
