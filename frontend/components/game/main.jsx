import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Field from './field';

export default class Main extends Component {
  render(){
    return(
      <Grid>
        <Row>
          <Col xs={9} md={9}>
            <Field/>
          </Col>
          <Col xs={3} md={3}>
            <h1>Aca estoy!</h1>
          </Col>
        </Row>
      </Grid>
    )
  }
}