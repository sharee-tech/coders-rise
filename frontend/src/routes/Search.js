import Navbar from "../components/Navbar";
import Form from "../components/Form";

export default function Search() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <h1>Let's Start Your College Search!</h1>
        <div className="container">
          <Form />
        </div>
      </main>
    </div>
  );
}
