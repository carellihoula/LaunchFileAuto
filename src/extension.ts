import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Chemin du fichier à ouvrir (à adapter selon votre environnement)
  const filePath =
    "/home/carellihoula/bioimageit/PyFlow/Tools/Fiji/puncta_segmentation.py";
  const fileUri = vscode.Uri.file(filePath);

  vscode.workspace.openTextDocument(fileUri).then((doc) =>
    vscode.window.showTextDocument(doc).then(
      () => {
        // Fermer le dossier ouvert (workspace) pour ne conserver que le fichier
        vscode.commands.executeCommand("workbench.action.closeFolder");
      },
      (err) => {
        vscode.window.showErrorMessage(
          `Erreur lors de l'ouverture du fichier: ${err}`
        );
      }
    )
  );
}

export function deactivate() {}
