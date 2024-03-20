export default class Main {

    private static window: Electron.BrowserWindow;
    private static app: Electron.App;
    private static BrowserWindow: typeof Electron.BrowserWindow;

    public static main(app: Electron.App, BrowserWindow: typeof Electron.BrowserWindow) {
        Main.BrowserWindow = BrowserWindow;
        Main.app = app;
        Main.app.on('ready', Main.createWindow);
        Main.app.on('window-all-closed', Main.onWindowAllClosed);
        Main.app.on('activate', Main.onActivate);
    }

    private static createWindow() {
        Main.window = new Main.BrowserWindow({
            width: 1024,
            height: 768,
            webPreferences: {
                nodeIntegration: true,
                preload: __dirname + '/preload/preload.js'
            }
        });
        Main.window.loadFile(__dirname + '/../public/index.html');
        Main.window.on('closed', Main.onClose);
        Main.window.setMenu(null);
    }

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.app.quit();
        }
    }

    private static onActivate() {
        if (this.window === null) {
            Main.createWindow();
        }
    }

    private static onClose() {
        Main.window = null;
    }

}