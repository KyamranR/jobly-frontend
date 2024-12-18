import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import JoblyApi from "./api/JoblyApi";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./components/AppRoutes";
import Navigation from "./components/Navigation";
import UserContext from "./components/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

function App() {
  const [token, setToken] = useLocalStorage("jobly-token");
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchCurrentUser() {
      if (token) {
        try {
          setInfoLoaded(false);
          const { username } = jwtDecode(token);
          JoblyApi.token = token;

          const user = await JoblyApi.getUser(username);
          if (isMounted) {
            setCurrentUser(user);
          }
        } catch (error) {
          console.error("Error fetching current user:", error);
          setCurrentUser(null);
        }
      } else {
        if (isMounted) setCurrentUser(null);
      }
      if (isMounted) setInfoLoaded(true);
    }

    fetchCurrentUser();
    return () => {
      isMounted = false;
    };
  }, [token]);

  async function login(loginData) {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token);

      const { username } = jwtDecode(token);

      const user = await JoblyApi.getUser(username);
      setCurrentUser(user);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async function signup(signupData) {
    try {
      const token = await JoblyApi.signup(signupData);
      setToken(token);

      const { username } = jwtDecode(token);

      const user = await JoblyApi.getUser(username);
      setCurrentUser(user);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        <Navigation logout={logout} />
        <div className="App">
          {infoLoaded ? (
            <AppRoute login={login} signup={signup} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
