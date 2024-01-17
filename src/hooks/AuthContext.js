import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // console.log(response.data);
        setUsername(response.data.username);
        setUserId(response.data._id);
        setFullName(response.data.fullName);
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            // Unauthorized (expired or invalid token)
            console.log("Session expired or Invalid token, log in");
            alert("Session expired, log in again");
            logout();
          }
        }
      }
    };
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      fetchUserProfile();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token, fullName]);

  const contextValue = useMemo(
    () => ({
      token,
      logout,
      setToken,
      username,
      fullName,
      userId,
      isAdmin,
      setUsername,
    }),
    [token, fullName, userId, isAdmin]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
