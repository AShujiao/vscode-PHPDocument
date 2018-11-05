import * as vscode from 'vscode';
import * as path from 'path';
import * as request from 'request';
import handleUrl from './HandleUrl';
export class PHPDetailPanel{

	public static currentPanel: PHPDetailPanel | undefined;

	public static readonly viewType = 'PHPDocument';

	private readonly _panel: vscode.WebviewPanel;
    private  _url: string;
    private  _fun: string;
    private _disposables: vscode.Disposable[] = [];

	public static createOrShow(fun: string){
        //当前窗口栏
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        // 当前用户配置
        let config:vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("PHPDocument");
        //关键字特殊字符替换
        let funUrl:string = fun.replace(/_/g,'-');
        //获取url
        let url:string = handleUrl(config.language,funUrl);
        //如果已存在活动窗口则更新
		if(PHPDetailPanel.currentPanel){
			PHPDetailPanel.currentPanel._panel.reveal(column);
			PHPDetailPanel.currentPanel._update(url,fun);
			return;
        }
        //创建一个活动窗口
		const panel = vscode.window.createWebviewPanel(PHPDetailPanel.viewType,"PHPDocument",column || vscode.ViewColumn.One,{
            enableScripts: true,
            retainContextWhenHidden:true,
            enableCommandUris:true
		});

		PHPDetailPanel.currentPanel = new PHPDetailPanel(panel,url,fun);
	}

/**
 *Creates an instance of PHPDetailPanel.
 * @param {vscode.WebviewPanel} panel 视图
 * @param {string} url 文档链接
 * @param {string} fun php方法名
 * @memberof PHPDetailPanel
 */
private constructor(panel: vscode.WebviewPanel,url:string,fun:string){
		this._panel = panel;
        this._url = url;
        this._fun = fun;
		// 初始化文档内容
        this._update();

        // 监听关闭面板事件
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        // 设置面板图标
        this._panel.iconPath = {
            light:vscode.Uri.file(path.join(__filename,  '..', '..', 'resources', 'light', 'PHP.svg')) ,
            dark: vscode.Uri.file(path.join(__filename,  '..', '..', 'resources', 'dark',  'PHP.svg'))
        };
        // 更新内容事件
        this._panel.onDidChangeViewState(e => {
            if (this._panel.visible) {
                this._update()
            }
        }, null, this._disposables);

        // 处理面板中的消息，暂时用不到
        /*this._panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'alert':
                    vscode.window.showErrorMessage(message.text);
                    return;
            }
        }, null, this._disposables);*/
    }
    
    //关闭面板，释放资源
	public dispose() {
        PHPDetailPanel.currentPanel = undefined;
        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
	}

    /**
     * @private
     * @param {string} [url] 访问的url
     * @param {string} [fun] php关键字
     * @returns
     * @memberof PHPDetailPanel
     */
    private _update(url?:string,fun?:string) {

        if(url) this._url = url;
        if(fun) this._fun = fun;
        //设置面板标题
        this._panel.title = "php - " + this._fun;
        //获取html
        return this.getHtml();
    }
    
    //异步获取hmtl更新到面板
    async  getHtml() {
        //获取html
        let re = await this._getHtmlForWebview();
        let html = re.toString();
        //添加样式处理
        let css = "<style>.navbar,.navbar-fixed-top,.layout-menu,#breadcrumbs-inner,.page-tools,.footer-content,.headsup{display:none;}a{pointer-events: none;}#toTop{pointer-events:auto;} </style></head>";
        html = html.replace(/<\/head>/,css);
        html = html.replace(/\/cached.php/g,'http://php.net/cached.php');
        //更新html
        this._panel.webview.html = html;
	}
    
    //请求数据
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