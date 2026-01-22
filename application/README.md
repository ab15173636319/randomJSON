# Electron 应用打包和发布配置

## 已安装的依赖

- `@electron-forge/cli` - Electron Forge 核心工具
- `@electron-forge/publisher-github` - GitHub 发布器
- `@electron-forge/maker-squirrel` - Windows 安装程序
- `@electron-forge/maker-zip` - macOS ZIP 文件
- `@electron-forge/maker-deb` - Linux DEB 包
- `@electron-forge/maker-rpm` - Linux RPM 包

## 配置说明

### GitHub 发布器配置

在 `forge.config.js` 中已配置 GitHub 发布器：

```javascript
publishers: [
  {
    name: '@electron-forge/publisher-github',
    config: {
      repository: {
        owner: 'ab15173636319',
        name: 'randomJSON',
      },
      prerelease: false,
      draft: true,
    },
  },
]
```

### GitHub Token 设置

发布到 GitHub 需要设置 GitHub Token：

**Windows (PowerShell):**
```powershell
$env:GITHUB_TOKEN="your_github_token_here"
```

**Windows (CMD):**
```cmd
set GITHUB_TOKEN=your_github_token_here
```

**Linux/Mac:**
```bash
export GITHUB_TOKEN=your_github_token_here
```

**创建 GitHub Token:**
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" -> "Generate new token (classic)"
3. 选择权限：至少需要 `repo` 权限
4. 复制生成的 token

## 使用命令

### 打包应用
```bash
npm run package
```
生成打包文件到 `out` 目录

### 制作安装程序
```bash
npm run make
```
为当前平台生成安装程序

### 发布到 GitHub
```bash
npm run publish
```
自动打包、制作安装程序并发布到 GitHub Releases

## 注意事项

1. **首次发布前**：确保 GitHub 仓库已存在
2. **Token 权限**：GitHub Token 需要 `repo` 权限
3. **版本号**：发布前更新 `package.json` 中的版本号
4. **Draft 模式**：当前配置为 `draft: true`，发布后需要手动在 GitHub 上发布
5. **多平台打包**：在不同平台上运行 `npm run make` 可以生成对应平台的安装程序

## 发布流程

1. 更新版本号（`package.json`）
2. 构建前端应用（在项目根目录运行 `npm run build`）
3. 设置 GitHub Token 环境变量
4. 运行 `npm run publish`
5. 在 GitHub Releases 页面检查草稿
6. 编辑并发布 Release

