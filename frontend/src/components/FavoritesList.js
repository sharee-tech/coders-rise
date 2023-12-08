import { useState } from "react";
import data from "../data.json";
import Button from "./Button";

export default function FavoritesList() {
  const [selectedFavorites, setSelectedFavorites] = useState([]);
  const [collegesData, setCollegesData] = useState(data);
  const [toCompare, setToCompare] = useState([]);

  return (
    <>
      <ul className="list-group">
        {collegesData.map((college) => (
          <Favorite
            key={college["school.name"]}
            college={college}
            selectedFavorites={selectedFavorites}
            setSelectedFavorites={setSelectedFavorites}
            toCompare={toCompare}
            setToCompare={setToCompare}
          />
        ))}
      </ul>
      <div class="row">
        {toCompare.map((college) => (
          <CollegeCard details={college} />
        ))}
      </div>
    </>
  );
}

function CollegeCard({ details }) {
  return (
    <div class="col-sm-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{details["school.name"]}</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a
            href={details["school.school_url"]}
            target="_blank"
            class="btn btn-primary"
          >
            Visit
          </a>
        </div>
      </div>
    </div>
  );
}

function Favorite({
  college,
  selectedFavorites,
  setSelectedFavorites,
  toCompare,
  setToCompare,
}) {
  const [selected, setSelected] = useState(false);
  function handleConfirm() {
    setSelected(!selected);
    // Existing - Remove
    if (selectedFavorites.includes(college.id)) {
      setSelectedFavorites(
        selectedFavorites.filter((selected) => selected !== college.id)
      );
      setToCompare(toCompare.filter((selected) => selected !== college));
    } else {
      // Doesn't Exist - Add
      if (selectedFavorites.length < 3) {
        setSelectedFavorites((selectedFavorites) => [
          ...selectedFavorites,
          college.id,
        ]);
        setToCompare([...toCompare, college]);
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
