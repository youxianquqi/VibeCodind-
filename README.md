# VibeCodind · 前端学习仓库

从零开始的前端学习路径与配套练习 / 考试项目。主线：**HTML/CSS → JS → Vue3 + 后台实战 → 原理深化 → TypeScript**，全程贯穿 AI 协作规范。

详细路线图见：[前端从零开始完整路径.md](./前端从零开始完整路径.md)

---

## 目录一览

| 目录 | 说明 |
|------|------|
| [stage0-quiz/](./stage0-quiz/) | 阶段 0：HTML/CSS 教材式练习（分课 + TODO，在编辑器里写） |
| [qualifying-exam/](./qualifying-exam/) | 前端综合客观考（科目一风格，多模块抽题） |
| [ai-exam/](./ai-exam/) | AI 协作编程专项考（独立科目，手机/电脑已适配） |
| [v3-admin-vite/](./v3-admin-vite/) | Vue3 后台模板参考（阶段 3） |
| [mini-vue/](./mini-vue/) | Vue 原理学习参考（阶段 4） |
| [Blog/](./Blog/) | 相关笔记与 demos |

---

## 快速开始

静态页面可直接用本地静态服务打开（任选其一）：

```bash
# 例：阶段 0
npx --yes serve stage0-quiz -l 5173

# 例：AI 专项考
npx --yes serve ai-exam -l 5178
```

浏览器访问对应端口即可。`ai-exam` 若要跑校验脚本，需先在该目录安装依赖：

```bash
cd ai-exam
npm install
node verify.js
```

---

## 考试说明

### 前端综合合格考 · `qualifying-exam/`

- 多模块客观题（判断 / 单选 / 多选）
- 支持练习模式、错题本、限时正式考
- 入口：`qualifying-exam/index.html`

### AI 编程合格考 · `ai-exam/`

- 每次随机 **20** 题（8 判断 + 8 单选 + 4 多选），限时 **20** 分钟
- **错 ≥ 5 题不合格**（对 ≥ 16 合格）
- 桌面双栏答题卡；窄屏为底部抽屉 + FAB
- 入口：`ai-exam/index.html`

---

## 学习阶段（摘要）

| 阶段 | 内容 | 本仓库对应 |
|------|------|------------|
| 0 | HTML/CSS + 无障碍入门 | `stage0-quiz/` |
| 1 | JS 基础 | 见学习路径文档 |
| 2 | 工程化 + 最小测试/性能 | 见学习路径文档 |
| 3 | Vue3 + 后台（新文件优先 TS） | `v3-admin-vite/` |
| 4 | JS 进阶 + 框架原理 | `mini-vue/` |
| 5 | TypeScript 深化 | 见学习路径文档 |
| 6 | 面试 / 软技能 / 算法 | 见学习路径文档 |
| 贯穿 | AI 协作规范 | `ai-exam/` |

---

## AI 协作底线（摘要）

- 看不懂不盲目合并；以本地复现结果为准
- 控制改动范围；勿把密钥 / `.env` / PII 喂给模型
- 拒绝盲改仓库、假验证、幻觉 API、危险 `innerHTML` 等

完整约定见学习路径文档中的「AI 协作规范」章节。

---

## 说明

- 成绩与错题本保存在浏览器 `localStorage`，清站点数据会丢失
- `ai-exam` 与 `qualifying-exam` 相互独立，成绩不互通
- 请勿提交 `node_modules/`、`.env` 等敏感或依赖目录

---

## License

学习用途。第三方模板（如 `v3-admin-vite`、`mini-vue`）请遵循其原仓库许可。
