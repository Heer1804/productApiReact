import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Badge, Spinner, Form, Button } from 'react-bootstrap';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log('Product ID from URL params:', id);
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:4000/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error('Error fetching product:', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const url = `http://localhost:4000/reviews?productId=${encodeURIComponent(id)}`;
      const res = await fetch(url);
      const data = await res.json();
      setReviews(data.reverse());
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      console.error('Product ID is missing!');
      return;
    }
    if (!reviewText.trim() || !reviewer.trim() || rating === 0) return;

    const newReview = {
      productId: id,
      reviewer,
      text: reviewText,
      rating,
    };

    try {
      const res = await fetch('http://localhost:4000/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });
      const savedReview = await res.json();
      setReviews([savedReview, ...reviews]);
      setReviewText('');
      setReviewer('');
      setRating(0);
    } catch (err) {
      console.error('Error saving review:', err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await fetch(`http://localhost:4000/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      setReviews(reviews.filter((r) => r.id !== reviewId));
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 0;

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="card-custom p-5 mb-5">
        <Row className="g-5 align-items-center">
          <Col md={5}>
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded-3"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          </Col>
          <Col md={7}>
            <h1 className="fw-bold mb-3">{product.title}</h1>
            <Badge bg="secondary" className="mb-3">{product.category}</Badge>
            <p className="text-muted mb-4">{product.description}</p>
            <h3 className="fw-bold text-primary fs-4">₹{product.price}</h3>
          </Col>
        </Row>
      </div>

      <div className="card-custom p-5 mb-5">
        <h4 className="fw-bold mb-4 text-primary">Leave a Review</h4>
        <Form onSubmit={handleReviewSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <div className="d-flex gap-2">
              {[...Array(5)].map((_, i) => {
                const currentRating = i + 1;
                return (
                  <span
                    key={i}
                    onClick={() => setRating(currentRating)}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: 'pointer', fontSize: '28px' }}
                  >
                    {currentRating <= (hover || rating) ? (
                      <IoIosStar color="gold" />
                    ) : (
                      <IoIosStarOutline color="#ccc" />
                    )}
                  </span>
                );
              })}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">Submit</Button>
        </Form>
      </div>

      {reviews.length > 0 && (
        <div className="card-custom p-5">
          <h4 className="fw-bold mb-3 text-primary">Customer Reviews</h4>
          <p className="text-muted mb-3">
            {totalReviews} review{totalReviews !== 1 ? 's' : ''} | Average Rating: <strong>{averageRating}/5</strong>
          </p>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-bottom py-3 d-flex justify-content-between align-items-start"
            >
              <div>
                <strong className="d-block mb-1">{review.reviewer}</strong>
                <div className="d-flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) =>
                    i < review.rating ? (
                      <IoIosStar key={i} color="gold" size={20} />
                    ) : (
                      <IoIosStarOutline key={i} color="#ccc" size={20} />
                    )
                  )}
                </div>
                <p className="text-muted mb-0">{review.text}</p>
              </div>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeleteReview(review.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

export default SingleProduct;