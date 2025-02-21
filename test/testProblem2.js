const path = require('path');
const { readFile, convertToUppercaseAndWrite, convertToLowerCaseAndWrite, sortTheContentAndWrite, readFilesAndDelete} = require('../callbacks/problem2.js');

const fileNamesFilePath = path.join(__dirname, 'filenames.txt');
const lipsumFilePath = path.join('./', 'lipsum.txt');

//Test-Cases

// 1. Valid Path (call backs)

readFile(lipsumFilePath, (err, content) => {
    if(err) {
        console.error("Error while reading file: ", err);
        return ;
    }
    console.log("read the lipsum file");

    convertToUppercaseAndWrite(content, fileNamesFilePath, (err, upperCaseFilePath) => {
                  if(err) {
                    console.error("Error: ", err);
                    return ;
                  }
                console.log("converted to uppercase and wrote to a new file")

                  convertToLowerCaseAndWrite(upperCaseFilePath, fileNamesFilePath, (err, lowerCaseFilePath) => {
                    if(err) {
                        console.error("Error: ", err);
                        return ;
                    }
                    console.log("converted to lowercase and wrote to a new file");

                    sortTheContentAndWrite(lowerCaseFilePath, fileNamesFilePath, (err) => {
                          if(err) {
                            console.error("Error: ", err);
                            return ;
                          }
                         console.log("sorted the content and wrote to a new file");

                          readFilesAndDelete(fileNamesFilePath, (err) => {
                                    if(err) {
                                        console.error("Error: ", err);
                                    }
                                    console.log("Deleted all the files successfully")
                     });
                });
          });
    });
});


