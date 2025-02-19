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

const readFileAsync = (filePath) => {
    return fs.readFile(filePath, 'utf8')
            .then((content) => {
                console.log(`Read the file: ${filePath}`);
                return content;
            });
}

const toUppercaseAndWriteAsync = (content) => {
           let upperCaseContent = content.toUpperCase();
           let upperCaseFile = "upperCaseFile.txt";
           let upperCaseFilePath = path.join(process.cwd(),"/test", upperCaseFile);

           return fs.writeFile(upperCaseFilePath, upperCaseContent)
                     .then(() => {
                        console.log("converted the content to uppercase and wrote to a  new file")
                        return upperCaseFile;
                     });
}

const appendFileAsync = (fileNamesFilePath, data) => {
    return fs.appendFile(fileNamesFilePath, data + '\n')
            .then(() => {
                console.log(`Append the ${data} into ${fileNamesFilePath}`);
                return data;
            })
}

const toLowerCaseAndWriteAsync = (content) =>  {
  let lowerCaseContent = content.toLowerCase();
  let lowerCaseFile = 'lowerCaseFile.txt';
  let lowerCaseFilePath = path.join(process.cwd(), "/test", lowerCaseFile);

  let sentences = lowerCaseContent.split('. ').map((sentence) => sentence.trim()).join('.\n');

  return fs.writeFile(lowerCaseFilePath, sentences)
           .then(() => {
            console.log("converted the content to lowercase and split it into sentences and wrote to a new file");
            return lowerCaseFile;
           });
} 

const sortTheContentAndWriteAsync = (content) => {
        let sortedContent = content.split('\n').sort().join('\n');
        let sortedContentFile = 'sortedContentFile.txt';
        let sortedContentFilePath = path.join(process.cwd(), '/test', sortedContentFile);

        return fs.writeFile(sortedContentFilePath, sortedContent)
                .then(() => {
                    console.log("Sorted the content and wrote to a new file");
                    return sortedContentFile;
                });
}

const deleteFilesAsync = (content) => {
    let filesArray = content.split('\n').filter(Boolean);
    let deletePromises = [];
    filesArray.forEach((file) => {
       let filePath = path.join(process.cwd(), '/test', file);
       deletePromises.push(fs.unlink(filePath));
    });

    return Promise.all(deletePromises)
                  .then(() => {
                    console.log("Deleted the files successfully");
                    return ;
                  });
 }
module.exports = { readFileAsync, toUppercaseAndWriteAsync, toLowerCaseAndWriteAsync, sortTheContentAndWriteAsync,appendFileAsync, deleteFilesAsync};

