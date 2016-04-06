import Express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import bodyParser from 'body-parser';

import {render} from './renderer';

const app = new Express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.get(`/api/component/render`, (req, res) => {
  const component = `
    import React from 'react';

    export default class MainComponent extends React.Component {
      static propTypes = {
        value: React.PropTypes.string.isRequired,
        fullName: React.PropTypes.string
      };

      render() {
        return (
          <div style={{backgroundColor: 'white', padding: 16}}>
            <h1 style={{color: 'green'}}>{this.props.value}</h1>
            <p>{this.props.fullName}</p>
          </div>
        );
      }
    }
  `;

  const data = {
    value: 'test this shit',
    fullName: 'Alex.Ardelean'
  };

  const {code, html, propTypes} = render(component, data);

  res.send({code, html, propTypes});
});

app.post(`/api/component/render`, (req, res) => {
  const component = req.body.component;
  const data = req.body.data;

  const {html, code, propTypes} = render(component, data);

  res.send({code, html, propTypes});
});

export default app;
