const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', {encoding: 'utf8'})

const ws = fs.createWriteStream('./files/new-lorem.txt')


//esto lee los datos desde rs, y luego los escribe en ws, a traves de dataChunck
/* rs.on('data', (dataChunck) => {
    ws.write(dataChunck)
})
 */

//esto hace lo mismo, pero la hace mas corta
rs.pipe(ws)
