import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <main className="p-8">
        <h1 className="text-3xl font-bold">
          About Page
        </h1>

        <p>This is placeholder content.</p>
      </main>

      <Footer />
    </>
  );
}

export default About;