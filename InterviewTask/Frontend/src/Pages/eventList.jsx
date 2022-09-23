import { useState } from "react"
import { useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EventList(){
    const [eventData,setEventData] = useState([])
    const [checkedState,setCheckedState] = useState([])
    const [isVisible, setIsVisible] = useState(false);

    var items = []
    console.log(11,typeof items)
    const navToEdit = useNavigate()
    useEffect(() => {
        let timeout = setTimeout(() =>{
             setCheckedState(new Array(eventData.length).fill(false))
        },1000)
    },[])
    
    const eventList = async () => {
        await axios({
            'method':'GET',
            'url':'http://localhost:9000/jobPostingApp/allEvent'
        })
        .then((response) =>{
            console.log(response.data.data)
            setEventData(response?.data?.data)
        })
        .catch((error) =>{
            console.log(error)
        })
    }
    useEffect(() => {eventList();
    },[]);

   
    console.log(40,items);
    // const handleOnChange = (e,position) => {
    //     const updateCheckedState = checkedState.map((item,index) =>
    //     index === position ? !item : item
    //     )

    //     setCheckedState(updateCheckedState)
    // }
    

    async function deleteItem(){
        
        await axios({
            'method':'PUT',
            'url':'http://localhost:9000/jobPostingApp/deleteEvent/',
            'data':{items}
        })
        .then((response) =>{
            console.log(response)
          
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    function viewEvent(e,events){
        navToEdit('/editEvent',{state:events})
    }
 
    function handle(id){
        
        console.log(id)
        console.log(68,items);
        if(items.toString().includes(id)){
            console.log(70,items);
            var valueToRemove = id
            var itemremoved = items.filter(item => item !== valueToRemove)
            // function removeFn(items,index){
            //     console.log(73,items);
            //     if(items.toString().includes(id)){
            //         console.log(75,items);    
            //     }
            //     itemremoved.splice(index,1)}
            items = itemremoved; 
            console.log(items,89);
        }else{
            console.log(80,items);
            console.log(81,id);
            items.push(id)
            console.log(83,items);
        }
    }
  

    return(
    <div class="container">
            {/* <!-- header --> */}
            <div class="header">
                <h1>Events List</h1>
                <h4>
                
          <Link to='createevent' className="price data l">Create Event</Link>
                </h4>
            </div>
            {/* <!-- header --> */}
            <div class="content .flex-column">
            {eventData.length == 0 ? <h5> No Data Found </h5>:
        eventData.length >= 0 && eventData.slice().reverse().map((events,index) =>
        <>
                {/* <!-- row --> */}
                <div class="row">
                
                    {/* <!--  --> */}
                    <div class="data">
                        {/* <!--  --> */}
                        <div class="img flex">
                            <img src={"http://localhost:9000/"+events?.banner} height="10px" width="10px" alt="banner" />
                        </div>
                        {/* <!--  --> */}
                        <div class="text">
                            {/* <p class="statue">freelancer</p> */}
                            <h2>{events.eventName}</h2>
                            {/* <!--  --> */}
                            <div class="info">
                                <p>Start-Date : {events.startDate}</p>
                                <p>End-Date : {events.endDate}</p>
                            </div>
                            {/* <!--  --> */}    
                        </div>
                        {/* <!--  --> */}
                    </div>
        
                    {/* <!--  --> */}
                    <div class="data">
                        {/* <!--  --> */}
                        <div class="city">
                            <p>{events.location}</p>
                            <hr/>
                            {/* <p>Egypt</p> */}
                        </div>
                        {/* <!--  --> */}
                        <div class="price">
                             <div className="check"><small>Select</small> 
                        <input className="check1" type="checkbox" name="select" id="select" 
                         onChange={()=>handle(events._id)}
                        // checked={checkedState[index]} 
                        //   onChange={()=> handleOnChange(index)}
                        value={events._id}
                         />
                        </div>
                            <button onClick={(e)=>viewEvent(e,events)}>Edit</button>
                        </div>
                        
                    </div>
                    
                  
                    {/* <!--  --> */}
                </div>
                </>
        )}
               
            </div>
            <button className="b" onClick={()=>deleteItem()}>Delete</button>
        </div>
    )
}