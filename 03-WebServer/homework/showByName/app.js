var http = require('http'); // importamos el módulo http para poder trabajar con el protocolo
var fs = require('fs')

http.createServer( function(req, res){ // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket
	//Para crear un response empezamos escribiendo el header
    fs.readFile(`${__dirname}/images/${req.url}.jpg`, (err, data) =>{
        if(err){
            res.writeHead(404, {"Content-type": "text/plain"});
            res.end('404 hubo un error');
        }else{
            res.writeHead(200, {"Content-type": "image/jpg"});
            res.end(data)
        }
    }) 
}).listen(1337, '127.0.0.1'); 

