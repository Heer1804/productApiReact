import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function AddProduct() {
  const [category] = useState(["Men", "Female", "Jewellry", "Electronics"]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  const getInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    try {
      const addProduct = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify(product)
      });
      if (addProduct.ok) {
        toast.info("Product Added");
        setTimeout(() => navigate("/"), 2000);
      }      
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '720px' }}>
      <div className="card-custom p-5 fade-in">
        <h2 className="text-center fw-bold mb-5 text-primary">Add New Product</h2>
        <Form onSubmit={submitProduct}>
          <Row className="g-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter product title"
                  onChange={getInput}
                  className="form-control-custom"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  onChange={getInput}
                  className="form-control-custom"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Category</Form.Label>
                <Form.Select
                  name="category"
                  onChange={getInput}
                  className="form-select-custom"
                >
                  <option value="">Select Category</option>
                  {category.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  placeholder="Enter image URL"
                  onChange={getInput}
                  className="form-control-custom"
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label className="fw-medium">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  placeholder="Enter product description"
                  onChange={getInput}
                  className="form-control-custom"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="text-center mt-5">
            <Button type="submit" className="btn-custom transition-all">
              Add Product
            </Button>
          </div>
        </Form>
        <ToastContainer position="top-center" autoClose={2000}  theme="dark" />
      </div>
    </Container>
  );
}

export default AddProduct;
