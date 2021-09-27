var fs = require('fs');
var filename = __dirname + '/index.js';

fs.readFile(filename, 'utf8', (error, data) => {
  console.log(data);

  fs.writeFile(filename, data + '\r\n\r\nconsole.log(\'Added code to the end of file.\');', (error) => {
    console.info(fs.readFileSync(filename, 'utf8'));
  });
});

console.log('Added code to the end of file.');