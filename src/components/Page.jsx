import { useState, createContext } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Outlet, useLoaderData } from "react-router-dom";

export const Data = createContext({});

const Page = function() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useLoaderData();

  const handleSidebarOpen = function() {
    setSidebarOpen(!sidebarOpen);
  };

  return(
    <>
      {sidebarOpen && (<Sidebar />)}
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