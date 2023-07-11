import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function BlogGenerator() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
      <div className="text-center">
        <h1 className="display-4">BLOG-GENERATOR</h1>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </div>
  );
}

export default BlogGenerator;
