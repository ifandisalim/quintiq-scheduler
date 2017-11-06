const { app, BrowserWindow }          = require('electron');
const path                            = require('path');
const url                             = require('url');

// Load in dotenv
require('dotenv').config();

let mainWindow = null;


app.on('ready', () => {

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 950
    });
    


    /**
     * Set up electron load url based on dotenv variable
     * Package = true is for production package
     * Then wire electron to load from dist/index.html instead 
     */

    if(process.env.PACKAGE === 'true'){
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    else{
        // If still in development, load from localhost:4200
        mainWindow.loadURL(process.env.HOST);
    }


    
    mainWindow.on('close', () => mainWindow = null);

});


app.on('window-all-closed', () => {
    if(process.platform != 'darwin')
        app.quit();
});

