import './App.css';
import { Route,Routes } from 'react-router-dom';
import EventList from './Pages/eventList';
import CreateEvent from './Pages/createevent';
import EditEvent from './Pages/editEvent';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<EventList/>}/>
      <Route path='/createevent' element={<CreateEvent/>}/>
      <Route path='/editEvent' element={<EditEvent/>}/>
    </Routes>
  );
}

export default App;
