const fs = require('fs')
fs.copyFile('build/index.html', 'build/404.html', (err) => {
  if (err) throw err
  console.log('index.html was copied to 404.html')
})