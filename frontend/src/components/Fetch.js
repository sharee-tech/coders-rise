import { useState } from "react";
import { useEffect } from "react";
import Form from "./form";

function FetchExample() {

//window.addEventListener("load", function() {
    const [results, setResults] = useState([]);
    useEffect(() => {
        fetch("http://api.data.gov/ed/collegescorecard/v1/schools.json?&api_key=${process.env.COLLEGE_SCORECARD_API_KEY}").
        then((response) => response.json()).
        then((data) => {
            console.log(data.results);
            setResults(data.results);

        })
   }, []);

   var filteredResults= results.filter((element=> element.school.degrees_awarded.highest == 2))

   return(
        <div>
            {filteredResults.map((result) =>  {
                return (
                <div key={result.id}>  
                  <ul>
                    <li>School name: {result.latest.school.name}</li>
                    <li>School city: {result.latest.school.city}</li>  
                    <li>School tuition: {result.latest.cost.tuition.out_of_state}</li>
                    <li>School size: {result.latest.student.size}</li>
                                      
                  </ul>  
                </div>
                )}
           ) }
        </div>
    );

    }


//)}

export default FetchExample;