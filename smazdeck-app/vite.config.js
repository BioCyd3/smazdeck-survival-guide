import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// GitHub Pages configuration
// Set the base path based on environment - use repository name for GitHub Pages
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName = process.env.REPOSITORY_NAME || 'smazdeck-survival-guide';

export default defineConfig({
  // Base path for GitHub Pages deployment
  // For GitHub Pages: /{repository-name}/
  // For local development: /
  base: isGitHubPages ? `/${repositoryName}/` : '/',
  
  plugins: [react()],
  
  // GitHub Pages specific build optimizations
  build: {
    // Output directory (default is 'dist')
    outDir: 'dist',
    
    // Generate source maps for debugging
    sourcemap: false,
    
    // Optimize for production
    minify: true,
    
    // Rollup options for better optimization
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          helmet: ['react-helmet-async']
        }
      }
    },
    
    // Asset handling
    assetsDir: 'assets',
    
    // Ensure compatibility with older browsers
    target: 'es2015'
  },
  
  // Preview server configuration (for testing build locally)
  preview: {
    port: 4173,
    host: true
  }
});
