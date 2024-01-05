import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return(
    <div>
      <Navbar />
      <h1>Please fill out the form to contact the development team</h1>
      <ContactForm />
    </div>
  );
}