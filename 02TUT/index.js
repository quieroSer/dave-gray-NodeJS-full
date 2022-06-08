//const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async() => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8')
        console.log(data)
        //este borra el archivo original
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));



        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you')
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'new-promiseWrite.txt') )
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'new-promiseWrite.txt'), 'utf8')
        console.log(newData)      
    } catch (e) {
        console.error(e);
    }
}

fileOps();

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8' ,(err, data) => {
//     if (err) throw err;
//     console.log(data)
// })

//console.log('Hello...')

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you.' ,(err) => {
//     if (err) throw err;
//     console.log('write complete!')

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYes it is!' ,(err) => {
//         if (err) throw err;
//         console.log('append complete!')
         
//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'new-reply.txt'), (err) => {
//             if (err) throw err;
//             console.log('rename complete!')
//         })
//     })

// })

// fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'Testing text.' ,(err) => {
//     if (err) throw err;
//     console.log('append complete!')
// })

process.on('uncaughtException', err => {
    console.error(`There eas an uncaught error: ${err}`)
    process.exit(1)
})