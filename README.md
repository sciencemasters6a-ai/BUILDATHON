# Desktop App (Electron)

Minimal Electron desktop app scaffold.

How to run

1. Open a terminal in this folder: `C:\Users\Home\.vscode\desktop-app`
2. Install dependencies: `npm install`
3. Start the app: `npm start`

One-click options

- Windows (double-click): run `run-app.bat` in this folder. It will install dependencies if missing and then start the app.
- PowerShell: run `run-app.ps1` (you may need to set execution policy for scripts: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`).

Build and share via GitHub Actions

1. Create a new GitHub repository and push this project to it (make sure `main` or `master` is the branch you push to).
2. The included GitHub Actions workflow (`.github/workflows/build-windows.yml`) will run on push and produce Windows distributables using `electron-builder`.
3. After the workflow completes, open the workflow run in GitHub Actions and download the `windows-dist` artifact from the job. That artifact contains the installer(s) in the `dist/` folder.
4. Share the downloaded installer with your friend (they can run the installer to install the app). Note: unsigned installers may trigger Windows SmartScreen warnings — to avoid that you'd need to sign the installer with a code-signing certificate.

If you'd like, I can help you push this repo to GitHub and trigger the build.

Beginner: push this project to GitHub (one-click helper)

1. Install Git for Windows: https://git-scm.com/download/win
2. Create an empty repository on GitHub (click New repository). Copy the HTTPS clone URL (it looks like `https://github.com/yourname/yourrepo.git`).
3. In File Explorer, double-click `push-to-github.bat` in this project folder. When prompted, paste the repository URL you copied.
4. The script will initialize git (if needed), commit files, set the remote, and push to GitHub. You may be prompted to authenticate with GitHub; follow the prompts (GitHub Desktop, credential manager, or personal access token).
5. After the push, open the repo on GitHub; the Actions tab will show the CI build. Download the `windows-dist` artifact from the workflow run when it completes.

If you want, tell me when you've created the GitHub repo and I can help verify the workflow run and artifacts.

Notes

- This is a minimal starting point. Next steps: add IPC, native menus, packaging (electron-builder).
