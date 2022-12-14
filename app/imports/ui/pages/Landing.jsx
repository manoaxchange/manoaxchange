import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';

const show = {
  height: 'fit-content',
};

const hidden = {
  display: 'none',
};

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const currentUser = useTracker(() => Meteor.user(), []);

  useEffect(() => {
    document.title = 'manoaxchange - home';
  }, []);

  return (
    <>
      <section id={PAGE_IDS.LANDING} className="pb-3" style={{ height: 'fit-content' }}>
        <Container
          fluid
          className="d-flex flex-column align-items-center justify-content-center pb-3"
          style={{ minHeight: '600px' }}
        >
          <br />
          <h1 className="pb-3 text-center display-2">Welcome to ManoaXchange!</h1>
          <Row className="d-flex align-items-center justify-content-center">
            <Col xs={11} xl={9} className="d-flex align-items-center justify-content-center">
              <p className="w-100 py-3 px-3" style={{ wordSpacing: '2px', lineHeight: 1.8, letterSpacing: '0.4px' }}>
                Large masses of <b>students quickly come and go</b> in the dorms of UH Manoa. This leads to lots of
                campus specific items that are discarded by previous students.&nbsp;
                <b>Our goal at ManoaXchange is to
                  promote and incentivize buying and selling goods between the students of UH Manoa
                </b>. This allows students to reuse and repurpose items that were used by other students, thereby reducing
                the amount of items that were going to be discarded.
              </p>
            </Col>
          </Row>
          <Button variant="dark" style={{ width: '180px', height: '55px' }} href="/shop">
            <div
              className="h3 w-100 h-100 d-flex align-items-center justify-content-center"
              style={{ fontWeight: 'lighter', margin: '0' }}
            >
              Shop Now
            </div>
          </Button>
        </Container>
      </section>
      <section
        className="py-3 ocean-background text-white"
        style={currentUser ? hidden : show}
      >
        <Container
          fluid
          className="d-flex flex-column align-items-center justify-content-center py-3"
          style={{ height: '600px' }}
        >
          <h1 className="text-center display-2">Don&apos;t Have an Account?</h1>
          <div className="w-100 px-3 text-center" style={{ wordSpacing: '2px', lineHeight: 1.8, letterSpacing: '0.4px' }}>
            Sign up with your UH email! Students, faculty, and alumni are all welcome.
          </div>
          <Button variant="light" className="mt-3 mb-2" style={{ width: '180px', height: '55px' }} href="/signup">
            <div
              className="h3 w-100 h-100 d-flex align-items-center justify-content-center"
              style={{ fontWeight: 'lighter' }}
            >
              Sign Up
            </div>
          </Button>
          <a
            href="/signin"
            className="w-100 px-3 text-center text-white"
            style={{ wordSpacing: '2px', lineHeight: 1.8, letterSpacing: '0.4px' }}
          >
            Returning user? Sign in here.
          </a>
        </Container>
      </section>
    </>
  );
};

export default Landing;
