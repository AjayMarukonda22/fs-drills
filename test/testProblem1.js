const path = require('path');
const { createDirectoryAndFiles, deleteFiles, deleteDirectory } = require('../callbacks/problem1.js');

const dirPath = path.join(__dirname, "randomFiles");

//Testcases
// 1. Valid path (callbacks)
createDirectoryAndFiles(dirPath, (err, dirPath) => {
       if(err) {
        console.error(" Error while creating files :" , err);
        return ;
       }

       deleteFiles(dirPath, (err, dirPath) => {
              if(err) {
               console.error("Error while deleting file", err);
               return ;
              }

              deleteDirectory(dirPath, (err) => {
                if(err) {
                    console.log(`Error while deleting the directory`, err);
                    return ;
                }
              })
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
             
              deleteDirectory(dirPath, (err) => {
                if(err) {
                    console.log(`Error while deleting the directory`, err);
                    return ;
                }
              });
       });
});

