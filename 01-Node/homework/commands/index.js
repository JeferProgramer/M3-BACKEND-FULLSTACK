const fs = require('fs');
const { request } = require('http');
function date(data, done){
  done(Date())
}
const pwd = (data, done) => {
    done(process.cwd())
}
function ls(data, done){
    
    let output = ''
    const readDir = fs.readdirSync('.');
    readDir.forEach((file) => {
        output = `${output} ${file}\n`;
    })
    done(output)
}
function clear(data, done){
    console.clear()
    done('')
}
function echo(data, done){
    done(data.join(' '))
}
const cat = (data, done) => {
    try{
        const readFile = fs.readFileSync(data[0], 'utf-8');
        done(readFile)
        return readFile;
    }catch(error){
        throw error
    }
}
const head = (data, done) => {
    fs.readFile(data[0], 'utf-8', (err, lectura) => {
        if(err) throw err
        else{
            done(lectura.split('\n').splice(0, 5).join('\n'))
        }
    })
}
const tail = (data, done) =>{
    fs.readFile(data[0], 'utf-8', (err, lectura) => {
        if(err) throw err
        else{
            let lineas = lectura.split('\n')
            let ultimasLineas = lineas.splice(lineas.length -5 , lineas.length).join('\n')
            done(ultimasLineas)
        }
    })
}
const curl = (data, done) => {
    request(`http://${data[0]}`,  (err, response, body) => {
        if(err) throw err;
        else{
           done(body)
        }
    })
}
module.exports = {
    date,
    pwd,
    ls,
    clear,
    echo,
    cat,
    head,
    tail, 
    curl
}  