const fs = require('fs/promises');
const path = require('path');

/*
    Problem 1:
    
    Using promises and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

// Consuming the Promises using .then()

//create a directory
const createDirectory = (dirPath) => {

    return fs.mkdir(dirPath, {recursive: true})
             .then(() => {
                console.log('Created directory successfully');
                return dirPath;
             })
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
                  })
}

//read the directory
const readDirectory = (dirPath) => {
    return fs.readdir(dirPath)
             .then((files) => {
                console.log("Read the files successfully");
                return files;
             })
}


//delete the files
const deleteFiles = (dirPath, files) => {

    const deletePromises =  files.map((file) => {
        let filePath = path.join(dirPath, file);
        return fs.unlink(filePath);
    });

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


//testing
const dirPath = path.join(__dirname, "randomFiles");
//promises (consuming the readymade promises)
createDirectory(dirPath)
                        .then((dirPath) =>  createRandomFiles(dirPath, 5))
                        .then((dirPath) =>  readDirectory(dirPath))
                        .then((files)   =>  {
                            return new Promise((resolve) => {
                                setTimeout(() => { deleteFiles(dirPath, files).then(() => resolve(dirPath))}, 5000);
                            });
                        })
                        .then((dirPath) => {
                            return new Promise((resolve) => {
                                setTimeout(() => { deleteDirectory(dirPath).then(resolve)}, 3000);
                            });
                        })
                        .catch((err)    =>  console.error('Process failed:', err))
