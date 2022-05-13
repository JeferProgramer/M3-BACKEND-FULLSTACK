// const commands = require('./commands');

// //salida
// const done = function (output) {
//   process.stdout.write(output);
//   process.stdout.write('\nprompt >');
// }
// //entrada
// process.stdout.write('nprompt >');
// // El evento stdin 'data' se dispara cuando el user escribe una línea
// process.stdin.on('data', function(data){
//   var args = data.toString().trim().split();
//   var cmd = args.shift();

//   commands[cmd](args, done)
// })

const commands = require('./commands');
process.stdout.write('\npollitos > ');
const done = (output) => {
  process.stdout.write(output)
  process.stdout.write("\npollitos > ")
}
process.stdin.on('data', function(data){
  var cmd = data.toString().trim().split(' ');
  let comando = cmd.shift()
  //es una propiedad se pregunta si esta en cmd y llamamos a esa propedad esa funcion
  if(commands[comando]) commands[comando](cmd, done)
  else process.stdout.write('El comando no es reconocido');
})