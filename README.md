Voici un exemple de contenu README.md en français pour votre extension WebViewTool :

---

# WebViewTool

**WebViewTool** est une extension VS Code qui permet d'afficher l'interface web de code‑server et de charger dynamiquement un script correspondant à un node sélectionné. L'extension utilise un pattern Singleton pour garantir qu'une seule instance de la vue est ouverte, et offre une intégration transparente entre votre environnement de développement PyFlow et code‑server.

## Fonctionnalités

- **Chargement dynamique de script**  
  Transforme le moduleImportPath d'un node en chemin de fichier complet et le charge dans l'interface code‑server.

- **Mise à jour automatique**  
  Lorsqu'un node est cliqué, le script correspondant est automatiquement chargé dans la WebView.

- **Pattern Singleton**  
  Garantit qu'une seule instance de WebViewTool est active, évitant ainsi l'ouverture de plusieurs fenêtres inutiles.

- **Intégration avec PyFlow**  
  S'intègre avec les nodes de PyFlow (comme les BiitToolNode) pour récupérer le chemin du script via `self._rawNode.Tool.moduleImportPath`.

## Prérequis

- [code‑server](https://github.com/coder/code-server) doit être installé et configuré pour être accessible via l'URL configurée (par défaut `http://localhost:8080/`).
- VS Code (ou code‑server) avec prise en charge des extensions.
- Python et les autres dépendances de PyFlow si vous utilisez l'environnement PyFlow.

## Installation

1. Clonez le dépôt ou téléchargez le package de l'extension.
2. Ouvrez le répertoire de l'extension dans VS Code.
3. Utilisez la commande `vsce package` pour générer le fichier VSIX (après avoir modifié ce README.md avec les informations pertinentes).
4. Installez l'extension en exécutant :
   ```bash
   code --install-extension <nom_extension>.vsix
   ```
   ou via l'interface de VS Code.

## Utilisation

- **Ouvrir le script d'un node**  
  Lorsqu'un node disposant d'une propriété `Tool` est sélectionné, lancez la commande "Edit Node Script". L'extension récupère alors le moduleImportPath, convertit ce chemin en une URL appropriée et demande à code‑server d'ouvrir le fichier correspondant.

- **Mise à jour de l'affichage**  
  Si vous modifiez le script, l'extension peut être améliorée pour recharger automatiquement le contenu dans la WebView.

## Développement

Pour développer et tester l'extension en mode développement :

1. Ouvrez le dossier de l'extension dans VS Code.
2. Assurez-vous que la configuration de lancement dans `.vscode/launch.json` est correctement configurée pour lancer l'extension dans une nouvelle fenêtre d'Extension Development Host.
3. Lancez le débogage en appuyant sur **F5**.
4. Modifiez le code et utilisez la fonctionnalité "Watch" pour voir les changements en temps réel.

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez améliorer l'extension, ajouter de nouvelles fonctionnalités ou corriger des bugs, merci de créer une issue ou de soumettre une pull request.

## Licence

Distribué sous la licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus d'informations.

---

Ce README fournit une vue d'ensemble de l'extension, des instructions d'installation et d'utilisation, ainsi que des informations pour le développement et la contribution. Vous pouvez l'adapter selon vos besoins spécifiques.
