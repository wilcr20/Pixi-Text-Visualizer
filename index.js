// Import the modules from Electron library
const { app, BrowserWindow, ipcMain, dialog, Menu, ipcRenderer } = require('electron');


let mainWindow;


function createMainWindow() {
    // Create a new browser window
    mainWindow = new BrowserWindow({ width: 900, height: 500, useContentSize: true });

    // Load the HTML file into the window
    mainWindow.loadFile('index.html');
    // mainWindow.webContents.openDevTools();

    // Set a customized menu
    const menuTemplate = require('./menu')(mainWindow);
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)


}


// Event listener for 'open-file'
ipcMain.on('open-file', () => { openFileDialog() })



// // Add the event listener for the response from the main process
// ipcMain.on('file-dialog-result', (event, arg) => {
//     // if (arg.filePath) loadSprite(arg.filePath);
//     console.log("file-dialog-result ", event, arg)
// });


// Attach listener in the main process with the given ID
ipcMain.on('request-mainprocess-action', (event, arg) => {
    if (!arg && !arg.message) { return; }
    console.log("arg ", arg)
    switch (arg.message) {
        case 'open-file-dialog':
            openFileDialog();
            break;
    }
});


function openFileDialog() {
    dialog.showOpenDialog(mainWindow, {
        properties: ["multiSelections"],
        filters: [
            { name: 'Bitmap Font Files (PNG and XML)', extensions: ['xml', 'png'] },
        ]
    }).then((data) => {
        if (data.filePaths.length != 2 || !areDifferentTypes(data.filePaths)) {
            return dialog.showMessageBox(mainWindow,
                {
                    type: "error",
                    title: "Error uploading files",
                    buttons: ["Ok"],
                    message: "You should upload two files related to the Bitmap Font (.png and .xml)"
                }
            );
        }
        const messageData = {
            filePath: data.filePaths,
            nameFile: getFileName(data.filePaths[0])
        };
    });
};

// We need to verify is th two files uploaded are not using the same type
function areDifferentTypes(filePaths) {
    let areDifferentTypes = true;
    if (filePaths[0].includes(".png") && filePaths[1].includes(".png")) {
        areDifferentTypes = false;
    }
    if (filePaths[0].includes(".xml") && filePaths[1].includes(".xml")) {
        areDifferentTypes = false;
    }
    return areDifferentTypes;
}

function getFileName(path) {
    let separatorLength = path.split("\\").length;
    return path.split("\\")[separatorLength - 1]?.split(".")[0];
}

// Event handler for when Electron has finished initialization
app.whenReady().then(() => {

    createMainWindow();
    ipcMain.handle('dialog', (event, method, params) => {
        dialog[method](params);
    });
});