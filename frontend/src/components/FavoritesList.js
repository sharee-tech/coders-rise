import { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";

export default function FavoritesList() {
  const [selectedFavorites, setSelectedFavorites] = useState([]);
  const [collegesData, setCollegesData] = useState([]);
  const [toCompare, setToCompare] = useState([]);

  useEffect(() => {
    const savedCollegeIds = [100654, 100663, 100690, 222178];
    const endpoints = [];
    savedCollegeIds.map((id) =>
      endpoints.push(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${process.env.REACT_APP_API_KEY}&id=${id}&fields=school.name,school.city,school.state,latest.student.size,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state,school.degrees_awarded.highest,id,school.school_url`
      )
    );

    const colleges = [];
    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(
        axios.spread((...responses) => {
          responses.forEach((response) => {
            colleges.push(response.data["results"][0]);
          });
          setCollegesData(colleges);
        })
      )
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Compare</th>
              <th scope="col">College</th>
              <th scope="col">Application Status</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {collegesData.map((college) => (
              <Favorite
                key={college.id}
                college={college}
                selectedFavorites={selectedFavorites}
                setSelectedFavorites={setSelectedFavorites}
                toCompare={toCompare}
                setToCompare={setToCompare}
              />
            ))}
          </tbody>
        </table>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {toCompare.map((college) => (
            <CollegeCard details={college} key={college.id} />
          ))}
        </div>
      </div>
    </>
  );
}

function CollegeCard({ details }) {
  return (
    <div className="col">
      <div className="card mt-5 h-100">
        <div className="card-body">
          <h5 className="card-title">{details["school.name"]}</h5>
          <h6>{`${details["school.degrees_awarded.highest"]} year | ${details["school.city"]}, ${details["school.state"]}`}</h6>
          <hr></hr>
          <p className="card-text">
            Student Body Size: <h6>{details["latest.student.size"]}</h6>
          </p>
          <p className="card-text">
            In-state Tuition:{" "}
            <h6>
              {details["latest.cost.tuition.in_state"] === null
                ? "Data not provided"
                : details["latest.cost.tuition.in_state"]}
            </h6>
          </p>
          <p className="card-text">
            Out-of-state Tuition:{" "}
            <h6>
              {details["latest.cost.tuition.out_of_state"] === null
                ? "Data not provided"
                : details["latest.cost.tuition.out_of_state"]}
            </h6>
          </p>
          <p className="card-text">
            Degree programs offered: <h6></h6>
          </p>
        </div>
        <div className="card-footer">
          <p className="card-text">More info...</p>
          <a
            href={
              details["school.school_url"].includes("http")
                ? details["school.school_url"]
                : `https://${details["school.school_url"]}`
            }
            target="_blank"
            className="btn btn-primary"
          >
            Visit
          </a>
          {/* <small className="text-muted">Last updated 3 mins ago</small> */}
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
  const [notes, setNotes] = useState("");

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
              ? "btn-danger"
              : "btn-primary"
          }
        >
          {selectedFavorites.includes(college.id) ? "Remove" : "Compare"}
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
          <textarea
            className="form-control"
            // placeholder="Leave a comment here"
            // id="floatingTextarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          >
            {notes}
          </textarea>
          {/* <label for="floatingTextarea"></label> */}
        </div>
      </td>
    </tr>
  );
}
