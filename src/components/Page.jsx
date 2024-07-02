import { useState, createContext } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Outlet, useLoaderData } from "react-router-dom";

export const Data = createContext({});

const Page = function() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, categories } = useLoaderData();

  const handleSidebarOpen = function() {
    setSidebarOpen(!sidebarOpen);
  };

  return(
    <>
      {sidebarOpen && (<Sidebar user={user} categories={categories} />)}
      <main>
        <Data.Provider value={{ user, categories }}>
          <TopBar handleSidebarOpen={handleSidebarOpen} />
          <Outlet />
        </Data.Provider>
      </main>
    </>
  )
}

export default Page;