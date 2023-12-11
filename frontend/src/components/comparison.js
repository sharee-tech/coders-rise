import { useState, useEffect } from "react";
import data from "../data.json";
import FavoritesList from "./FavoritesList";

export default function Comparison({ selectedFavorites }) {
  const [showCollege, setShowCollege] = useState(false);
  // // useEffect(() => {
  // //   // LOGIC FOR MAKING REQUEST
  // //   console.log("COMPONENT MOUNTED");
  // //   return () => {
  // //     // LOGIC FOR STOP MAKING THE REQUEST
  // //     console.log("COMPONENT UNMOUNTED");
  // //   };
  // // }, []);

  // return (
  //   <div className="container">
  //     <div className="container">
  //       {data.map((college) => (
  //         <div className="col align-items-start">
  //           <div className="row">{college["school.name"]}</div>
  //           <div className="row">{college["school.state"]}</div>
  //           <div className="row">{college["latest.student.size"]}</div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
}
