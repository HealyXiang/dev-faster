import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export async function reverseSelect(): Promise<void> {
    // console.log('e:', e.fsPath);
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      let document = editor.document;
      let selection = editor.selection;
      // console.log('selection:', selection);
      let text = document.getText(selection);
      // console.log('text:');
      // console.log(text);
      let result = text.split('').reverse().join('');
      // console.log('e 2:', e);
      vscode.window.showInformationMessage('Rm reverse from RmRepeat!');
      // const newContent = fs.readFileSync('./example/standard.tsx', { encoding: 'utf-8'});
      // const newContent = fs.readFileSync('./ddd', { encoding: 'utf-8'});
      // console.log('newContent:', newContent);
      // const newContent = fs.readFileSync(__dirname + '/ddd.tsx', {encoding: 'utf-8'});
      // console.log('newContent:', newContent);
      editor.edit(editBuilder => {
        editBuilder.replace(selection, result);
        // editBuilder.insert(new Position(1, 1), newContent);
      });
    }
}