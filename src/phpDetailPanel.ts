import * as vscode from 'vscode';
import * as path from 'path';
import * as request from 'request';
export class phpDetailPanel{

	public static currentPanel: phpDetailPanel | undefined;

	public static readonly viewType = 'maxDetail';

	private readonly _panel: vscode.WebviewPanel;
    private  _url: string;
    private _iconName:string;
    private _disposables: vscode.Disposable[] = [];

	public static createOrShow(url: string,iconName:string){
		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;


		if(phpDetailPanel.currentPanel){
			phpDetailPanel.currentPanel._panel.reveal(column);
			phpDetailPanel.currentPanel._update(url,iconName);
			return;
		}

		const panel = vscode.window.createWebviewPanel(phpDetailPanel.viewType,"Max+ 资讯",column || vscode.ViewColumn.One,{
            enableScripts: true,
            retainContextWhenHidden:true,
            enableCommandUris:true
		});

		phpDetailPanel.currentPanel = new phpDetailPanel(panel,url,iconName);
	}


	private constructor(panel: vscode.WebviewPanel,url:string,iconName:string){
		this._panel = panel;
        this._url = url;
        this._iconName = iconName;
		// Set the webview's initial html content 
        this._update();

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Update the content based on view changes
        this._panel.onDidChangeViewState(e => {
            if (this._panel.visible) {
                this._update()
            }
        }, null, this._disposables);

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'alert':
                    vscode.window.showErrorMessage(message.text);
                    return;
            }
        }, null, this._disposables);
	}

	public dispose() {
        phpDetailPanel.currentPanel = undefined;

        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
	}

	private _update(url?:string,iconName?:string) {

        if(url) this._url = url;
        if(iconName) this._iconName = iconName;
        this._panel.title = "Max+ 资讯";

        this._panel.iconPath = {
            light:vscode.Uri.file(path.join(__filename,  '..', '..', 'resources', 'light', this._iconName + '.svg')) ,
            dark: vscode.Uri.file(path.join(__filename,  '..', '..', 'resources', 'dark', this._iconName + '.svg'))
        };
        return this.getMaxJson();
    }
    
    async  getMaxJson() {
        let re = await this._getHtmlForWebview();
        let html = re.toString();
        let css = "<style>.navbar,.navbar-fixed-top,.layout-menu,#breadcrumbs-inner,.page-tools,.footer-content{ display:none;}</style></head>";
        html = html.replace(/<\/head>/,css);
        html = html.replace(/\/cached.php/g,'http://php.net/cached.php');
        this._panel.webview.html = html;
	}
	
	private _getHtmlForWebview (){

        let url = this._url;

        return new Promise(function (resolve, reject) {
            request(url, function (err, res) {
                if (err) return vscode.window.showInformationMessage(err);
                resolve(res.body.toString());
            })
        })



        // return `<!DOCTYPE html>
        //     <html lang="en">
        //     <head>
        //         <meta charset="UTF-8">
        //         <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">
        //         <title>Max</title>
        //     </head>
        //     <body>
            
        //         <iframe width="100%" height="1000px" target='_parent'  src="${this._url}" ></iframe>
        //         <script>
		// 		window.location.href = "http://php.net/manual/en/function.array-keys.php";
		// 		</script>
        //     </body>
        //     </html>`;
    }

}