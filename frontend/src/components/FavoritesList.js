import { useState } from "react";
import data from "../data.json";
import Button from "./Button";

export default function FavoritesList() {
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [colleges, setColleges] = useState(data);
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
