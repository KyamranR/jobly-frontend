import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Companies from "./Companies";
import CompanyDetail from "./CompanyDetail";
import Jobs from "./Jobs";
import JobDetail from "./JobDetail";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile";

function AppRoutes({ login, signup }) {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/login" element={<Login login={login} />} />
      <Route path="/signup" element={<Signup signup={signup} />} />

      <Route element={<PrivateRoute />}>
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<UpdateProfile />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
