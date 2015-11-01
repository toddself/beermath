# beermath

A collection of functions to help shape and create beer recipes.

## installation
`npm i -S beermath`

## usage

The `/dist` directory contains the ES6 source code, including an `index.js` that exports all of the symbols.  The `jsnext:main` key points here to allow this to be used with ES6 build tools (like (Rollup)[https://www.github.com/rollup/rollup)).

The `/src` directory contains the compiled-down ES5 variant which is generated when this package is published to NPM (or when you do `npm run build`).

## license
Copyright © 2015 Todd Kennedy, [Apache 2.0](license)
