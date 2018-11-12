'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { PHPDetailPanel} from './PHPDetailPanel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    //绑定输入php关键字查询命令
    let disposable = vscode.commands.registerCommand('PHPDocument.Readline', () => {

        let option:vscode.InputBoxOptions = new boxOption('example：array');
        vscode.window.showInputBox(option).then(value=>{
            //未输入值返回false
            if(!value){
                vscode.window.showWarningMessage('Please enter the PHP keyword!');
                return;
            }
            //创建面板展示
            PHPDetailPanel.createOrShow(value);
        })
    });
    //右键查找php方法命令
    let phpDocument = vscode.commands.registerCommand('PHPDocument.gotoDocument', () => {
        // 获取文本
        let editor = vscode.window.activeTextEditor;
        if (!editor) {//未获取到
            vscode.window.showWarningMessage('No active text editor found!');
            return;
        }
        
        let keyword: string = '';
        if (editor.selection.isEmpty) {
            //未选中关键词，获取指针位置的关键词
            let wordRange: any = editor.document.getWordRangeAtPosition(editor.selection.start);
            keyword = wordRange ? editor.document.getText(wordRange) : '';
        } else {
            //获取选中的关键词
            keyword = editor.document.getText(editor.selection.with());
        }
        if(!keyword){
            //关键词为空
            vscode.window.showWarningMessage('The name of the function was not obtained!');
            return;
        }
        //创建面板
        PHPDetailPanel.createOrShow(keyword);
    });

    //绑定命令
    context.subscriptions.push(disposable);
    context.subscriptions.push(phpDocument);
}


//定义一个输入栏
export class boxOption  implements vscode.InputBoxOptions {

    ignoreFocusOut?: boolean;

    password?: boolean;

    placeHolder?: string;

    prompt?: string;

    value?: string;

    valueSelection?: [number, number];

    constructor(prompt:string){
        this.ignoreFocusOut = true;
        this.password = false;
        this.placeHolder = "Please enter the PHP keyword.";
        this.prompt = prompt;
        this.value = "";
    }

}

// this method is called when your extension is deactivated
export function deactivate() {
}