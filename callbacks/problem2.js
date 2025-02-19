const fs = require('fs');
const path = require('path');

/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

// 1. Read the given file lipsum.txt
   const readFile = (filePath, callback) => {
       fs.readFile(filePath, 'utf8', (err, content) => {
            if(err) 
               return callback(err); 

       return callback(null, content);
   })
}

// 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
    const convertToUppercaseAndWrite = (content,fileNamesFilePath, callback) => {
        let upperCaseContent = content.toUpperCase();
        let upperCaseFile = "upperCaseFile.txt";
        let upperCaseFilePath = path.join(process.cwd(),"/test", upperCaseFile)
        fs.writeFile(upperCaseFilePath, upperCaseContent, (err) => {
            if(err)
                return callback(err);
                
              fs.appendFile(fileNamesFilePath, upperCaseFile + '\n', (err) =>  {
                    if(err)
                        return callback(err);

                   return callback(null, upperCaseFilePath);
              });
        });
    };


// 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt

const convertToLowerCaseAndWrite = (upperCaseFilePath, fileNamesFilePath, callback) => {
    fs.readFile(upperCaseFilePath, 'utf8', (err, content) => {
        if(err)
            return callback(err);

        let lowerCasecontent = content.toLowerCase();
        let sentences = lowerCasecontent.split('. ').map((sentence) => sentence.trim()).join('.\n');

        let lowerCaseFile = "lowerCaseFile.txt";
        let lowerCaseFilePath = path.join(process.cwd(), "/test", lowerCaseFile);

        fs.writeFile(lowerCaseFilePath, sentences, (err) => {
               if(err)
                return callback(err);

               fs.appendFile(fileNamesFilePath, lowerCaseFile + '\n', (err) => {
                     if(err)
                        return callback(err);

                     return callback(null, lowerCaseFilePath);
               });
        });

    });
};

// 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
const sortTheContentAndWrite = (lowerCaseFilePath, fileNamesFilePath, callback) => {
    fs.readFile(lowerCaseFilePath, 'utf8', (err, content) => {
               if(err)
                return callback(err);
            let sortedContent = content.split('\n').sort().join('\n');
            let sortedContentFile = 'sortedContentFile.txt';
            let sortedContentFilePath = path.join(process.cwd(), '/test', sortedContentFile);

            fs.writeFile(sortedContentFilePath, sortedContent, (err) => {
                      if(err)
                        return callback(err);
                    fs.appendFile(fileNamesFilePath, sortedContentFile + '\n', (err) => {
                        if(err)
                            return callback(err);

                        return callback(null);
                    });
            });
    });
};

// 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
const readFilesAndDelete = (fileNamesFilePath, callback) => {
    fs.readFile(fileNamesFilePath, 'utf8', (err, data) => {
              if(err)
                 return callback(err);
                
                let files = data.split('\n').filter(Boolean);
                let numberOfFilesLeft = files.length;

                files.forEach((file) => {
                    let filePath = path.join(process.cwd(), '/test',file);
                    fs.unlink(filePath, (err) => {
                        if(err)
                            return callback(err);

                        numberOfFilesLeft--;
                        if(numberOfFilesLeft === 0)
                            return callback(null);
                    });
                });
    });
};

module.exports = { readFile, convertToUppercaseAndWrite, convertToLowerCaseAndWrite, sortTheContentAndWrite, readFilesAndDelete};