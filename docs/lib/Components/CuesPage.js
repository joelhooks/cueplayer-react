/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import { Button } from 'reactstrap';
import Helmet from 'react-helmet';
import CuesExample from '../examples/Cues';

const CuesExampleSource = require('!!raw-loader!../examples/Cues');

export default class CuesPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="ControlBar" />
        <h3>Cues</h3>
        <p>CuesZ</p>
        <div className="docs-example">
          <CuesExample />
        </div>
        <pre>
          <PrismCode className="language-jsx">{CuesExampleSource}</PrismCode>
        </pre>
      </div>
    );
  }
}
