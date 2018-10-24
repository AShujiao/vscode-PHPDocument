import * as vscode from 'vscode';
import * as path from 'path';
import * as request from 'request';
import languageConf from './language';
export class phpDetailPanel{

	public static currentPanel: phpDetailPanel | undefined;

	public static readonly viewType = 'phpDocument';

	private readonly _panel: vscode.WebviewPanel;
    private  _url: string;
    private  _fun: string;
    private _disposables: vscode.Disposable[] = [];

	public static createOrShow(fun: string){
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        let config = vscode.workspace.getConfiguration("phpDocument"); // 当前用户配置
        let language = languageConf(config.language);
        let funUrl = fun.replace(/_/g,'-');
        let url = `http://php.net/manual/${language}/function.${funUrl}.php`;
		if(phpDetailPanel.currentPanel){
			phpDetailPanel.currentPanel._panel.reveal(column);
			phpDetailPanel.currentPanel._update(url,fun);
			return;
		}

		const panel = vscode.window.createWebviewPanel(phpDetailPanel.viewType,"phpDocument",column || vscode.ViewColumn.One,{
            enableScripts: true,
            retainContextWhenHidden:true,
            enableCommandUris:true
		});

		phpDetailPanel.currentPanel = new phpDetailPanel(panel,url,fun);
	}


	private constructor(panel: vscode.WebviewPanel,url:string,fun:string){
		this._panel = panel;
        this._url = url;
        this._fun = fun;
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

	private _update(url?:string,fun?:string) {

        if(url) this._url = url;
        if(fun) this._fun = fun;
        this._panel.title = "php - " + this._fun;

        this._panel.iconPath = {
            light:vscode.Uri.file(path.join(__filename,  '..', '..', 'resources', 'light', 'PHP.svg')) ,
            dark: vscode.Uri.file(path.join(__filename,  '..', '..', 'resources', 'dark',  'PHP.svg'))
        };
        return this.getHtml();
    }
    
    async  getHtml() {
        let re = await this._getHtmlForWebview();
        let html = re.toString();
        let css = "<style>.navbar,.navbar-fixed-top,.layout-menu,#breadcrumbs-inner,.page-tools,.footer-content{ display:none;} a{pointer-events: none;} </style></head>";
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
    }
}