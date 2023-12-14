import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function Favorite({
  college,
  selectedFavorites,
  setSelectedFavorites,
  toCompare,
  setToCompare,
}) {
  const [selected, setSelected] = useState(false);
  const [notes, setNotes] = useState("");
  const dataToPass = {
    name: college["school.name"],
    as: 0,
    customNotes: "This is the best",
  };

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
    <tr>
      <td>
        <Button
          onClick={() => handleConfirm()}
          css={
            selectedFavorites.includes(college.id)
              ? "btn-outline-danger"
              : "btn-outline-warning"
          }
        >
          {selectedFavorites.includes(college.id) ? "➖" : "➕"}
        </Button>
      </td>
      <td>
        <h3 className={selectedFavorites.includes(college.id) ? "" : ""}>
          {college["school.name"]}{" "}
        </h3>
      </td>

      <td>
        <span className="badge rounded-pill text-bg-secondary ml-4">
          Review
        </span>
      </td>
      <td>
        <div className="form">
          <p>notes</p>
          {/* <label for="floatingTextarea"></label> */}
        </div>
      </td>
      <td>
        <div className="form">
          <Link
            to={{ pathname: `/favorites/${college.id}`, state: dataToPass }}
            // className="btn btn-outline-warning"
            // state={{ college }}
            style={{ textDecoration: "none" }}
          >
            ✏️
          </Link>
        </div>
      </td>
    </tr>
  );
}
