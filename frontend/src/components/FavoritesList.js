import { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";

export default function FavoritesList() {
  const [selectedFavorites, setSelectedFavorites] = useState([]);
  const [collegesData, setCollegesData] = useState([]);
  const [toCompare, setToCompare] = useState([]);

  useEffect(() => {
    const savedCollegeIds = [100654, 100663, 100690, 100812];
    const endpoints = [];
    savedCollegeIds.map((id) =>
      endpoints.push(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=5A7Enb87q8JaBjpYKXjQgIu2hqXBu4mXhiQP4hv5&id=${id}&fields=school.name,school.city,school.state,latest.student.size,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state,school.degrees_awarded.highest,id,latest.academics.program.bachelors.communication,school.school_url`
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
      <ul className="list-group">
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
      </ul>
      <div className="row">
        {toCompare.map((college) => (
          <CollegeCard details={college} key={college.id} />
        ))}
      </div>
    </>
  );
}

function CollegeCard({ details }) {
  // const url = details["school.school_url"];
  // const updatedCollegeCard = {};

  // function checkHref(details) {
  //   if (!url.includes("http")) {
  //     alert("hit");
  //     updatedCollegeCard = {
  //       ...details,
  //       "school.school_url": `https://${url}`,
  //     };
  //     console.log(updatedCollegeCard);
  //   }
  // }

  return (
    <div className="col-sm-4 mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{details["school.name"]}</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a
            href={details["school.school_url"]}
            target="_blank"
            className="btn btn-primary"
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
      <Button
        className="mr-4"
        onClick={() => handleConfirm()}
        css={
          selectedFavorites.includes(college.id)
            ? "btn-secondary"
            : "btn-primary"
        }
      >
        {selectedFavorites.includes(college.id) ? "Remove" : "Compare"}
      </Button>

      <h3 className={selectedFavorites.includes(college.id) ? "" : ""}>
        {college["school.name"]}
      </h3>

      {/* <p>{selectedFavorites}</p> */}
    </li>
  );
}
