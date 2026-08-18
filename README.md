# 🚀 Zhiyang Li's Personal Portfolio Website

这是一个专为 Zhiyang Li (李志阳) 量身打造的现代化极客风格个人主页与作品集网站，支持响应式布局、自适应明暗模式、动态终端交互、项目分类筛选等功能。

---

## 📂 项目结构

```
personal-website/
├── index.html        # 网站结构与核心内容
├── styles.css        # 现代化玻璃拟态与流光暗色设计系统
├── script.js         # 打字机特效、主题切换、筛选、交互逻辑
├── CNAME             # 自定义域名绑定配置文件（填入你的域名，如 yourname.me）
└── README.md         # 部署与配置指南
```

---

## ⚡ 一键本地预览

在终端中进入该目录并运行：

```bash
python -m http.server 3000
```
然后在浏览器中打开 `http://localhost:3000` 即可实时预览。

---

## 🌐 如何推送到 GitHub 并免费部署上线

### 第一步：在 GitHub 创建一个新仓库
1. 打开 [GitHub](https://github.com/new)
2. 仓库名称建议为：`etonsalmon160-source.github.io` （或任意名称如 `my-portfolio`）
3. 保持为 **Public**（公开仓库），不要勾选初始化 README/License，点击 **Create repository**。

### 第二步：推送本地代码到 GitHub
在当前目录 (`personal-website`) 下运行以下命令（将仓库地址替换为你刚创建的地址）：

```bash
git remote add origin https://github.com/etonsalmon160-source/YOUR-REPO-NAME.git
git push -u origin main
```

### 第三步：开启 GitHub Pages
1. 进入 GitHub 仓库页面 -> 点击 **Settings** -> **Pages**。
2. 在 **Branch** 下选择 `main` 分支，路径选择 `/(root)`，点击 **Save**。
3. 等待 1~2 分钟，页面上方就会显示你的专属访问链接（例如：`https://etonsalmon160-source.github.io`）。

---

## 🔗 绑定 Namecheap 域名（学生包）

如果你想用你在 Namecheap 拿到的自定义域名（如 `zhiyang.me`）：

### 1. 在 GitHub Pages 填写自定义域名
在仓库 **Settings** -> **Pages** -> **Custom domain** 中输入你的域名，点击 **Save**。

### 2. 在 Namecheap 配置 DNS 解析
登录 [Namecheap 控制台](https://www.namecheap.com/) -> **Domain List** -> 点击域名右侧的 **Manage** -> 切换到 **Advanced DNS** 选项卡：
- **添加 CNAME 记录**：
  - `Type`: `CNAME Record`
  - `Host`: `www`
  - `Value`: `etonsalmon160-source.github.io.`
  - `TTL`: `Automatic`
- **添加 A 记录**（指向 GitHub Pages 官方节点）：
  - `Type`: `A Record` | `Host`: `@` | `Value`: `185.199.108.153`
  - `Type`: `A Record` | `Host`: `@` | `Value`: `185.199.109.153`
  - `Type`: `A Record` | `Host`: `@` | `Value`: `185.199.110.153`
  - `Type`: `A Record` | `Host`: `@` | `Value`: `185.199.111.153`

### 3. 勾选 Enforce HTTPS
等待 DNS 解析生效后（约 5~10 分钟），回到 GitHub Pages 页面勾选 **Enforce HTTPS** 即可！
