import { useState, useEffect } from "react";
import data from "../data.json";
import FavoritesList from "./FavoritesList";

export default function Comparison() {
  const [showCollege, setShowCollege] = useState(false);

  useEffect(() => {
    // LOGIC FOR MAKING REQUEST
    console.log("COMPONENT MOUNTED");

    return () => {
      // LOGIC FOR STOP MAKING THE REQUEST
      console.log("COMPONENT UNMOUNTED");
    };
  }, []);

  return (
    <div className="container">
      <button
        onClick={() => {
          setShowCollege(!showCollege);
        }}
      >
        Compare College
      </button>
      {/* {showCollege && <FavoritesList />} */}
      {showCollege &&
        data.map((college) => (
          <div className="row align-items-start">
            <div className="col">{college["school.name"]}</div>
            {/* <div className="col">{college["school.state"]}</div>
            <div className="col">{college["latest.student.size"]}</div> */}
          </div>
        ))}

      {/* <input
        onChange={(event) => {
          setShowCollege(event.target.value);
        }}
      /> */}
      <h1>{showCollege}</h1>
      <div className="container">
        {data.map((college) => (
          <div className="row align-items-start">
            <div className="col">{college["school.name"]}</div>
            <div className="col">{college["school.state"]}</div>
            <div className="col">{college["latest.student.size"]}</div>
          </div>
        ))}
      </div>
      <div className="container">
        {data.map((college) => (
          <div className="col align-items-start">
            <div className="row">{college["school.name"]}</div>
            <div className="row">{college["school.state"]}</div>
            <div className="row">{college["latest.student.size"]}</div>
          </div>
        ))}
      </div>
      <Columns />
    </div>
  );
}

function Columns() {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col">One of three columns</div>
        <div className="col">One of three columns</div>
        <div className="col">One of three columns</div>
      </div>
      <div className="row align-items-center">
        <div className="col">One of three columns</div>
        <div className="col">One of three columns</div>
        <div className="col">One of three columns</div>
      </div>
      <div className="row align-items-end">
        <div className="col">One of three columns</div>
        <div className="col">One of three columns</div>
        <div className="col">One of three columns</div>
      </div>
    </div>
  );
}
