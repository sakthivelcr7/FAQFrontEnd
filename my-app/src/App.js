// import logo from './logo.svg';
import './App.css';
// import AdminComp from './AdminComp';
import QuesAndAns from './CRUD/QuesAndAns';
import EditQandA from './CRUD/EditQandA';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components
import CreateQandA from './CRUD/CreateQandA';
import CreateStudQues from './StudentFolder/CreateStudQues';
import StudFAQ from './StudentFolder/StudFAQ';
//import FaqSimple from './CRUD/Dummy/FaqSimple';
import StudAskedQues from './CRUD/StudAskedQues';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-user" element={<CreateQandA />} />
        <Route path="/" element={<QuesAndAns />} />
        <Route path="/edit-user/:id" element={<EditQandA />} />
        <Route path="/studaskedques" element={<StudAskedQues/>} />

      </Routes>
    </Router>


// <div>
//       {/* <CreateStudQues/> */}
//       <StudFAQ/>
//     </div>    
  );
}

export default App;
