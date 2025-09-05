import { Routes, Route } from "react-router-dom";
import TheLoai from "./Pages/TheLoai";

function App() {
    return (
        <Routes>
            <Route path="/:page" element={<TheLoai title="anime" />}></Route>
            <Route path="/" element={<TheLoai title="anime" />}></Route>
        </Routes>
    );
}

export default App;
