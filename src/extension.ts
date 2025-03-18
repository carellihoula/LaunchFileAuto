import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Expose openFile function in the global context
  (document as any).openFile = async (filePath: string) => {
    try {
      const uri = vscode.Uri.file(filePath);
      const document = await vscode.workspace.openTextDocument(uri);
      // Display the opened document in the VSCode editor
      await vscode.window.showTextDocument(document);
      console.log(`opened file : ${filePath}`);
    } catch (error) {
      console.error(`Unable to open this file : ${filePath}`, error);
    }
  };

  console.log(" openFile extension is enabled.");
}

export function deactivate() {}
