/*********** Yo explico `exerciseUtils` ********
*
* excersiceUtils es una variable que viene de un archivo en este repo
* El archivo `./utils` esta en este nivel y se llama `utils.js`
*
* Este archivo crea un `promisifiedReadFile` - FIJATE EN ÉL!!!
*
* Las funciones `blue` y `magenta` para mantener tu código DRY
*
***********************************************/

'use strict';

var Promise = require('bluebird'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    blue = exerciseUtils.blue,
    magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE,
  problemF: problemF
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

const fileReadAsync = async(file) => {
  try {
    blue(await promisifiedReadFile(file))
  } catch (error) {
    magenta(error)
  }
}

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loguea el poema uno stanza uno (ignorá errores)
   *
   */
  // AsyncAwait version
  fileReadAsync('poem-one/stanza-01.txt')
}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loggea el poema uno stanza dos y tres, en cualquier orden
   *    (ignora errores)
   *
   */

  // AsyncAwait version
  fileReadAsync('poem-one/stanza-02.txt')
  fileReadAsync('poem-one/stanza-03.txt')

}

async function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. lee & loggea el poema uno stanza dos y *DESPUES* lee & loggea
   *    stanza tres. Loggea 'done' cuando ambas hayan terminado. Fijate
   *    que los specs estan opinionados y espara la palabra exacata
   *    'done' (case sensitive) para ser loggeada para poder pasar
   *    (ignora errores)
   *
   */
  // AsyncAwait version
  await fileReadAsync('poem-one/stanza-02.txt')
  await fileReadAsync('poem-one/stanza-03.txt')
  console.log('done')
}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea el poema uno stanza cuatro o un error si llega a ocurrir
   *
   */
  // AsyncAwait version
  fileReadAsync('poem-one/wrong-file-name.txt')
}

async function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Lee y loggea el poema uno stanza tres y *DESPUES* lee y loggea la
   *    stanza cuatro o loggea un error si llegase a ocurrir para
   *    cuaquiera de las lecturas
   *
   */
  // AsyncAwait version
  await fileReadAsync('poem-one/stanza-03.txt')
  await fileReadAsync('poem-one/wrong-file-name.txt')
}

async function problemF () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * F. Lee & loggea el poema uno stanza tres y *DESPUES* lee y loguea la
   *    stanza cuatro o loggea un error si occrre para cualquiera de las
   *    lecturas y siempre loggea 'done' cuando todo haya terminado
   *
   */
  // AsyncAwait version
  await fileReadAsync('poem-one/stanza-03.txt')
  await fileReadAsync('poem-one/wrong-file-name.txt')
  console.log('done')
}
