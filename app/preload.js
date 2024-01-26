const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'api', {
        send: (channel, data) => {
            let validChannels = ['toMain', 'create-books'];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data)
            }
        },
        receive: (channel, func) => {
            let validChannels = ['fromMain'];
            if (validChannels.includes(channel)) {
                // strip event as it includes sender
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    },

    'versions', {
        node: ()=> process.versions.node,
        chrome: () => process.versions.chrome,
        electron: ()=> process.versions.electron
    }
)