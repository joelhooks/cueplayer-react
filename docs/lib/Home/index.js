import React from 'react'
import {PrismCode} from 'react-prism'
import {Button, Container, Row, Col, Jumbotron} from 'reactstrap'
import {Link} from 'react-router'
import BasicExample from '../examples/import-basic'
import {managerAtom} from 'cueplayer-react/context/player-context'
import {useAtom} from 'jotai'

const importBasic = require('!!raw-loader!../examples/import-basic')

export default () => {
  return (
    <div>
      <Container fluid>
        <BasicExample />
      </Container>
    </div>
  )
}
