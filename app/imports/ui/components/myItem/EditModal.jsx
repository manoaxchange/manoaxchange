import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { AutoForm, ErrorsField, HiddenField, LongTextField, NumField, SelectField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Items } from '../../../api/items/Items';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';
import ImageUpload from '../ImageUpload';
import apifunctions from '../../services/apifunctions';
import LoadingSpinner from '../LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Items.schema);

const EditModal = ({ show, handleClose, item }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const handleImagePreview = (val) => setImagePreview(val);

  const [loading, setLoading] = useState(false);
  const handleShowLoading = () => setLoading(true);
  const handleNoLoading = () => setLoading(false);

  const submit = async (data) => {
    handleShowLoading();
    const { name, description, price } = data;
    let image = item.image;
    if (imagePreview !== null) {
      image = await apifunctions.postImage(imagePreview);
    }
    Items.collection.update(item._id, { $set: { name, image, description, price } }, (error) => {
      if (error) {
        handleNoLoading();
        return swal('Error', error.message, 'error');
      }
      handleNoLoading();
      setImagePreview(null);
      return swal('Success', 'Item updated successfully', 'success');
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {console.log('image preview', imagePreview)}
      <AutoForm schema={bridge} onSubmit={data => submit(data)} model={item}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField id={COMPONENT_IDS.EDIT_ITEM_FORM_NAME} name="name" />
          <NumField name="price" decimal />
          <LongTextField name="description" />
          <ImageUpload handleImagePreview={handleImagePreview} />
          <SelectField name="category" />
          <HiddenField name="image" value={imagePreview ? 'contains image' : null} />
          <ErrorsField />
        </Modal.Body>
        <Modal.Footer>
          {loading
            ? <Button variant="dark"><LoadingSpinner /></Button>
            : <Button variant="dark" id={COMPONENT_IDS.EDIT_ITEM_FORM_SUBMIT} type="submit">Save</Button>}
          <Button variant="outline-dark" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </AutoForm>
    </Modal>
  );
};

EditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    image: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default EditModal;
