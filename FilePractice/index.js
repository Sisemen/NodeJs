var fs = require('fs');
var filename = __dirname + '/index.js';
var duplicate_file_storage = __dirname + '/DuplicateFileStorage';
var index_duplicate = duplicate_file_storage + '/index_duplicate.js';
var gitignore = __dirname + '/.gitignore';

fs.readFile(filename, 'utf8', (error, data) => {
  fs.access(index_duplicate, (err) => {
    if (err === null) {
      fs.unlink(index_duplicate, (err) => {
        if(err !== null)
          console.error(err);
        else
          fs.rmdir(duplicate_file_storage, (err) => {
            if (err !== null) {
              console.error(err);
            }
            else {
              create_file(data);
            }
          });
      });
    }
    else if (err.code !== 'ENOENT') {
      console.error(err);
    }
    else {
      create_file(data);
    }
  });
});

function create_file(content) {
  fs.mkdir(duplicate_file_storage, (err) => {
    if(err === null) {
      var file_content = '// This file is just a duplicate of the \"index.js\".\r\n\r\n' + content;

      fs.writeFile(index_duplicate, file_content, (err) => {
        if(err !== null) {
          console.error(err);
        }
      });

      fs.access(gitignore, (err) => {
        if (err && err.code === 'ENOENT')
          fs.writeFile(__dirname + '/.gitignore', 'DuplicateFileStorage/', () => { });
      });
    }
  });
}