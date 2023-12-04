import FavoritesList from "../../src/components/FavoritesList";
import Navbar from "../components/Navbar";

export default function Favorites() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Favorites </h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <FavoritesList />
          </div>
          <div className="col-sm-4">Profile</div>
        </div>
      </div>
    </div>
  );
}
