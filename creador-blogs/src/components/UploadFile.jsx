import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Alert } from 'react-bootstrap';

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '', variant: '' });

  const submitForm = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://localhost:8000/validate_xml', formData)
    .then(res => {
      // console.log("DATA: ", res.data)
      switch (res.data.status) {
        case 200:  // Todo está bien
          setModalContent({
            title: 'Exito',
            body: res.data.message,
            variant: 'success'
          });
          break;
        case 400:  // Bad Request
          setModalContent({
            title: 'Error',
            body: res.data.message,
            variant: 'danger'
          });
          break;
        default:
          setModalContent({
            title: 'Error',
            body: 'Ha ocurrido un error desconocido.',
            variant: 'danger'
          });
      }
      setShowModal(true);
    })
    .catch(err => {
      setModalContent({
        title: 'Error',
        body: err.message,
        variant: 'danger'
      });
      setShowModal(true);
    });


  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="container mb-4">
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Upload File</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Choose File
              </label>
              <input
                type="file"
                id="file"
                name="file"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-xl">
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant={modalContent.variant}>
            {modalContent.body}
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UploadFile;
