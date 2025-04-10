import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function View() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetching products failed:", error);
    }
  };

  const deletePro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
       toast.info("Product Deleted");
    } catch (error) {
      console.error("Deleting product failed:", error);
    }
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const title = product.title || "";
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <Container className="py-5">
      <h2 className="text-center fw-bold mb-5 text-primary" style={{ color: 'var(--primary)' }}>
        Our Products
      </h2>

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
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </Col>
      </Row>

      <Row className="g-4">
        {currentProducts.map((product) => (
          <Col md={6} lg={4} key={product.id}>
            <Card className="card-custom h-100 fade-in position-relative">

              <Button
                variant="danger"
                size="sm"
                className="position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center rounded-circle"
                onClick={() => deletePro(product.id)}
                style={{ width: '32px', height: '32px', padding: 0, zIndex: 2 }}
              >
                ×
              </Button>

              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                className="p-3 hover-scale"
                style={{
                  height: '220px',
                  objectFit: 'contain',
                  zIndex: 1,
                  position: 'relative',
                  transition: 'transform 0.3s ease',
                }}
              />

              <Card.Body className="p-4">
                <Badge className="badge-custom mb-2">{product.category}</Badge>
                <Card.Title className="fw-bold fs-5">{product.title}</Card.Title>
                <Card.Text className="text-muted small mb-3">
                  {product.description?.length > 80
                    ? `${product.description.substring(0, 80)}...`
                    : product.description || 'No description available'}
                </Card.Text>

                <Card.Text className="fw-bold fs-5 text-primary mb-4">
                  ₹{product.price}
                </Card.Text>
                <div className="d-flex gap-3">
                  <Link to={`/update/${product.id}`} className="flex-grow-1">
                    <Button variant="custom" className="w-100 transition-all">
                      Update
                    </Button>
                  </Link>
                  <Link to={`/product/${product.id}`} className="flex-grow-1">
                    <Button variant="custom" className="w-100 transition-all">
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
    <ToastContainer position="top-center" autoClose={2000}  theme="dark" />
    </Container>

  );
}

export default View;
