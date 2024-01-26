const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('fs');
const pathToBooks = path.join(process.cwd(), '/booksDesktop/');


let mainWindow = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
}

app.whenReady().then(() => {
    createWindow();
})

ipcMain.on('toMain', async () => {
    const data = await getClippingsFile();
    mainWindow.webContents.send('fromMain', data)
});

ipcMain.on('create-books', (event, data) => {
    let books = data;
    
    fs.mkdir(pathToBooks, { recursive: true }, (error) => {
        if (error) {
            throw error;
        } else {
            console.log('created folder')
        }
    })

    Object.keys(books).forEach((title) => {
        const highlights = books[title];
        const txtFilePath = pathToBooks + title + '.md';

        for (let i = 0; i < highlights.length; i++ ) {
            write(highlights[i])

            function write(text) {
                if (i === 0) {
                    fs.writeFile(txtFilePath, text + '\n\n', (error) => {
                        if (error) throw error;
                    })
                } else {
                    fs.appendFile(txtFilePath, text + '\n\n', (error) => {
                        if (error) throw error
                    })
                }
            }
        }
    })
})


async function getClippingsFile() {
    const files = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Text Files', extensions: ['txt']}
        ]
    });

    if (!files) { return }
    const file = files.filePaths[0];

    const clippings = fs.readFileSync(file, 'utf-8');
    return clippings;

}
