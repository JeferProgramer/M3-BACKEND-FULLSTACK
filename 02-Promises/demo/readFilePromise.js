var fs = require('fs');
const { resolve } = require('path');



var promise = new Promise(function(resolve, reject) {
  // Hacer cosas acá dentro, probablemente asincrónicas.
  fs.readFile('./archivo.txt', 'utf8', function(err, data) { 
    if (err) {
      return reject(Error("Algo se rompió"));
    }else{
      return resolve(data)
    }
  }); 
});
promise.then((value) => {
  console.log(value)
}, (reason) => {
  console.log(reason)
})

const promesaB = new promise((resolve, reject) => {
  let array = [
    {
      nombre: 'camilo',
      apellido: 'pineda',
      rol: 'instructor'
    },
    {
      nombre: 'jeferson',
      apellido: 'cañon',
      rol: 'estudiante'
    },
    {
      nombre: 'martina',
      apellido: 'scomazzon',
      rol: 'instructor'
    },
    {
      nombre: 'gustavo',
      apellido: 'flores',
      rol: 'estudiante'
    }

  ]
  if(true)return resolve(array)
  else return reject('no se completo el pedido')
})
function sucessHandler(value){
  return value.map(persona => {
    return {
      ...persona,
      person : true
    }
  })
}
function errorHandler(reason){
  return console.log(reason)
}
promesaB.then(sucessHandler)
  .catch(errorHandler)

// var nuevaDataPromesa = promise.then(function(data) {
//   var nuevaData = data.split('').splice(0, 100).join('');
//   return nuevaData;
// })

// console.log(promise);

// promise.then(function(data) {
//   console.log('se cumplió la promesa');
// })


// var lectura;
// fs.readFile('./archivo.txt', 'utf8', function(err, data) { 
//   lectura = data;
// }); 

// console.log(lectura);





//    dataBase.verifyUser(username, password, (error, userInfo) => {
//        if (error) {
//            callback(error)
//        }else{
//            dataBase.getRoles(username, (error, roles) => {
//                if (error){
//                    callback(error)
//                }else {
//                    dataBase.logAccess(username, (error) => {
//                        if (error){
//                            callback(error);
//                        }else{
//                            callback(null, userInfo, roles);
//                        }
//                    })
//                }
//            })
//        }
//    })
