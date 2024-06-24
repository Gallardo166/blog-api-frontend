import { useState, createContext } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

const Data = createContext({});

const Page = function() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = function() {
    setSidebarOpen(!sidebarOpen);
  }

  return(
    <>
      {sidebarOpen ? (<Sidebar />) : null}
      <TopBar handleSidebarOpen={handleSidebarOpen} />
      <main>
        <Data.Provider value={{ setSidebarOpen }}>
          <Outlet />
        </Data.Provider>
      </main>
    </>
  )
}

export default Page;