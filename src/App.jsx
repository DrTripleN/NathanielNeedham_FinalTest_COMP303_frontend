import './styles/bankui.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/navBar.jsx";
import AddBank from "./components/AddBank.jsx";
import {Route, Routes} from "react-router-dom";
import BankList from "./components/BankList.jsx";
import BankOperations from "./components/BankOperations.jsx";
//import {Route, Routes} from "react-router-dom";
//import AddBank from "./components/AddBank.jsx";

function App() {
    return (
        <>
            <Navigation/>
            <div className="container mt-5">
                <Routes>
                    <Route path="/addBank" element={<AddBank/>}/>
                    <Route path="/bankLists" element={<BankList/>}/>
                    <Route path="/bankOperations" element={<BankOperations/>}/>
                    <Route path="/" element={<h1 className={"h1-greeting"}>Welcome to Banking UI Application</h1>}/>
</Routes>
            </div>
            </>
            )}

            export default App;
