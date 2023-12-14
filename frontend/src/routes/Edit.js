import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import EditFavorite from "../components/EditFavorite";

export default function Edit() {
  const routeParams = useParams();
  console.log(routeParams);
  return (
    <div>
      <Navbar />
      <main className="container">
        <h1>Welcome to Edit {routeParams.id}</h1>
        <EditFavorite collegeId={routeParams.id} />
      </main>
    </div>
  );
}
