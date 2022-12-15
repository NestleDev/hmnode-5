const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const Observer = require('./libs/observer');
const del = require('./libs/del');

const args = yargs
    .usage('Usage: $0 [options]')
    .help('help')
    .alias('help', 'h')
    .version('0.0.1')
    .alias('version', 'v')
    .example('$0 --entry ./path --dist ./path -D')
    .option('entry', {
        alias: 'e',
        describe: 'Путь к читаемой директории',
        demandOption: true
    })
    .option('dist', {
        alias: 'd',
        describe: 'Путь куда выложить',
        default: './dist'
    })
    .option('delete', {
        alias: 'D',
        describe: 'Удалять ли ?',
        default: false,
        boolean: true
    })
    .epilog('homework 1')
    .argv

const observer = new Observer(() => {
    console.log('*** end reading ***');
    if (args.delete) {
        del(args.entry)
        console.log('delete');
    }
})

function sorting(src) {
    observer.addObserver(src);
    fs.readdir(src, (err, files) => {
        if (err) throw err;

        files.forEach((file)=> {
            const currentPath = path.join(src, file);
            observer.addObserver(currentPath)

            fs.stat(currentPath, (err, stat) =>{
                if (err) throw err;

                if (stat.isDirectory()) {
                    observer.removeObserver(currentPath)
                    sorting(currentPath)
                } else {
                    console.log(currentPath)
                    observer.removeObserver(currentPath)
                }
            })
        })

        observer.removeObserver(src);
    })
}

sorting(args.entry)
observer.start('GO')