module.exports = {
  packagerConfig: {
    name: 'RandomJSON',
    executableName: 'randomjson',
    // icon: './assets/icon', // 如果有图标文件，取消注释并设置路径
    asar: true,
    // 如果需要设置应用图标，取消下面的注释并设置路径
    // icon: './assets/icon', // Windows: .ico, macOS: .icns, Linux: .png
  },
  rebuildConfig: {},
  makers: [
    // Windows 安装程序
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'randomjson',
      },
    },
    // macOS ZIP 文件
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    // Linux DEB 包
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'ab15173636319',
          homepage: 'https://github.com/ab15173636319/randomJSON',
        },
      },
    },
    // Linux RPM 包
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          maintainer: 'ab15173636319',
          homepage: 'https://github.com/ab15173636319/randomJSON',
        },
      },
    },
  ],
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
        // GitHub Token 通过环境变量设置: GITHUB_TOKEN
        // 设置方法: export GITHUB_TOKEN=your_token_here (Linux/Mac)
        // 或: set GITHUB_TOKEN=your_token_here (Windows)
        // 或在 CI/CD 中设置环境变量
      },
    },
  ],
}
