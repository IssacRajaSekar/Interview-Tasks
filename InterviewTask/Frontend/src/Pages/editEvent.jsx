import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EditEvent(){
    const {state}=useLocation();
    const [banner1,setBanner1] = useState([])
    const [banner,setBanner]= useState(state.banner)
    const [eventName,setEventName]=useState(state.eventName)
    const [location,setLocation] = useState(state.location)
    const [startDate,setStartDate] = useState(state.startDate)
    const [endDate,setEndDate]=useState(state.endDate)
    const navigate2 = useNavigate()
    const id = state._id
    console.log(state);
    const eventData = {banner,eventName,location,startDate,endDate}

    const Edit = async (e) => {
        e.preventDefault();
        console.log(eventData);
        const newEmployee = await fetch('http://localhost:9000/jobPostingApp/editEvent/'+id,{
          method: 'PUT',
          headers: {            
            'Content-type': 'application/JSON', 
          },
          body: JSON.stringify(eventData)
      }).then((response)=>{
        console.log(response);
        return response.json()
    }).then((resp)=>{
        console.log(resp)
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

    return(
    <div>
        <h1>Edit Event</h1>

 <div className="master-login-section">
                            <form autoComplete="off">
                            <div className="master-form-group">
                            <input  type="text" name="firstName" value={eventName}  onChange={(e)=>setEventName(e.target.value)} placeholder="Event Name" className={"master-input "} />
                                
                            </div>
                            <div className="master-form-group">
                                <textarea type="text" placeholder="Location" value={location} onChange={(e)=>setLocation(e.target.value)} name="phoneNumber" className={"master-input " } />
                                
                            </div>

                            <div className="master-form-group">
                                <input type="date" placeholder="Start Date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} name="password" className={"master-input"} />
                               
                            </div>
                            <div className="master-form-group">
                                <input type="Date" placeholder="End Date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} name="confirmPassword" className={"master-input"} />
                                
                            </div>
                            <div className="master-form-group">
                                <label htmlFor=""><h3>Preview Image</h3></label>
                                <img src={"http://localhost:9000/"+banner} alt="banner" width="100%" height="5%" />
                            </div>

                            <div className="master-form-group">
                            <label htmlFor=""><h3>Replace Image</h3></label>
                                <input type="file" onChange={(e)=>setBanner1(e.target.files)} className={"master-input"} />
                            </div>

                            <div className="master-form-group master-center">
                                <button onClick={(e)=>Edit(e)} className="master-submit-btn">Submit</button>
                            </div>
                            
                            </form>
                        </div>

      </div>
)}