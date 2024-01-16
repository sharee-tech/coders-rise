import React, { useState, useEffect } from "react";

// import UserService from "../services/user.service";

function Home() {
  return (
    <main className="container">
      <div className="bg-light p-5 rounded">
        <h1>College Explorer Platform</h1>
        <p className="lead">Blurb about College Explorer Platform...</p>
        <a className="btn btn-lg btn-primary" href="/search" role="button">
          Find Colleges Now &raquo;
        </a>
      </div>
    </main>
  );
}

export default Home;
