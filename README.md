
  <h1>Product API - React Application</h1>
        
  <div class="section">
            <h2>Overview</h2>
            <p>
                This is a React-based web application designed to manage products via a RESTful API. It allows users to view, add, update, and delete products, as well as leave reviews for individual products. The app uses React Router for navigation, React Bootstrap for UI components, and custom CSS for styling.
            </p>
            <p>
                The application communicates with a local JSON server running on <code>http://localhost:3000</code> to perform CRUD (Create, Read, Update, Delete) operations on product and review data.
            </p>
        </div>

  <div class="section">
            <h2>Features</h2>
            <ul>
                <li><strong>Product Listing:</strong> View a paginated list of products with search and category filters.</li>
                <li><strong>Add Products:</strong> Add new products with details like title, price, category, image URL, and description.</li>
                <li><strong>Update Products:</strong> Edit existing product details.</li>
                <li><strong>Delete Products:</strong> Remove products from the list.</li>
                <li><strong>Single Product View:</strong> See detailed product information and submit or delete reviews with star ratings.</li>
                <li><strong>Responsive Design:</strong> Styled with React Bootstrap and custom CSS for a modern, mobile-friendly interface.</li>
                <li><strong>Notifications:</strong> Toast notifications for actions like adding, updating, or deleting products.</li>
            </ul>
        </div>

  <div class="section">
            <h2>Prerequisites</h2>
            <ul>
                <li>Node.js (v14.x or higher)</li>
                <li>npm (v6.x or higher) or Yarn</li>
                <li>A running JSON server (e.g., <code>json-server</code>) on <code>http://localhost:3000</code></li>
            </ul>
        </div>

  <div class="section">
            <h2>Installation</h2>
            <h3>Step 1: Clone the Repository</h3>
            <pre><code>git clone &lt;repository-url&gt;
cd product-api-app</code></pre>

  <h3>Step 2: Install Dependencies</h3>
            <pre><code>npm install</code></pre>
            <p>Installs all required packages, including React, React Router, React Bootstrap, and react-toastify.</p>

  <h3>Step 3: Set Up JSON Server</h3>
            <p>Install <code>json-server</code> globally if not already installed:</p>
            <pre><code>npm install -g json-server</code></pre>
            <p>Create a <code>db.json</code> file with the following structure:</p>
            <pre><code>{
  "products": [],
  "reviews": []
}</code></pre>
            <p>Start the JSON server:</p>
            <pre><code>json-server --watch db.json --port 3000</code></pre>

<h3>Step 4: Run the Application</h3>
            <pre><code>npm start</code></pre>
            <p>The app will run on <code>http://localhost:3000</code> in development mode.</p>
        </div>

<div class="section">
            <h2>Usage</h2>
            <ul>
                <li><strong>Home/View Products:</strong> Navigate to <code>/</code> to see the product list. Use the search bar and category dropdown to filter products.</li>
                <li><strong>Add Product:</strong> Go to <code>/add</code> to add a new product.</li>
                <li><strong>Update Product:</strong> Click "Update" on a product card to edit it at <code>/update/:id</code>.</li>
                <li><strong>View Product Details:</strong> Click "See More" to visit <code>/product/:id</code> for details and reviews.</li>
                <li><strong>Delete Product:</strong> Click the "×" button on a product card to remove it.</li>
            </ul>
        </div>

 <div class="section">
            <h2>File Structure</h2>
            <pre><code>product-api-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── View.jsx
│   │   ├── AddProduct.jsx
│   │   ├── Update.jsx
│   │   └── SingleProduct.jsx
│   ├── App.jsx
│   └── index.css
├── package.json
└── README.html</code></pre>
            <ul>
                <li><code>Header.jsx:</code> Navigation bar component.</li>
                <li><code>View.jsx:</code> Product listing with search, filter, and pagination.</li>
                <li><code>AddProduct.jsx:</code> Form to add new products.</li>
                <li><code>Update.jsx:</code> Form to edit existing products.</li>
                <li><code>SingleProduct.jsx:</code> Detailed view with reviews.</li>
                <li><code>App.jsx:</code> Main app component with routing.</li>
                <li><code>index.css:</code> Custom styles for the application.</li>
            </ul>
        </div>

<div class="section">
            <h2>Dependencies</h2>
            <ul>
                <li><code>react</code>, <code>react-dom</code>: Core React libraries.</li>
                <li><code>react-router-dom</code>: For client-side routing.</li>
                <li><code>react-bootstrap</code>: UI components.</li>
                <li><code>bootstrap</code>: CSS framework (imported in <code>App.jsx</code>).</li>
                <li><code>react-toastify</code>: Toast notifications.</li>
                <li><code>react-icons</code>: Icons for star ratings.</li>
            </ul>
        </div>

 <div class="section">
            <h2>Notes</h2>
            <ul>
                <li>Ensure the JSON server is running before starting the React app.</li>
                <li>The app assumes product data includes <code>id</code>, <code>title</code>, <code>price</code>, <code>category</code>, <code>image</code>, and <code>description</code>.</li>
                <li>Reviews are stored with <code>productId</code>, <code>reviewer</code>, <code>text</code>, and <code>rating</code>.</li>
                <li>Custom CSS variables (e.g., <code>--primary</code>) are defined in <code>index.css</code>.</li>
            </ul>
        </div>

<div class="section">
            <h2>Contributing</h2>
            <p>
                Feel free to fork this repository, submit pull requests, or report issues. Contributions to improve functionality or styling are welcome!
            </p>
        </div>

  
