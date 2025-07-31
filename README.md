# Smazdeck Survival Guide

A comprehensive survival guide for Smazdeck with tier lists, strategies, and tips.

## 🚀 Live Site

Visit the live site at: [https://biocyd3.github.io/smazdeck-survival-guide/](https://biocyd3.github.io/smazdeck-survival-guide/)

## 📋 Features

- **Tier Lists**: Comprehensive tier lists for different battle categories
- **Smaz Profiles**: Detailed information about each Smaz
- **Battle Strategies**: Tips and strategies for different battle scenarios
- **Team Compositions**: Recommended team builds
- **Game Mechanics**: Information about camp upgrades and tech tree buffs
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Development

This project is built with:
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Vitest** - Testing framework

### Local Development

```bash
cd smazdeck-app
npm install --legacy-peer-deps
npm run dev
```

### Building for Production

```bash
cd smazdeck-app
npm run build
```

### Testing

```bash
cd smazdeck-app
npm test
```

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow:

1. Triggers on pushes to the `main` branch
2. Builds the React application with Vite
3. Configures the build for GitHub Pages with the correct base path
4. Deploys to GitHub Pages

### Manual Deployment

If you need to deploy manually:

1. Ensure you have the correct environment variables:
   ```bash
   GITHUB_PAGES=true
   REPOSITORY_NAME=smazdeck-survival-guide
   ```

2. Build the project:
   ```bash
   cd smazdeck-app
   npm run build
   ```

3. The built files will be in `smazdeck-app/dist/`

## 📁 Project Structure

```
├── .github/workflows/     # GitHub Actions workflows
├── smazdeck-app/         # Main React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── data/         # Game data (JSON files)
│   │   └── styles/       # CSS styles
│   ├── public/           # Static assets
│   └── dist/             # Built application (generated)
├── data/                 # Raw game data
└── test-deployment.js    # Deployment test script
```

## 🧪 Testing Deployment

Run the deployment test script to verify everything is configured correctly:

```bash
node test-deployment.js
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.
