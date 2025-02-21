const fs = require('fs');
const path = require('path');


//Creating a new promise for each Async function

//readFile
const readFileManually =(filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if(err)
                reject(err);
            else {
                console.log(`read the file: ${filePath}`);
                resolve(data);
            }
        });
    });
}

//convert to uppercase and write
const convertToUpperCaseAndWriteManually = (content) => {
    let upperCaseContent = content.toUpperCase();
    let upperCaseFile = "upperCaseFile.txt";
    let upperCaseFilePath = path.join(__dirname, upperCaseFile);

    return new Promise((resolve, reject) => {
          fs.writeFile(upperCaseFilePath, upperCaseContent, (err) => {
                       if(err)
                          reject(err);
                        else {
                            console.log(`converted the content to uppercase and wrote to file: ${upperCaseFile}`);
                            resolve(upperCaseFile);
                        }
          });
    });
}

//append the content to file
const appendToFileManually = (fileNamesFilePath, content) => {
      return new Promise((resolve, reject) => {
             fs.appendFile(fileNamesFilePath, content + '\n', (err) => {
                    if(err)
                        reject(err);
                    else {
                        console.log(`append the content ${content} to file: ${fileNamesFilePath}`);
                        resolve(content);
                    }
             });
      });
}

/// convert to lowercase and write to a new file
const convertToLowerCaseAndWriteManually = (content) => {
        let lowerCaseContent = content.toLowerCase();
        let lowerCaseFile = 'lowerCaseFile.txt';
        let lowerCaseFilePath = path.join(__dirname, lowerCaseFile);

        let sentences = lowerCaseContent.split('. ').map((sentence) => sentence.trim()).join('\n');

        return new Promise((resolve, reject) => {
            fs.writeFile(lowerCaseFilePath, sentences, (err) => {
                if(err)
                    reject(err);
                else {
                    console.log(`convert the content to lowercase and wrote to the file: ${lowerCaseFile}`)
                   resolve(lowerCaseFile);
                }
            });
        });
}

//sort the content and write to a file
const sortTheContentAndWriteManually = (content) => {
    let sortedContent = content.split('\n').sort().join('\n');
    let sortedContentFile = 'sortedContentFile.txt';
    let sortedContentFilePath = path.join(__dirname, sortedContentFile);

    return new Promise((resolve, reject) => {
        fs.writeFile(sortedContentFilePath,sortedContent, (err) => {
            if(err)
                reject(err);
            else {
                console.log(`sorted the content and wrote to a file: ${sortedContentFile}`);
                resolve(sortedContentFile);
            }
        });
    });
}

//delete a single file 
const deleteFileManually = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if(err)
                reject(err);
            else {
                console.log(`deleted the file at ${filePath}`);
                resolve();
            }
        });
    });
}

//delete all the files
const deleteAllTheFilesManually = (content) => {
    let files = content.split('\n').filter(Boolean);
    let deletePromises = [];

    for(let file of files) {
        let filePath = path.join(__dirname, file);
        deletePromises.push(deleteFileManually(filePath));
    }

    return Promise.all(deletePromises)
                  .then(() => {
                    console.log("deleted all the files successfully");
                  });

}


//testing
const lipSumFilePath = path.join('./', 'lipsum.txt');
const fileNamesFilePath = path.join(__dirname, 'filenames.txt');

readFileManually(lipSumFilePath)
                                .then((content)  =>  convertToUpperCaseAndWriteManually(content))
                                .then((fileName) =>  appendToFileManually(fileNamesFilePath, fileName))
                                .then((fileName) => {
                                    let filePath = path.join(__dirname, fileName);
                                    return readFileManually(filePath);
                                })
                                .then((content)  =>   convertToLowerCaseAndWriteManually(content))
                                .then((fileName) =>   appendToFileManually(fileNamesFilePath, fileName))
                                .then((fileName) => {
                                    let filePath = path.join(__dirname, fileName);
                                    return readFileManually(filePath);
                                })
                                .then((content)  =>   sortTheContentAndWriteManually(content))
                                .then((fileName) =>   appendToFileManually(fileNamesFilePath, fileName))
                                .then(()         =>   readFileManually(fileNamesFilePath))
                                .then((files)    =>   {
                                    return new Promise((resolve) => {
                                        setTimeout(() => { deleteAllTheFilesManually(files).then(resolve) }, 5000)
                                        })
                                 })
                                 .then(()        =>   deleteFileManually(fileNamesFilePath))
                                .catch((err) => {
                                    console.error(err);
                                })


