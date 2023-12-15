import { useState } from "react"
import React from "react"
import states from "../routes/states"
import axios from "axios"



export default function Form(){

  

  const[degreeType, setDegreeType] = useState(0)
  const[stateName, setStateName] = useState("")
  const[maxTuition, setMaxTuition] = useState(0)
  const[schoolSize, setSchoolSize] = useState(0)
  const [results, setResults] = useState([]);


 const baseUrl= `http://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${process.env.REACT_APP_API_KEY}&per_page=100`;
 const fieldsDefault= `&fields=school.name,id,latest.cost.tuition.in_state,school.state,latest.student.size,school.city,school.degrees_awarded.highest`
 const stateParam = stateName ? `&school.state=${stateName}`: ""
 const tuitionParam = maxTuition
 ? `&latest.cost.tuition.in_state__range=1..${maxTuition}`
 : "";
 

 const apiCall = baseUrl+fieldsDefault
 console.log(apiCall)
window.addEventListener("submit", function() {
  axios.get(apiCall).then((res) => {
    setResults(res.data["results"]);
    //setCount(res.data["metadata"].total);
  });
})

var filteredResults= results.filter((results) => {return (results["latest.cost.tuition.in_state"] <= maxTuition) && 
(results["latest.student.size"] <= schoolSize) && (results["school.degrees_awarded.highest"] == degreeType) &&
(results["school.state"]== stateName)})
console.log(stateName)
console.log(degreeType)
console.log(filteredResults)
console.log(maxTuition)

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
    <label value= {degreeType}>Select a degree:</label>
      <select className="form-control" onChange={(e) => setDegreeType(e.target.value)}> 
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
        <option>Select a state</option>
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
  
            {filteredResults.map((result) =>  {
                return (
                <div key={result.id}>  
                <ul>
                    <li>School name: {result["school.name"]}</li>
                    <li>School state: {result["school.state"]}</li>  
                    <li>School tuition in-state: ${result["latest.cost.tuition.in_state"]}</li>
                    <li>School size: {result["latest.student.size"]}</li>
                    <li>School id: {result.id}</li>
                    <br></br>           
                  </ul> 
                  
                </div>
                )}
           ) }
       </div>
       
    </div> 

  
  ) 
    
 

 


  
}