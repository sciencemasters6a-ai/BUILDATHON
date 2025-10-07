const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  hello: () => 'Hello from preload',
  selectImages: () => ipcRenderer.invoke('select-images')
});
