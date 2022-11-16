import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';


const Item = () => (
  <Container className="pb-4">
    <Row className="py-3">
      <Col>
        <h2> Item Name </h2>
      </Col>
    </Row>
    <Row>
      <Col>
        <Image src={"http://cdn.akc.org/content/article-body-image/samoyed_puppy_dog_pictures.jpg"} className="imagefix" />
      </Col>
      <Col>
        <Row>
          <Col> <Button variant="success"> Favorite </Button> </Col>
          <Col> <Button variant="danger"> Report </Button> </Col>
        </Row>
        <Row className="py-3">
          <p> Mitochondria are membrane bound organelles present in almost all eukaryotic cells. Responsible for orchestrating cellular energy production, they are central to the maintenance of life and the gatekeepers of cell death. Thought to have originated from symbiotic ancestors, they carry a residual genome as mtDNA encoding 13 proteins essential for respiratory chain function. Mitochondria comprise an inner and outer membrane that separate and maintain the aqueous regions, the intermembrane space and the matrix. Mitochondria contribute to many processes central to cellular function and dysfunction including calcium signalling, cell growth and differentiation, cell cycle control and cell death. Mitochondrial shape and positioning in cells is crucial and is tightly regulated by processes of fission and fusion, biogenesis and autophagy, ensuring a relatively constant mitochondrial population. Mitochondrial dysfunction is implicated in metabolic and age related disorders, neurodegenerative diseases and ischemic injury in heart and brain.</p>
        </Row>
        <Row className="text-center">
          <h2> 10.99 USD </h2>
        </Row>
        <Row>
          <Button> Message Seller </Button>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default Item;
