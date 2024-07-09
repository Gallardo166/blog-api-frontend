import { useState, createContext } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Outlet, useLoaderData } from "react-router-dom";
import styles from "../styles/Page.module.css";

export const Data = createContext({});

const Page = function() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, categories } = useLoaderData();

  const handleSidebarOpen = function(bool) {
    setSidebarOpen(bool);
  };

  return(
    <>
      <div className={styles.backgroundImage} />
      <div>
        <Sidebar user={user} categories={categories} handleSidebarOpen={handleSidebarOpen} sidebarOpen={sidebarOpen} />
        <main className={styles.main}>
          <Data.Provider value={{ user, categories }}>
            <TopBar handleSidebarOpen={handleSidebarOpen} />
            <Outlet />
          </Data.Provider>
        </main>
      </div>
    </>
  )
}

export default Page;