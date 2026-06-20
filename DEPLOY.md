Preparing this project for GitHub and Vercel

1) Organize assets
   - Place your images under `assets/images/` (e.g. `pfp.jpg`, `github-logo.png`, `linkedin.png`, `instagram.png`, project images).

2) Initialize git and push to GitHub
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin <your-github-remote-url>
   git push -u origin main
   ```

3) Deploy to Vercel
   - Go to https://vercel.com and sign in.
   - Choose "Import Project" and connect your GitHub repo.
   - For a static site, no build command is required; set the output directory to the repo root (or `build/` if you generate a build).
   - Click "Deploy".

Notes
   - If assets or image references are missing, add them into `assets/images/` before deploying.
   - You can add a `vercel.json` later to customize routing/build settings.
