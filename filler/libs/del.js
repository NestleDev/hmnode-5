const fs = require('fs');
const path = require('path');

module.exports = function del(src) {
    fs.readdir(src, (err, files) => {
        if (err) throw err;

        files.forEach((file) => {
            const currentPath = path.join(src, file);

            fs.stat(currentPath, (err, stat) => {
                if (err) throw err;

                if (stat.isDirectory()) {
                    del(currentPath)
                    deleteRecursive(currentPath)
                } else {
                    fs.unlink(currentPath, (err) => {
                        if (err) throw err;

                        deleteRecursive(path.join(currentPath, '../'))
                    })
                }
            })
        })
    })
}

function deleteRecursive(currentPath) {
    isEmpty(currentPath, (err, status) => {
        if (err) throw err;

        if (status) {
            console.log(status)
            console.log(currentPath, "--------");

            fs.rmdir(currentPath, (err) => {
                // if (err) throw err;

                deleteRecursive(path.join(currentPath, '../'))
            })
        }
    });
}

function isEmpty(src, cb) {
    fs.readdir(src, (err, files) => {
        if (err) return cb(err, null);

        if (files.length) {
            cb(null, false);
        } else {
            cb(null, true)
        }
    })
}