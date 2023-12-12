import { useState } from "react"
import data from "../data.json"
import React from "react"
import Button from "./Button"
import states from "../routes/states"
import { json } from "react-router-dom"



export default function Form(){

  

  const[degreeType, setDegreeType] = useState()
  const[stateName, setStateName] = useState("")
  const[maxTuition, setMaxTuition] = useState()
  const[schoolSize, setSchoolSize] = useState(0)
  let results=[]
  let schoolSizeInt= parseInt(schoolSize)


  // Using this function to update the state of degree
// whenever a new option is selected from the dropdown

  function handleConfirm(deg, loc, tui, size){
    console.log("here")
    data.map((datapoint, index) =>
    
     ({datapoint}.datapoint["latest.cost.tuition.out_of_state"] >= {maxTuition}) ?
    console.log({datapoint}.datapoint["school.name"]) : console.log("nope")
    


    )
    }

  
    console.log({data}.data[9]["latest.student.size"])
 
  console.log(degreeType)
  console.log(stateName)
  console.log(maxTuition)
  console.log(schoolSize)

  return(

<div className="App">
  <form>

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

    <Button onClick={() => handleConfirm(degreeType, stateName, maxTuition, schoolSize)}>Submit</Button>
    </form> 
</div>

    

  
  ) 

  
}