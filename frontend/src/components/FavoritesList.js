import { useState } from "react";
import data from "../data.json";
import Button from "./Button";

export default function FavoritesList() {
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [colleges, setColleges] = useState(data);
  const [compareCollege, setCompareCollege] = useState([]);

  return (
    <ul className="list-group">
      {colleges.map((college) => (
        <Favorite
          key={college["school.name"]}
          college={college}
          compare={compareCollege}
          onCompare={setCompareCollege}
        />
      ))}
    </ul>
  );
}

function Favorite({ college, compare, onCompare }) {
  function handleConfirm(college) {
    // check to see if college is in the "compare" array.
    // if it is, remove it, if it is not, add it.
    if (compare.includes(college.id)) {
      console.log(compare);
      onCompare(compare.filter((a) => a.id === college.id));
    } else {
      console.log(compare);
      onCompare((compare) => [...compare, college.id]);
    }
  }

  return (
    <li className="list-group-item">
      <h3 className={compare.includes(college.id) ? "mark" : ""}>
        {college["school.name"]}
      </h3>
      <Button onClick={() => handleConfirm(college)}>Compare</Button>
      <p>{compare}</p>
    </li>
  );
}
