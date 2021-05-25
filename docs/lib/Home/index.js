import React from 'react';
import { PrismCode } from 'react-prism';
import { Button, Container, Row, Col, Jumbotron } from 'reactstrap';
import { Link } from 'react-router';
import BasicExample from '../examples/import-basic';

const importBasic = require('!!raw-loader!../examples/import-basic');

export default () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={{ size: 8, offset: 2 }}>
            <div className="docs-example">
              <BasicExample />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
