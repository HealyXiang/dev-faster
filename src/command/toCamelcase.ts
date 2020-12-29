import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { convertToCamelcase } from '../utils';

// this method used to convert snakeCaseKeys to camelcaseKeys
export async function toCamelcase(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      let document = editor.document;
      let selection = editor.selection;
      let text = document.getText(selection);
      let result = convertToCamelcase(text);
      editor.edit(editBuilder => {
        editBuilder.replace(selection, result);
      });
    }
}