import { useState, useEffect } from "react";
import axios from "axios";
import CollegeCard from "./CollegeCard";
import Favorite from "./Favorite";

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
              <th scope="col">Edit</th>
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
