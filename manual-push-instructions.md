# Manual Push Instructions

## Option 1: Using Git with Token Authentication

1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Create a new token with these permissions:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)

3. Use the token to push:
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/BioCyd3/smazdeck-survival-guide.git
git push -u origin main
```

## Option 2: Upload via GitHub Web Interface

1. Go to https://github.com/BioCyd3/smazdeck-survival-guide
2. Click "uploading an existing file"
3. Upload the entire project folder structure

## Option 3: Use GitHub CLI with Updated Token

```bash
gh auth refresh -h github.com -s repo,workflow
git push -u origin main
```

## After Upload: Enable GitHub Pages

1. Go to repository Settings > Pages
2. Under "Source", select "GitHub Actions"
3. The deployment will start automatically
4. Your site will be live at: https://biocyd3.github.io/smazdeck-survival-guide/

## Files to Upload

Make sure these key files are uploaded:
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow
- `smazdeck-app/` - Complete React application
- `README.md` - Project documentation
- `data/` - Game data files