import "./App.css";
import AllProjects from "./Components/AllProjects";
import CreateProject from "./Components/CreateProject";
import {Routes, Route} from 'react-router-dom';
import UpdateProject from "./Components/UpdateProject";
import AddSkill from "./Components/AddSkill";
import Updateskill from "./Components/UpdateSkill";
import Allskills from "./Components/Allskills";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<AllProjects />} />
        <Route exact path="/create" element={<CreateProject />} />
        <Route exact path="/update/:id" element={<UpdateProject />} />
        <Route exact path="/addskill" element={<AddSkill />} />
        <Route exact path="/updateskill/:id" element={<Updateskill />} />
        <Route exact path="/allskill" element={<Allskills />} />
      </Routes>
    </div>
  );
}

export default App;
