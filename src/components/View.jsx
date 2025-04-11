import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function View() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/products');
      const data = await response.json();
      console.log('Fetched products:', data);
      setProducts(data);
    } catch (error) {
      console.error('Fetching products failed:', error);
    }
  };

  const deletePro = async (id) => {
    try {
      // Fetch all reviews for the product
      const reviewsResponse = await fetch(`http://localhost:4000/reviews?productId=${id}`);
      const reviews = await reviewsResponse.json();

      // Delete each review associated with the product
      if (reviews.length > 0) {
        for (const review of reviews) {
          await fetch(`http://localhost:4000/reviews/${review.id}`, {
            method: 'DELETE',
          });
        }
      }

      // Delete the product
      const productResponse = await fetch(`http://localhost:4000/products/${id}`, {
        method: 'DELETE',
      });

      if (productResponse.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success('Product and its reviews deleted successfully');
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Deleting product or reviews failed:', error);
      toast.error('Failed to delete product or its reviews');
    }
  };

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const title = product.title || '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    console.log(`Product: ${title}, Search: ${matchesSearch}, Category: ${matchesCategory}`);
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  console.log('Current products:', currentProducts);

  return (
    <Container className="py-5">
      <h2 className="text-center fw-bold mb-5 text-primary">Our Products</h2>

      <Row className="mb-5 g-3">
        <Col md={8}>
          <input
            type="text"
            placeholder="Search products..."
            className="form-control-custom w-100"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </Col>
        <Col md={4}>
          <select
            className="form-select-custom w-100"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      <Row className="g-4">
        {currentProducts.map((product) => (
          <Col md={6} lg={4} key={product.id} className="d-flex">
            <Card className="card-custom h-100 w-100">
              <div className="card-image-wrapper">
                <Card.Img
                  src={product.image}
                  alt={product.title}
                  className="card-image"
                />
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center rounded-circle"
                  onClick={() => deletePro(product.id)}
                  style={{ width: '32px', height: '32px', padding: 0, zIndex: 2 }}
                >
                  ×
                </Button>
              </div>
              <Card.Body className="d-flex flex-column">
                <Badge className="badge-custom mb-2">{product.category}</Badge>
                <Card.Title className="card-title">{product.title}</Card.Title>
                <Card.Text className="card-description flex-grow-1">
                  {product.description?.length > 60
                    ? `${product.description.substring(0, 60)}...`
                    : product.description || 'No description available'}
                </Card.Text>
                <Card.Text className="card-price">
                  ₹{product.price}
                </Card.Text>
                <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
                  <Link to={`/update/${product.id}`}>
                    <Button variant="custom" className="btn-custom">
                      Update
                    </Button>
                  </Link>
                  <Link to={`/product/${product.id}`}>
                    <Button variant="custom" className="btn-custom">
                      See More
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <nav>
            <ul className="pagination pagination-custom">
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </Container>
  );
}

export default View;