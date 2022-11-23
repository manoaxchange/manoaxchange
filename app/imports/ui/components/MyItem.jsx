import React, { useState } from 'react';
import { Button, Card, Col, Image } from 'react-bootstrap';
import { CurrencyDollar, PencilSquare, Trash3Fill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import DeleteModal from './myItem/DeleteModal';
import EditModal from './myItem/EditModal';
import SoldModal from './myItem/SoldModal';

const blackButton = {
  background: 'none',
  color: 'black',
  border: 'none',
  padding: 0,
};

const MyItem = ({ item }) => {
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
    <Col xs={12} lg={4} xl={3} className="d-flex my-3">
      <Card className="w-100" style={{ minHeight: '300px' }}>
        <Card.Header className="d-flex justify-content-end align-items-center gap-2">
          {item.sold
            ? ''
            : [<Button onClick={handleShowEdit} style={blackButton}><PencilSquare /></Button>,
              <Button onClick={handleShowSold} style={blackButton}><CurrencyDollar /></Button>]}
          <Button onClick={handleShowDelete} style={blackButton}><Trash3Fill /></Button>
        </Card.Header>
        <Card.Body className="d-flex align-items-center">
          <Image width="100%" height="100%" src={item.image} style={{ objectFit: 'contain' }} />
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between gap-2">
          <a className="text-decoration-none text-dark" href="/#"><b>{`${item.name}`}</b></a>
          {item.sold
            ? <b className="text-danger">SOLD</b>
            : <b>{`$${item.price}`}</b>}
        </Card.Footer>
      </Card>
      <DeleteModal handleClose={handleCloseDelete} show={showDelete} item={item} />
      <EditModal handleClose={handleCloseEdit} show={showEdit} item={item} />
      <SoldModal handleClose={handleCloseSold} show={showSold} />
    </Col>
  );
};

MyItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    sold: PropTypes.bool,
  }).isRequired,
};

export default MyItem;
