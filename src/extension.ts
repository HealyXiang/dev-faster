// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Position } from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { reverseSelect, toTsType, toCamelcase } from './command';

let folderName = vscode.workspace.name; // get the open folder name
let workspace = vscode.workspace;

const allCommands = [{
  name: 'fasterDev.toReverse',
  commandFunc: reverseSelect
}, {
  name: 'fasterDev.toTsType',
  commandFunc: toTsType
}, {
  name: 'fasterDev.toCamelcase',
  commandFunc: toCamelcase
}];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  allCommands.forEach(itemCommand => {
    const { name, commandFunc } = itemCommand;
    const disposable =  vscode.commands.registerCommand(name, commandFunc);
    disposable && context.subscriptions.push(disposable);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
