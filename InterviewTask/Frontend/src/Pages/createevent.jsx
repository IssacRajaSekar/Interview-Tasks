import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./createevent.css"

export default function CreateEvent(){
    const [banner1,setBanner1] = useState([])
    const [banner,setBanner]= useState([])
    const [eventName,setEventName]=useState()
    const [location,setLocation] = useState()
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate]=useState()
    const navigate2 = useNavigate()
    const eventData ={banner,eventName,location,startDate,endDate}
        console.log(eventData);
    const addEvent = async (e) => {
        e.preventDefault();
        console.log(eventData);
        const newEmployee = await fetch('http://localhost:9000/jobPostingApp/createEvent',{
          method: 'POST',
          headers: {            
            'Content-type': 'application/JSON', 
          },
          body: JSON.stringify(eventData)
      }).then((response)=>{
        console.log(response);
        return response.json()
    }).then((resp)=>{
        if(resp.success==true){
            navigate2("/")
          }
    })
}
    async function UploadImage(e) {
       
      const formdata1=new FormData()
      formdata1.append('image',banner1[0])
      console.log(banner1[0],13)
      await fetch('http://localhost:9000/jobPostingApp/image',{
      method: 'POST',
      body:formdata1
  }).then((response)=>{
      console.log(response)
      return response.json()
  }).then((resp)=>{
      console.log(resp.data.image);
      setBanner(resp?.data?.image); 
      console.log(resp);
  } )
  .catch((error)=>{
      console.log(error)
  })
  }
  useEffect((e) => {UploadImage(e);
  },[banner1]);
  
    return (
      <div>
        <h1>Create Event</h1>

 <div className="master-login-section">
                            <form autoComplete="off">
                            <div className="master-form-group">
                            <input  type="text" name="firstName"  onChange={(e)=>setEventName(e.target.value)} placeholder="Event Name" className={"master-input "} />
                                
                            </div>
                            <div className="master-form-group">
                                <textarea type="text" placeholder="Location" onChange={(e)=>setLocation(e.target.value)} name="phoneNumber" className={"master-input " } />
                                
                            </div>

                            <div className="master-form-group">
                                <input type="date" placeholder="Start Date" onChange={(e)=>setStartDate(e.target.value)} name="password" className={"master-input"} />
                               
                            </div>
                            <div className="master-form-group">
                                <input type="Date" placeholder="End Date" onChange={(e)=>setEndDate(e.target.value)} name="confirmPassword" className={"master-input"} />
                                
                            </div>

                            <div className="master-form-group">
                                <input type="file" onChange={(e)=>setBanner1(e.target.files)} className={"master-input"} />
                            </div>

                            <div className="master-form-group master-center">
                                <button onClick={(e)=>addEvent(e)} className="master-submit-btn">Register now</button>
                            </div>
                            
                            </form>
                        </div>

      </div>
    );
  }
