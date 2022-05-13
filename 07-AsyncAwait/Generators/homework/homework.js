function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let valorActual = 1;
  while(max ? valorActual <= max: true){
    if(valorActual % 3 === 0 && valorActual % 5 === 0) yield 'Fizz Buzz'
    else if(valorActual % 3 === 0 ) yield 'Fizz'
    else if(valorActual % 5 === 0) yield 'Buzz'
    else yield valorActual
    valorActual++;
  }
}


module.exports = fizzBuzzGenerator;
