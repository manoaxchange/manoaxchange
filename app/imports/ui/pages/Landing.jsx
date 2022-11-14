import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ItemsCarousel from '../components/ItemsCarousel';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <>
    <ItemsCarousel />
    <div className="py-3" style={{ height: 'fit-content' }}>
      <Container
        fluid
        className="d-flex flex-column align-items-center justify-content-center py-3"
        style={{ height: '600px' }}
      >
        <br />
        <h1 className="pb-3 text-center display-2">Welcome to ManoaXchange!</h1>
        <Row className="d-flex align-items-center justify-content-center">
          <Col xs={11} xl={9} className="d-flex align-items-center justify-content-center">
            <p className="w-100 py-3 px-3" style={{ wordSpacing: '2px', lineHeight: 1.8, letterSpacing: '0.4px' }}>
              Large masses of students quickly come and go in the dorms of UH Manoa. This leads to lots of
              campus specific items that are discarded by previous students. Our goal at ManoaXchange is to
              promote and incentivize buying and selling goods between the students of UH Manoa. This
              allows students to reuse and repurpose items that were used by other students, thereby reducing
              the amount of items that were going to be discarded.
            </p>
          </Col>
        </Row>
        <Button variant="dark" className="my-3" style={{ width: '180px' }} href="/shop">
          <div
            className="h3 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ fontWeight: 'lighter' }}
          >
            Shop Now
          </div>
        </Button>
        <br />
      </Container>
    </div>
  </>
);

export default Landing;
