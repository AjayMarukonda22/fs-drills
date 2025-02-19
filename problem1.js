const fs = require('fs');
const path = require('path');

// 1. Create a directory and generate JSON files
const createDirectoryAndFiles = (dirPath, callback) => {
    fs.mkdir(dirPath, (err) => {
        if (err) 
           return callback(err);

        console.log("created directory");

        let filesCreated = 0;
        for (let i = 1; i <= 5; i++) {
            const filePath = path.join(dirPath, `file${i}.json`);
            const data = JSON.stringify({ id: i, value: `file${i}` });

            fs.writeFile(filePath, data, (err) => {
                if (err) 
                   return callback(err);

                filesCreated++;
                if (filesCreated === 5)  {
                    console.log("created files successfully")
                    return callback(null);
                }
            });
        }
    });
}

// 2. Delete those files simultaneously 
const deleteFiles = (dirPath, callback) => {
    fs.readdir(dirPath, (err, files) => {
        if(err) {
            console.error("Error while reading files: ", err);
            return ;
        }
           
        let filesDeleted = 0;
        files.forEach((file => {
            fs.unlink(path.join(dirPath, file), (err) => {
                if(err) {
                 return callback(err);
                }
                
                filesDeleted++;
                if(filesDeleted === 5) {
                   return callback(null);
                }
            });
        }));
    });
};

module.exports = {createDirectoryAndFiles, deleteFiles};

