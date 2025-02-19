const { error } = require('console');
const fs = require('fs/promises');
const path = require('path');

/*
    Problem 1:
    
    Using promises and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

//create a directory
const createDirectory = (dirPath) => {

    return fs.mkdir(dirPath)
             .then(() => {
                console.log('Created directory successfully');
                return dirPath;
             });
}

//create random files
const createRandomFiles = (dirPath, count) => {

    const filePromises = [];
    for(let i = 1 ; i <= count ; i++) {
        let filePath = path.join(dirPath, `file${i}.json`);
        let data = JSON.stringify({id : i, value: `file${i}`});

        filePromises.push(fs.writeFile(filePath, data));
    }

    return Promise.all(filePromises)
                  .then(() => {
                    console.log('Created files successfully');
                    return dirPath;
                  });
}

//read the directory
const readDirectory = (dirPath) => {
    return fs.readdir(dirPath)
             .then((files) => {
                console.log("Read the files successfully");
                return files;
             });
}


//delete the files
const deleteFiles = (dirPath, files) => {
    const deletePromises = [];

    files.forEach((file) => {
        let filePath = path.join(dirPath, file);
        deletePromises.push(fs.unlink(filePath));
    })

    return Promise.all(deletePromises)
                  .then(() => {
                    console.log("Deleted all the files successfully");
                    return dirPath;
                  })
}


//delete the directory
const deleteDirectory = (dirPath) => {
    return fs.rmdir(dirPath)
            .then(() => {
                console.log("Deleted the directory successfully");
            })
}


module.exports = { createDirectory, createRandomFiles, readDirectory, deleteFiles, deleteDirectory};
