const path = require('path');
const { createDirectoryAndFiles, deleteFiles } = require('../problem1.js');

const dirPath = path.join(__dirname, "randomFiles");

//Testcases
// 1. Valid path
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
 
// 2.  passing Permission denied directory(i.e root)
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
