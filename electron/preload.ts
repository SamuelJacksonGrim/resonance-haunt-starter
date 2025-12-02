import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('haunt', {
  getTheme: () => ipcRenderer.invoke('get-theme'),
  sampleScreen: () => ipcRenderer.invoke('sample-screen'),
  onToggle: (callback: () => void) => ipcRenderer.on('toggle-haunt', callback),
  onPause: (callback: () => void) => ipcRenderer.on('pause-haunt', callback),
});
