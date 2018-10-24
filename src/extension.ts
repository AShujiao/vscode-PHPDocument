'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { phpDetailPanel} from './phpDetailPanel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('PHPDocument.Readline', () => {

        let option:vscode.InputBoxOptions = new boxOption('example：array');
        vscode.window.showInputBox(option).then(value=>{
            if(!value){
                return false;
            }
            phpDetailPanel.createOrShow(value);
        })
    });

    let phpDocument = vscode.commands.registerCommand('PHPDocument.gotoDocument', () => {
        // The code you place here will be executed every time your command is executed
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active text editor found!');
            return;
        }
        
        let keyword: string = '';
        if (editor.selection.isEmpty) {
            let wordRange: any = editor.document.getWordRangeAtPosition(editor.selection.start);
            keyword = wordRange ? editor.document.getText(wordRange) : '';
        } else {
            keyword = editor.document.getText(editor.selection.with());
        }
        if(!keyword){
            vscode.window.showWarningMessage('The name of the function was not obtained!');
            return;
        }

        phpDetailPanel.createOrShow(keyword);
    });


    context.subscriptions.push(disposable);
    context.subscriptions.push(phpDocument);
}



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
        this.placeHolder = "Please enter the name of the PHP function.";
        this.prompt = prompt;
        this.value = "";
    }

}

// this method is called when your extension is deactivated
export function deactivate() {
}