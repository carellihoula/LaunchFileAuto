import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "auto-open-file" activated.');

  // Rechercher automatiquement le paramètre "--file=..."
  const fileArg = process.argv.find((arg) => arg.startsWith("--file="));
  if (fileArg) {
    const filePath = fileArg.substring("--file=".length);
    const fileUri = vscode.Uri.file(filePath);
    vscode.workspace.openTextDocument(fileUri).then(
      (doc) => {
        vscode.window.showTextDocument(doc);
        console.log(`Opened file: ${filePath}`);
      },
      (err) => {
        vscode.window.showErrorMessage(`Failed to open file: ${filePath}`);
        console.error(`Error opening file ${filePath}:`, err);
      }
    );
  } else {
    console.log("No file parameter provided in process.argv.");
  }
}

export function deactivate() {
  // Nothing required on deactivation
}
