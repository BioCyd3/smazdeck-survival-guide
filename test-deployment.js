#!/usr/bin/env node

/**
 * Test script to validate GitHub Pages deployment setup
 * This simulates the deployment process locally
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Testing GitHub Pages deployment setup...\n');

// Test 1: Check if required files exist
console.log('📁 Checking required files...');
const requiredFiles = [
  '.github/workflows/deploy.yml',
  'smazdeck-app/package.json',
  'smazdeck-app/vite.config.js',
  'smazdeck-app/public/404.html',
  'smazdeck-app/index.html'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing!');
  process.exit(1);
}

// Test 2: Validate workflow syntax
console.log('\n📋 Validating workflow syntax...');
try {
  const workflowContent = fs.readFileSync('.github/workflows/deploy.yml', 'utf8');
  
  // Basic YAML validation checks
  if (workflowContent.includes('name:') && 
      workflowContent.includes('on:') && 
      workflowContent.includes('jobs:')) {
    console.log('✅ Workflow file has valid structure');
  } else {
    console.log('❌ Workflow file structure is invalid');
  }
  
  // Check for required permissions
  if (workflowContent.includes('pages: write') && 
      workflowContent.includes('id-token: write')) {
    console.log('✅ Workflow has correct permissions');
  } else {
    console.log('❌ Workflow missing required permissions');
  }
  
} catch (error) {
  console.log(`❌ Error reading workflow file: ${error.message}`);
}

// Test 3: Test build process
console.log('\n🔨 Testing build process...');
try {
  process.chdir('smazdeck-app');
  
  // Set environment variables for GitHub Pages
  process.env.GITHUB_PAGES = 'true';
  process.env.REPOSITORY_NAME = 'smazdeck-survival-guide';
  
  console.log('📦 Installing dependencies...');
  execSync('npm install --legacy-peer-deps', { stdio: 'pipe' });
  console.log('✅ Dependencies installed');
  
  console.log('🏗️ Building application...');
  execSync('npm run build', { stdio: 'pipe' });
  console.log('✅ Build completed');
  
  // Check if dist directory was created
  if (fs.existsSync('dist')) {
    console.log('✅ dist directory created');
    
    // Check if key files exist in dist
    const distFiles = ['index.html', '404.html'];
    distFiles.forEach(file => {
      if (fs.existsSync(path.join('dist', file))) {
        console.log(`✅ dist/${file} exists`);
      } else {
        console.log(`❌ dist/${file} missing`);
      }
    });
    
    // Check if assets have correct base path
    const indexContent = fs.readFileSync('dist/index.html', 'utf8');
    if (indexContent.includes('/smazdeck-survival-guide/')) {
      console.log('✅ Assets have correct base path for GitHub Pages');
    } else {
      console.log('❌ Assets missing GitHub Pages base path');
    }
    
  } else {
    console.log('❌ dist directory not created');
  }
  
} catch (error) {
  console.log(`❌ Build failed: ${error.message}`);
}

console.log('\n🎉 Deployment setup test completed!');
console.log('\n📝 Next steps:');
console.log('1. Push this repository to GitHub');
console.log('2. Enable GitHub Pages in repository settings');
console.log('3. Set source to "GitHub Actions"');
console.log('4. Push changes to main branch to trigger deployment');