import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { convertToFEType } from '../utils';

// this method used to convert to ts type by BE api document
export async function toTsType(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      let document = editor.document;
      let selection = editor.selection;
      let text = document.getText(selection);
      const originContentArr = text.split('\n');
      const result = originContentArr.map(item => {
        return convertToFEType(item);
      }).join('\n');
      vscode.window.showInformationMessage('Get Ts type!');
      editor.edit(editBuilder => {
        editBuilder.replace(selection, result);
        // editBuilder.insert(new Position(1, 1), newContent);
      });
    }
}