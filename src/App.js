import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/login/Login";
import CreateAccount from "./Components/login/CreateAccount";
import Verification from "./Components/login/Verification";
import ForgetPassword from "./Components/login/ForgetPassword";
import ChangePassword from "./Components/login/ChangePassword";
import Portal from "./Portal";
import Dashboard from "./Components/Main/Dashboard";
import Details from "./Components/login/Details";
import Answers from "./Components/Pages/Answers";
import Askquestion from "./Components/Pages/Askquestion";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Verification" element={<Verification />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/Portal" element={<Portal />}>
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Details" element={<Details />} />
            <Route path="Dashboard/Answers/:id" element={<Answers />} />
            <Route path="Dashboard/Askquestion" element={<Askquestion />} />
            <Route path="Dashboard/Details" element={<Details />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
