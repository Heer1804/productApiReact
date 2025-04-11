import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Update() {
  const [category] = useState(["Men", "Female", "Jewellry", "Electronics"]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:4000/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const getInput = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(product),
      });
      if (res.ok) {
        toast.info("Product Added");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      toast.error("Failed to update product");
      console.log("Error updating product:", err);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '700px' }}>
      <div className="card-custom p-4">
        <h3 className="text-center fw-bold mb-4" style={{ color: 'var(--primary)' }}>
          Update Product
        </h3>
        <Form onSubmit={submitProduct}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Product Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={product.title || ''}
                  placeholder="Enter product title"
                  onChange={getInput}
                  className="form-control-custom"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={product.price || ''}
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
                  value={product.category || ''}
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
                  value={product.image || ''}
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
                  value={product.description || ''}
                  placeholder="Enter product description"
                  onChange={getInput}
                  className="form-control-custom"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <Button type="submit" className="btn-custom transition-all">
              Update Product
            </Button>
          </div>
        </Form>
        <ToastContainer position="top-center" autoClose={2000}  theme="dark" />
      </div>
    </Container>
  );
}

export default Update;