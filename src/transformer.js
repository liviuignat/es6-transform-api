// import babel from 'babel-core';
const babel = require('babel-core');

const PRESETS = {
  'presets': ['react', 'es2015', 'stage-0'],
  'plugins': [
    'transform-runtime',
    'add-module-exports',
    'transform-decorators-legacy',
    'transform-react-display-name'
  ]
};

export function transform(code) {
  const result = babel.transform(code, PRESETS);
  return result.code;
}
