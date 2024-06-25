import { useState, createContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

export const Data = createContext({});

const Page = function() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async function(token) {
      if (token) {
        try {  
          const response = await fetch(
            import.meta.env.DEV ? "http://localhost:3000/users/user" : null, {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
              },
            }
          );
          const resJson = await response.json();
          if (resJson.user) {
            setUser(resJson.user);
            return;
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData(token);
  }, []);

  const handleSidebarOpen = function() {
    setSidebarOpen(!sidebarOpen);
  };

  return(
    <>
      {sidebarOpen ? (<Sidebar />) : null}
      <main>
        <Data.Provider value={{ setSidebarOpen, user }}>
          <TopBar handleSidebarOpen={handleSidebarOpen} />
          <Outlet />
        </Data.Provider>
      </main>
    </>
  )
}

export default Page;