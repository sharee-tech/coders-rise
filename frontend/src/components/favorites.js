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

console.log(data);
// const colleges = JSON.parse(data);

console.log(data[0]["school.name"]);

function Button({ children, onClick }) {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      {" "}
      {children}
    </button>
  );
}

function Favorite(college) {
  return (
    <li className="list-group-item">
      <h3>{college["school.name"]}</h3>
      <Button onClick={() => alert("compare")}>Compare</Button>
    </li>
  );
}

export default function FavoritesList() {
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  return (
    <ul className="list-group">
      {data.map((college) => (
        <Favorite key={college["school.name"]} college={college} />
      ))}
    </ul>
  );
}
