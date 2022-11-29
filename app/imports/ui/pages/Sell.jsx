import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { CATEGORIES_ARRAY, Items } from '../../api/items/Items';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  image: String,
  price: Number,
  description: String,
  name: String,
  category: {
    type: String,
    allowedValues: CATEGORIES_ARRAY,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const Sell = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { image, price, description, name, category } = data;
    const owner = Meteor.user().username;
    Items.collection.insert(
      { image, price, description, name, owner, category },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item is now in the shop!', 'success');
          formRef.reset();
        }
      },
    );
  };

  let fRef = null;
  return (
    <Container id={PAGE_IDS.SELL} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Sell Item</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.SELL_FORM_NAME} name="name" />
                <NumField id={COMPONENT_IDS.SELL_FORM_PRICE} name="price" decimal />
                <LongTextField id={COMPONENT_IDS.SELL_FORM_DESCRIPTION} name="description" />
                <TextField id={COMPONENT_IDS.SELL_FORM_IMAGE} name="image" />
                <SelectField id={COMPONENT_IDS.SELL_FORM_CATEGORY} name="category" />
                <SubmitField id={COMPONENT_IDS.SELL_FORM_SUBMIT} value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default Sell;
