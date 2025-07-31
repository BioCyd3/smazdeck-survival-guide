@echo off
echo Pushing to GitHub repository...
git remote set-url origin https://github.com/BioCyd3/smazdeck-survival-guide.git
git push -u origin main
echo.
echo Repository pushed successfully!
echo.
echo Next steps:
echo 1. Go to https://github.com/BioCyd3/smazdeck-survival-guide/settings/pages
echo 2. Under "Source", select "GitHub Actions"
echo 3. The deployment will start automatically
echo 4. Your site will be available at: https://biocyd3.github.io/smazdeck-survival-guide/
pause