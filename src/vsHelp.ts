import * as vscode from 'vscode';

const vsHelp = {

    showInfoWxChat(content: any): Thenable<void> {
        return vscode.window.showInformationMessage(content, { title: "OK" }).then(function (item) {
                if (!item) { 
                    return; 
                }
                let tmpUri : string = '//resources//wx.jpg'
                let extPath = vscode.extensions.getExtension("manasxx.phpdocument")
                if(extPath == undefined){
                    return;
                }
                let extPathStr = extPath.extensionPath
                let tmpPath = "file:///"+extPathStr+tmpUri
                let tmpurl = vscode.Uri.parse(tmpPath)
                
                vscode.commands.executeCommand('vscode.openFolder', tmpurl);
            });
    }
}

export default vsHelp;