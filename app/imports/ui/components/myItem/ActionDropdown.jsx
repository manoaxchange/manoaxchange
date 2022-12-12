import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import SoldModal from './SoldModal';

const ActionDropdown = ({ item }) => {
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const [showSold, setShowSold] = useState(false);
  const handleShowSold = () => setShowSold(true);
  const handleCloseSold = () => setShowSold(false);

  return (
    <>
      <DropdownButton title="Options">
        {item.sold
          ? ''
          : [<Dropdown.Item key="edit" onClick={handleShowEdit}>Edit</Dropdown.Item>, <Dropdown.Item key="sold" onClick={handleShowSold}>Mark as Sold</Dropdown.Item>]}
        <Dropdown.Item key="delete" onClick={handleShowDelete}>Delete</Dropdown.Item>
      </DropdownButton>
      <DeleteModal handleClose={handleCloseDelete} show={showDelete} item={item} />
      <EditModal handleClose={handleCloseEdit} show={showEdit} item={item} />
      <SoldModal handleClose={handleCloseSold} show={showSold} item={item} />
    </>
  );
};

ActionDropdown.propTypes = {
  item: PropTypes.shape({
    sold: PropTypes.bool,
  }).isRequired,
};

export default ActionDropdown;
