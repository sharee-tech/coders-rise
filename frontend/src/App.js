import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";

const data = [
  {
    "latest.school.city": "Normal",
    "latest.school.state": "AL",
    "latest.student.size": 5098,
    "latest.cost.tuition.in_state": 10024,
    "latest.cost.tuition.out_of_state": 18634,
    "latest.school.degrees_awarded.highest": 4,
    "school.name": "Alabama A & M University",
  },
  {
    "latest.school.city": "Birmingham",
    "latest.school.state": "AL",
    "latest.student.size": 13284,
    "latest.cost.tuition.in_state": 8568,
    "latest.cost.tuition.out_of_state": 20400,
    "latest.school.degrees_awarded.highest": 4,
    "school.name": "University of Alabama at Birmingham",
  },
  {
    "latest.school.city": "Montgomery",
    "latest.school.state": "AL",
    "latest.student.size": 251,
    "latest.cost.tuition.in_state": null,
    "latest.cost.tuition.out_of_state": null,
    "latest.school.degrees_awarded.highest": 4,
    "school.name": "Amridge University",
  },
];

function Button({ children, onClick }) {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      {" "}
      {children}
    </button>
  );
}

export default function App() {
  const [colleges, setColleges] = useState(data);
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <FavoritesList colleges={colleges} />
          </div>
          <div className="col-sm-4">Profile</div>
        </div>
      </div>
    </div>
  );
}

function FavoritesList({ colleges }) {
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  return (
    <ul className="list-group">
      {colleges.map((college) => (
        <Favorite key={college["school.name"]} college={college} />
      ))}
    </ul>
  );
}

function Favorite({ college }) {
  return (
    <li className="list-group-item">
      <h3>{college["school.name"]}</h3>
      <Button onClick={() => alert("compare")}>Compare</Button>
    </li>
  );
}
