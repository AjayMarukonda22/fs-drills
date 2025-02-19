const path = require('path');
const { createDirectoryAndFiles, deleteFiles } = require('../callbacks/problem1.js');
const { createDirectory, createRandomFiles, readDirectory, deleteFiles, deleteDirectory } = require('../promises/problem1.js')

const dirPath = path.join(__dirname, "randomFiles");

//Testcases
// 1. Valid path (callbacks)
createDirectoryAndFiles(dirPath, (err) => {
       if(err) {
        console.error(" Error while creating files :" , err);
        return ;
       }

       deleteFiles(dirPath, (err) => {
              if(err) {
               console.error("Error while deleting file: ", err);
               return ;
              }

              console.log("Deleted files successfully");
       });
});
 
// 2.  passing Permission denied directory(i.e root) (callbacks)
const path1 = path.join('/root', 'randomFiles')
createDirectoryAndFiles(path1, (err) => {
    if(err) {
        console.error(" Error while creating files :" , err);
        return ;
       }

       deleteFiles(path1, (err) => {
              if(err) {
               console.error("Error while deleting file: ", err);
               return ;
              }

              console.log("Deleted files successfully");
       });
});

//promises
createDirectory(dirPath)
                        .then((dirPath) => {
                           return createRandomFiles(dirPath, 5);
                        })
                        .then((dirPath) => {
                            return readDirectory(dirPath);
                        })
                        .then((files) => {
                            return deleteFiles(dirPath, files);
                        })
                        .then((dirPath) => {
                            return deleteDirectory(dirPath);
                        })
                        .catch((err) => {
                            console.error(err);
                        })
