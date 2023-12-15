import { useState } from "react"
import data from "../data.json"
import React from "react"
import Button from "./Button"
import states from "../routes/states"
import { json } from "react-router-dom"
import FetchExample from "./Fetch"
import { useEffect } from "react"
import axios from "axios"



export default function Form(){

  

  const[degreeType, setDegreeType] = useState()
  const[stateName, setStateName] = useState("")
  const[maxTuition, setMaxTuition] = useState(0)
  const[schoolSize, setSchoolSize] = useState(0)
  const [results, setResults] = useState([]);


 const baseUrl= `http://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${process.env.REACT_APP_API_KEY}`;
 const fields= "&fields=school.name,latest.cost.tuition.in_state,school.state,latest.student.size"

 const apiCall = baseUrl+fields
window.addEventListener("submit", function() {
  axios.get(apiCall).then((res) => {
    setResults(res.data["results"]);
    //setCount(res.data["metadata"].total);
  });
})

//var filteredResults= results.filter((element=> element.latest.cost.tuition.out_of_state <= maxTuition))




  return(

    

<div className="App">
  <form onSubmit={(e) => {
    e.preventDefault();

      
    
  }}>

    

    <div className="form-group" > 

    {/* Creating our dropdown and passing it the handleDegreeChange 
      so that every time a new choice is selected, our degree state 
      updates and renders name of the degree.
    */}
    <label value= "inputDegree">Select a degree:</label>
      <select className="form-control" onChange={(e) => setDegreeType(e.target.value)}> 
        {/* Creating the default / starting option for our 
          dropdown.
         */}
         value={degreeType}
        <option value= "degree level"> -- Select a degree level -- </option>
        <option value = "1">Non-degree granting </option>
        <option value="2">Associate Degree </option>
        <option value="3">Bachelor's Degree </option>
        <option value="4">Graduate Degree </option>       
      </select>
    </div>

    <div className="form-group"> 
    <label value= "inputState">Select a state:</label>
      <select className="form-control" onChange={(e) => setStateName(e.target.value)}>
        value= {stateName}
        {states.map((state, index) => (
         <option value={state} key={index} >
            {state}
          </option>
          ))}
      </select>
    </div>

    <div className="form-group">
    <label value = {maxTuition}>Tuition maximum:</label>
    <input 
    type="text" 
    className="form-control" 
    id="" 
    placeholder="Enter maximum tuition"
    onChange={(e) => setMaxTuition(e.target.value)}></input>
    </div>
   

   <div className="form-group" > 

      <label value= {schoolSize}>Select a school size:</label>
      <select className="form-control" onChange={(e) => setSchoolSize(e.target.value)}> 
        <option value= "school size"> -- Select a school size -- </option>
        <option value = "2000">small: under 2,000 </option>
        <option value="medium">medium: 2,000-15,000</option>
        <option value="large">large: 15,000+ </option>      
      </select>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
    </form> 
    <br></br>


<div>
  
            {results.map((result) =>  {
                return (
                <div key={result.id}>  
                <ul>
                    <li>School name: {result["school.name"]}</li>
                    <li>School state: {result["school.state"]}</li>  
                    <li>School tuition: {result["latest.cost.tuition.in_state"]}</li>
                    <li>School size: {result["latest.student.size"]}</li>
                    <br></br>           
                  </ul> 
                  
                </div>
                )}
           ) }
       </div>
    </div>
  
  

  
  ) 
    
 

 


  
}