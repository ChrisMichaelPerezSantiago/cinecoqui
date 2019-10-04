module.exports = {
  productionSourceMap: false,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.cinecoqui.app",
        productName: "cinecoqui",
        win: {
          icon: "./public/logo.png",
          target: [
            {
              target: "nsis",
              arch: ["x64", "ia32"]
            }
          ]
        },
        nsis:{
          oneClick: false,
          perMachine: true,
          allowToChangeInstallationDirectory: true
        },
        publish: [
          {
            provider: "github",
            owner: "ChrisMichaelPerezSantiago",
            repo: "cinecoqui",
            releaseType: "draft",
            channel: "latest",
            url: "cinecoqui.chrismichael.now.sh"
          }
        ]
      }
    }
  }
}