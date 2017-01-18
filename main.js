const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;

app.on('ready', createWindow);

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

app.on('activate', () => {
   if (win === null) {
      createWindow();
   }
});

function createWindow() {
   win = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 800,
      minHeight: 600,
      icon: path.join(__dirname, 'app/assets/icons/png/64x64.png'),
      backgroundColor: '#282C34'
   });

   win.loadURL(url.format({
      pathname: path.join(__dirname, 'app/index.html'),
      protocol: 'file:',
      slashes: true
   }));

   win.on('closed', () => {
      win = null;
   });
}
