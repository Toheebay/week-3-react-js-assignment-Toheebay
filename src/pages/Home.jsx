// src/pages/Home.jsx
import React from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Card from "../components/Card";

const Home = () => {
  return (
    <Layout>
      <Card title="Welcome">
        <p>This is a reusable card component.</p>
        <div className="mt-4 space-x-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </Card>
    </Layout>
  );
};

export default Home;
