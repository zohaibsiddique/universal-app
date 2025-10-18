const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dbAPI', {
  getUsers: () => ipcRenderer.invoke('get-users'),
  addUser: (name) => ipcRenderer.invoke('add-user', name),
});
