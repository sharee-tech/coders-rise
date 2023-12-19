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
  const [favorites, setFavorites] = useState([])
 


 const baseUrl= `http://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${process.env.REACT_APP_API_KEY}&per_page=100`;
 const fieldsDefault= `&fields=school.name,latest.cost.tuition.in_state,school.state,latest.student.size,school.city,school.degrees_awarded.highest,id,latest.academics.program.bachelors`
 const stateParam = !!stateName ? `&school.state=${stateName}`: ""
 const tuitionParam = maxTuition ? `&latest.cost.tuition.in_state__range=1..${maxTuition}`: "";
 const degreeParam= !degreeType == 0 ? `&school.degrees_awarded.highest=${degreeType}`: ""
 const schoolSizeParam= schoolSize ==1 ? '&latest.student.size__range=1..1999' : schoolSize == 2 ? '&latest.student.size__range=2000..15000' :
 schoolSize == 3 ? '&latest.student.size__range=15001..100000' : "" 
 
console.log(favorites)
console.log(results)

 

 const apiCall = baseUrl+fieldsDefault+tuitionParam+stateParam+degreeParam+schoolSizeParam
 
  return(   

<div className="App">
  <form onSubmit={(e) => {
    e.preventDefault();    

    axios.get(apiCall).then((res) => {
      setResults(res.data["results"]);      
    });
    
  }}>

    

    <div className="form-group" > 

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
        <option value = "1" >small: under 2,000 </option>
        <option value="2" >medium: 2,000-15,000</option>
        <option value="3">large: 15,000+ </option>      
      </select>
    </div>



    <button type="submit" className="btn btn-primary">Submit</button>
    </form> 
    <br></br>  

      <div>
          <table className="table">
          <thead>
            <tr>
          <th scope="col">Save to Favorites</th>
          <th scope="col">School Name</th>
          <th scope="col">School State</th>
          <th scope="col">School tuition in-state</th>
          <th scope="col">School Size</th>          
          </tr>
          </thead>

          {results.map((result) =>  {
            return (
    
              <tbody>  
                <tr key={result["school.id"]}>   
              <td className="checkbox">          
                <input onClick={(e)=> setFavorites(e.target.value)} className="form-check-input" type="checkbox" value={result["id"]} id="favoritesCheckbox"/>   
                </td>
              <td> {result["school.name"]}</td>  
              <td> {result["school.state"]}</td>
              <td>${result["latest.cost.tuition.in_state"]}</td>
              <td> {result["latest.student.size"]}</td>   
              </tr>   
              </tbody>
                )}
            )}
          </table>
      
       </div>   

    </div>
    
  )  


  
}