// Simple test to verify the deployment is working
const https = require('https');

function testDeployment() {
  const url = 'https://biocyd3.github.io/smazdeck-survival-guide/';
  
  https.get(url, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Status Code:', res.statusCode);
      console.log('Content-Type:', res.headers['content-type']);
      
      // Check if HTML contains the expected elements
      const hasRoot = data.includes('<div id="root">');
      const hasTitle = data.includes('Smazdeck Survival');
      const hasAssets = data.includes('/smazdeck-survival-guide/assets/');
      const hasRedirectScript = data.includes('sessionStorage.redirect');
      
      console.log('✓ HTML Structure Tests:');
      console.log('  - Has root div:', hasRoot ? '✅' : '❌');
      console.log('  - Has correct title:', hasTitle ? '✅' : '❌');
      console.log('  - Has correct asset paths:', hasAssets ? '✅' : '❌');
      console.log('  - Has SPA redirect script:', hasRedirectScript ? '✅' : '❌');
      
      if (hasRoot && hasTitle && hasAssets && hasRedirectScript) {
        console.log('\n🎉 Deployment appears to be working correctly!');
        console.log('The React app should load properly with the correct basename.');
      } else {
        console.log('\n❌ Deployment has issues that need to be addressed.');
      }
    });
  }).on('error', (err) => {
    console.error('Error testing deployment:', err.message);
  });
}

testDeployment();