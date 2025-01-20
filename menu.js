const electron = require('electron');
const { version } = require('./package.json');

const {app, shell, ipcMain} = electron;

let menuTemplate = function(mainWindow) {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open', accelerator: 'CmdOrCtrl+O',
          click: function () {
            ipcMain.emit('open-file');
          }
        },
        {
          label: 'Quit', accelerator: 'Command+Q',
          click: function () {
            app.quit()  // This is standart function to quit app.
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Dev Tools', accelerator: 'F12',
          click: function () {
            mainWindow.webContents.openDevTools();
          }
        },
        {
          label: 'Reload', accelerator: 'CmdOrCtrl+R',
          click: function (item, focusedWindow) {
            focusedWindow.reload(); // reload the page
          }
        }
      ]
    },
    // {
    //   label: 'Edit',
    //   submenu: [
    //     { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
    //     { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
    //     { type: 'separator' },
    //     { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
    //     { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
    //     { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
    //     { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
    //   ]
    // },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Dev Documentantion',
          click: function() {
            shell.openExternal('https://bitbucket.realtimegaming.com/projects/IT/repos/spine-viewer/browse');
          }
        },
        { type: 'separator' },
        { label: `Version ${version}`, enabled: 'FALSE' }
      ]
    }
  ]
};

module.exports = menuTemplate;