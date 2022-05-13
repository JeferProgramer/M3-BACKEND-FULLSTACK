"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// TU CÓDIGO AQUÍ:
function $Promise(executor) {
  if (typeof executor !== "function")
    throw new TypeError(/executor.+function/i);
  this._state = "pending";
  this.executor = executor;
  this._handlerGroups = []; // [{sh1, eh1},{sh2,eh2},{sh3, eh3}]
  return executor(
    this._internalResolve.bind(this),
    this._internalReject.bind(this)
  );
}
$Promise.prototype._internalResolve = function (data) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = data;
    this._callHandle(); //cuando se resuelva se ejecuta
  }
};
$Promise.prototype._internalReject = function (data) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = data;
    this._callHandle(); //cuando se rechaza se ejecuta
  }
};
$Promise.prototype.then = function (successCb, errorCb) {
  if (typeof successCb !== "function") successCb = false;
  if (typeof errorCb !== "function") errorCb = false;
  const downstreamPromise = new $Promise(() => {});
  this._handlerGroups.push({ successCb, errorCb, downstreamPromise }); //esta agregando informacion al array
  if (this._state !== "pending") this._callHandle();
  return downstreamPromise;
};
$Promise.prototype._callHandle = function () {
  while (this._handlerGroups.length > 0) {
    let current = this._handlerGroups.shift();
    if (this._state === "fulfilled") {
      if (!current.successCb) {
        current.downstreamPromise._internalResolve(this._value);
      } else {
        try {
          const result = current.successCb(this._value);
          if (result instanceof $Promise) {
            result.then(
              (value) => current.downstreamPromise._internalResolve(value),
              (err) => current.downstreamPromise._internalReject(err)
            );
          } else {
            current.downstreamPromise._internalResolve(result);
          }
        } catch (e) {
          current.downstreamPromise._internalReject(e);
        }
      }
    } else if (this._state === "rejected") {
      if (!current.errorCb) {
        current.downstreamPromise._internalReject(this._value);
      } else {
        try {
          const resultErro = current.errorCb(this._value);
          if (resultErro instanceof $Promise) {
            resultErro.then(
              (value) => current.downstreamPromise._internalResolve(value),
              (err) => current.downstreamPromise._internalReject(err)
            );
          } else {
            current.downstreamPromise._internalResolve(resultErro);
          }
        } catch (e) {
          current.downstreamPromise._internalReject(e);
        }
      }
    }
  }
};

$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb);
};

$Promise.prototype.resolve = function (data) {};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
