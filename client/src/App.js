import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

import Landing from "./routes/landing/Landing.component";
import Register from "./routes/register/Register.component";
import Dashboard from "./routes/dashboard/Dashboard.component";
import Error from "./routes/error/Error.component";
import LogIn from "./routes/log-in/LogIn.component";
import Profile from "./routes/profile/Profile.component";
import Stats from "./routes/stats/Stats.component";
import AllJobs from "./routes/all-jobs/AllJobs.component";
import AddJob from "./routes/add-job/AddJob.component";

import { selectAccessToken } from "./store/user/user.selector";

import { getCurrentUserStart } from "./store/user/user.action";



function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const accessToken = useSelector(selectAccessToken)

  useEffect(() => {
    dispatch(getCurrentUserStart())
  }, [dispatch])

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard/profile")
    }
  }, [accessToken])


  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route index element={<Stats />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="all-jobs" element={<AllJobs />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
