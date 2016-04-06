import vm from 'vm';
import mdl from 'module';
import {transform} from './transformer';

export function render(snippet, data = {}) {
  const finalSnippet = `${snippet}`;
  const code = transform(finalSnippet);
  const finalCode = `${code}
    var React = require('react');
    var ReactDOM = require('react-dom/server');
    var data = JSON.parse('${JSON.stringify(data)}');
    var html = ReactDOM.renderToString(React.createElement(MainComponent, data));
    return {
      html: html,
      component: MainComponent
    };
  `;

  const {html, component} = vm.runInThisContext(mdl.wrap(finalCode))(exports, require, module, __filename, __dirname);
  const propTypes = Object.keys(component.propTypes || {}).map(name => {
    return {name};
  });
  return {html, code, propTypes};
}
