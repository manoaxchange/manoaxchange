import React, { useState } from 'react';
import { Card, Col, Container, Form, Row, Image, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { CATEGORIES_ARRAY, Items } from '../../api/items/Items';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import apifunctions from '../services/apifunctions.js';

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
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleShowLoading = () => setLoading(true);
  const handleNoLoading = () => setLoading(false);

  // Allows file to be read and used as src for image
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  // On submit, insert the data.
  const submit = async (data, formRef) => {
    handleShowLoading();
    const { price, description, name, category } = data;
    const image = await apifunctions.postImage(imagePreview);
    const owner = Meteor.user().username;
    Items.collection.insert(
      { image, price, description, name, owner, category },
      (error) => {
        if (error) {
          handleNoLoading();
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item is now in the shop!', 'success');
          formRef.reset();
          setImagePreview(null);
          handleNoLoading();
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
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => { submit(data, fRef); }}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.SELL_FORM_NAME} name="name" />
                <NumField id={COMPONENT_IDS.SELL_FORM_PRICE} name="price" decimal />
                <LongTextField id={COMPONENT_IDS.SELL_FORM_DESCRIPTION} name="description" />
                <SelectField id={COMPONENT_IDS.SELL_FORM_CATEGORY} name="category" />
                <div className="h-25 mb-3">
                  {imagePreview ? <Image className="w-100" src={imagePreview} /> : ''}
                  <Form.Control
                    type="file"
                    size="sm"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={(event) => { previewFile(event.target.files[0]); }}
                  />
                </div>
                <HiddenField name="image" value={imagePreview ? 'contains image' : null} />
                {loading
                  ? <Button><LoadingSpinner /></Button>
                  : <SubmitField id={COMPONENT_IDS.SELL_FORM_SUBMIT} value="Submit" />}
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
