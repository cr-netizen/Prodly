import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

import Loader from "../components/ui/Loader";

import { getProducts } from "../api/productApi";

function Home() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    async function fetchProducts() {

      try {

        const data =
          await getProducts();

        setProducts(data);

      } catch (err) {

        setError(
          "Failed to load products."
        );

      } finally {

        setLoading(false);

      }

    }

    fetchProducts();

  }, []);

  if (loading) {

    return <Loader />;

  }

  if (error) {

    return (
      <h2 className="text-center mt-10 text-red-500">
        {error}
      </h2>
    );

  }

  return (

    <>
      <Navbar />

      <Hero />

      <div className="grid md:grid-cols-2 gap-4 p-4">

        {products.map((product) => (

          <Card
            key={product.id}
            title={product.productName}
            description={product.description}
          />

        ))}

      </div>

      <Footer />

    </>

  );

}

export default Home;