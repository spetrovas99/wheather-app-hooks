import React, {useState } from 'react';
import Search from "./Search";
import InfoWheather from "./InfoWheather";
import axios from "axios";

function Body (){
  const [list,setList] = useState([]);
  const [info,setInfo] = useState([]);
  const [elem,setElem] = useState({});


  const urlMB ="https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const finalMB = ".json?access_token=";
  const tokenMB = "pk.eyJ1Ijoic3BldHJvdmFzIiwiYSI6ImNrMWFvMGw0bzI3aWYzbnBmaGo1a3h5cnIifQ.zkSbIDBg96twgA9TKN9rsw";
  const urlDS ="https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/";
  const tokenDS= "f2dcc8818f7f771dd34cdb891a25b30e/";
  const finalDS ="?units=si"; 
  
  const searchBarHandler = ()=>{
   const input = document.getElementById("searchbar").value;
    if(input){
        axios.get(urlMB + input + finalMB + tokenMB).then(response =>{
          setList(response.data.features);
        });
      }
  }
  const selectHandler =(e)=>{
    console.log(e);
    axios.get(urlDS + tokenDS + e.center[1] + "," + e.center[0] + finalDS).then(response=>{
      setInfo(response.data.currently );
      setElem(e);
    }) 
  }
  return (
    <div className="Body">
      <Search searchBarHandler ={searchBarHandler} list = {list} selectHandler = {selectHandler}></Search>
      <InfoWheather info = {info} elem = {elem} ></InfoWheather>
    </div> 
 );
          

}
export default Body;