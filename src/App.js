import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Components/login/Login";
import CreateAccount from "./Components/login/CreateAccount";
import Verification from "./Components/login/Verification";
import ForgetPassword from "./Components/login/ForgetPassword";
import ChangePassword from "./Components/login/ChangePassword";
import Portal from "./Portal";
import Dashboard from "./Components/Main/Dashboard";
import Profile from "./Components/login/Profile";
import Answers from "./Components/Pages/Answers";
import Askquestion from "./Components/Pages/AskQuestions";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Verification" element={<Verification />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/Portal" element={<Portal />}>
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="Dashboard/Answers/:id" element={<Answers />} />
            <Route path="Dashboard/Askquestion" element={<Askquestion />} />
            <Route path="Dashboard/Profile" element={<Profile />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
