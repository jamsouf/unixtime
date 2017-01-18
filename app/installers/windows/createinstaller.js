const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
.then(createWindowsInstaller)
.catch((error) => {
   console.error(error.message || error)
   process.exit(1)
})

function getInstallerConfig () {
   console.log('creating windows installer')
   const rootPath = path.join('./')
   const srcPath = path.join(rootPath, 'release_builds')
   const outPath = path.join(rootPath, 'dist')

   return Promise.resolve({
      appDirectory: path.join(srcPath, 'unixtime-win32-ia32/'),
      authors: 'Jamil Soufan',
      noMsi: true,
      outputDirectory: path.join(outPath, 'windows-installer'),
      exe: 'unixtime.exe',
      setupExe: 'unixtimeInstaller.exe',
      setupIcon: path.join(rootPath, 'app', 'assets', 'icons', 'win', 'icon.ico')
   })
}
