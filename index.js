// Import the Electron module
const { app, BrowserWindow } = require('electron');

// Function to create the main window
function createMainWindow() {
    // Create a new browser window
    const mainWindow = new BrowserWindow();

    // Load an HTML file into the window
    mainWindow.loadFile('index.html');
}

// Event handler for when Electron has finished initialization
app.whenReady().then(createMainWindow);