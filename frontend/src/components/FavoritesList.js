import { useState } from "react";
import data from "../data.json";
import Button from "./Button";

export default function FavoritesList() {
  const [selectedFavorites, setSelectedFavorites] = useState([]);
  const [collegesData, setCollegesData] = useState(data);

  return (
    <ul className="list-group">
      {collegesData.map((college) => (
        <Favorite
          key={college["school.name"]}
          college={college}
          selectedFavorites={selectedFavorites}
          setSelectedFavorites={setSelectedFavorites}
        />
      ))}
    </ul>
  );
}

function Favorite({ college, selectedFavorites, setSelectedFavorites }) {
  const [selected, setSelected] = useState(false);
  function handleConfirm() {
    setSelected(!selected);
    if (selectedFavorites.includes(college.id)) {
      setSelectedFavorites(
        selectedFavorites.filter((selected) => selected !== college.id)
      );
    } else {
      if (selectedFavorites.length < 3) {
        setSelectedFavorites((selectedFavorites) => [
          ...selectedFavorites,
          college.id,
        ]);
      } else {
        alert("Maximum of 3 Colleges are already selected.");
      }
    }
  }

  return (
    <li className="list-group-item" key={college.id}>
      <h3 className={selectedFavorites.includes(college.id) ? "mark" : ""}>
        {college["school.name"]}
      </h3>
      <Button
        onClick={() => handleConfirm()}
        css={
          selectedFavorites.includes(college.id)
            ? "btn-secondary"
            : "btn-primary"
        }
      >
        {selectedFavorites.includes(college.id) ? "Remove" : "Compare"}
      </Button>
      <p>{selectedFavorites}</p>
    </li>
  );
}
