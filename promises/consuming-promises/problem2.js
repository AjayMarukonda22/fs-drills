const fs = require('fs/promises');
const path = require('path');

/*
    Problem 2:
    
    Using promises and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

//Read file
const readFileAsync = (filePath) => {
    return fs.readFile(filePath, 'utf8')
            .then((content) => {
                console.log(`Read the file: ${filePath}`);
                return content;
            })
}

//convert to uppercase and write to a file
const toUppercaseAndWriteAsync = (content) => {
           let upperCaseContent = content.toUpperCase();
           let upperCaseFile = "upperCaseFile.txt";
           let upperCaseFilePath = path.join(__dirname, upperCaseFile);

           return fs.writeFile(upperCaseFilePath, upperCaseContent)
                     .then(() => {
                        console.log(`converted the content to uppercase and wrote to file ${upperCaseFile}`)
                        return upperCaseFile;
                     })
}

//append the content to a file
const appendFileAsync = (fileNamesFilePath, data) => {
    return fs.appendFile(fileNamesFilePath, data + '\n')
            .then(() => {
                console.log(`Append the ${data} into ${fileNamesFilePath}`);
                return data;
            })
}

//convert to lowercase and write to a file
const toLowerCaseAndWriteAsync = (content) =>  {
  let lowerCaseContent = content.toLowerCase();
  let lowerCaseFile = 'lowerCaseFile.txt';
  let lowerCaseFilePath = path.join(__dirname, lowerCaseFile);

  let sentences = lowerCaseContent.split('. ').map((sentence) => sentence.trim()).join('.\n');

  return fs.writeFile(lowerCaseFilePath, sentences)
           .then(() => {
            console.log(`converted the content to lowercase and split it into sentences and wrote to a file ${lowerCaseFile}`);
            return lowerCaseFile;
           })
} 

//sort the content and write to a file
const sortTheContentAndWriteAsync = (content) => {
        let sortedContent = content.split('\n').sort().join('\n');
        let sortedContentFile = 'sortedContentFile.txt';
        let sortedContentFilePath = path.join(__dirname, sortedContentFile);

        return fs.writeFile(sortedContentFilePath, sortedContent)
                .then(() => {
                    console.log(`Sorted the content and wrote to file ${sortedContentFile}`);
                    return sortedContentFile;
                })
}

//delete the files
const deleteFilesAsync = (content) => {
    let filesArray = content.split('\n').filter(Boolean);
    
    let deletePromises =  filesArray.map((file) => {
       let filePath = path.join(__dirname, file);
       return fs.unlink(filePath);
    });

    return Promise.all(deletePromises)
                  .then(() => {
                    console.log("Deleted the files successfully");
                    return ;
                  })
        
 }

//Promises (consuming readymade promises)
const fileNamesFilePath = path.join(__dirname, 'filenames.txt');
const lipsumFilePath = path.join('./', 'lipsum.txt');

readFileAsync(lipsumFilePath)
                       .then((content)  =>  toUppercaseAndWriteAsync(content))
                       .then((fileName) =>  appendFileAsync(fileNamesFilePath, fileName))
                       .then((fileName) =>  {
                          let filePath = path.join(__dirname, fileName);
                           return readFileAsync(filePath);
                            })
                        .then((content)  =>  toLowerCaseAndWriteAsync(content))
                        .then((fileName) =>  appendFileAsync(fileNamesFilePath, fileName))
                        .then((fileName) => {
                  let filePath = path.join(__dirname, fileName);
                      return readFileAsync(filePath);
                            })
                        .then((content)  =>  sortTheContentAndWriteAsync(content))
                        .then((fileName) =>  appendFileAsync(fileNamesFilePath, fileName))
                        .then(()         =>  readFileAsync(fileNamesFilePath))
                       .then((contents)  => { 
                        return new Promise((resolve) => {
                            setTimeout(() => { deleteFilesAsync(contents).then(resolve) }, 10000);
                              });
                        })
                       .catch((err) => {
                        console.error(err);
                          })