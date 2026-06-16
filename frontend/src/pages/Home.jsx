import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <div className="grid md:grid-cols-2 gap-4 p-4">
        <Card
          title="Card One"
          description="First card description"
        />

        <Card
          title="Card Two"
          description="Second card description"
        />
      </div>

      <Footer />
    </>
  );
}

export default Home;