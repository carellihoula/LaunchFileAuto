import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "auto-open-file" activated.');

  // Récupérer le chemin du fichier depuis la variable d'environnement FILE
  const filePath = process.env.FILE;
  if (filePath) {
    const fileUri = vscode.Uri.file(filePath);
    vscode.workspace.openTextDocument(fileUri).then(
      (doc) => {
        vscode.window.showTextDocument(doc);
        console.log(`Opened file from environment: ${filePath}`);
      },
      (err) => {
        vscode.window.showErrorMessage(`Failed to open file: ${filePath}`);
        console.error(`Error opening file ${filePath}:`, err);
      }
    );
  } else {
    console.log("No file parameter found in environment variable FILE.");
  }
}

export function deactivate() {
  // Rien à faire à la désactivation
}
