const fs = require('fs');
const path = require('path');


//Creating a new promise for each Async Function

//create a directory
const createDirectoryManually = (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath,{recursive: true}, (err) => {
            if(err) {
                reject(err);
            }
            else {
                console.log(`Created the directory at ${dirPath}`)
               resolve(dirPath);
            }
        });
    });
};

//create and write to a file
const writeToFileManually = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if(err) {
                reject(err);
            }
            else {
                console.log(`created the file at ${filePath}`);
            resolve();
            }
        });
    });
};

//createRandomn files
const createRandomnFilesManually = (dirPath, count) => {
       let filePromises = [];

       for(let i = 1 ; i <= count ; i++) {
        let filePath = path.join(dirPath, `file${i}.json`);
        let data = JSON.stringify({id : i, value: `files${i}`});

        filePromises.push(writeToFileManually(filePath, data));
       }

       return Promise.all(filePromises)
                     .then(() => {
                        console.log("created the files successfully");
                        return dirPath;
                     })
};

//delete a single file
const deleteFileManually = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if(err)
                reject(err);
            else {
                console.log(`deleted the file: ${filePath}`)
            resolve();
            }
        });
    });
}

//read the directory
const readDirectoryManually = (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if(err)
                reject(err);
            else
            resolve(files);
        });
    });
}

//delete all the files simultaneously
const deleteAllTheFilesManually = (dirPath, files) => {

    let deletePromises = files.map((file) => {
        let filePath = path.join(dirPath, file);
        return deleteFileManually(filePath);
    })
    return Promise.all(deletePromises)
                  .then(() => {
                    console.log("deleted all the files successfully");
                    return dirPath;
                  });

}

// delete the directory
const deleteTheDirectoryManually = (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.rmdir(dirPath, (err) => {
            if(err)
                reject(err)
            else {
                console.log(`deleted the directory at ${dirPath} successfully`);
                resolve();
            }
        })
    })
}


//testing

const dirPath = path.join(__dirname, "randomFiles");

createDirectoryManually(dirPath)
                                .then((dirPath) =>  createRandomnFilesManually(dirPath, 5))
                                .then((dirPath) =>  readDirectoryManually(dirPath))
                                .then((files)   =>  {
                                     return new Promise((resolve) => {
                                        setTimeout(() => { deleteAllTheFilesManually(dirPath, files).then(() => resolve(dirPath))}, 5000);
                                        })
                                 })
                                 .then((dirPath) => {
                                    return new Promise((resolve) => {
                                       setTimeout(() => { deleteTheDirectoryManually(dirPath).then(resolve)}, 3000);
                                     });
                                 })
                                .catch((err) => {
                                    console.error(err);
                                })
                               
