import "./App.css";
import { Outlet } from "react-router-dom";
import logo from "./logo.png";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Outlet />
      </header>
    </div>
  );
}

export default App;
