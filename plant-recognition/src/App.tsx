import { Route, Routes } from "react-router";
import TopBar from "./components/TopBar";
import PlantRecognition from "./pages/PlantRecognition";
import IIR from "./pages/IIR";
import Dashboard from "./pages/Dashboard";
import IS from "./pages/IS";
import Manejo from "./pages/Manejo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TopBar />} >
        <Route index element={<Dashboard />} />
        <Route path="recognition" element={<PlantRecognition />} />
        <Route path="iir" element={<IIR />} />
        <Route path="is" element={<IS />} />
        <Route path="manejo" element={<Manejo />} />
      </Route>
    </Routes>
  )
}

export default App;
