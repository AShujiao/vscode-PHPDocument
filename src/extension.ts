'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { phpDetailPanel} from './phpDetailPanel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vsce-phpDoc" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.phpdoc', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user

        let option:vscode.InputBoxOptions = new boxOption('test');
        vscode.window.showInputBox(option).then(value=>{
            if(!value){
                return false;
            }

            vscode.window.showInformationMessage(value);
            phpDetailPanel.createOrShow(value,"ow");
        })
    });

    // vscode.commands.registerCommand('phpdoc.detail',(value)=>{
    //     phpDetailPanel.createOrShow(value,"ow");
    // })

    context.subscriptions.push(disposable);
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
        this.placeHolder = "请输入";
        this.prompt = prompt;
        this.value = "";
    }

}

// this method is called when your extension is deactivated
export function deactivate() {
}