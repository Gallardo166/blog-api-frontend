import { useState, createContext, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Outlet, useLoaderData } from "react-router-dom";
import styles from "../styles/Page.module.css";

export const Data = createContext({});

const Page = function() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const topBarRef = useRef(null);
  const { user, categories } = useLoaderData();

  const handleSidebarOpen = function(bool) {
    setSidebarOpen(bool);
  };

  useEffect(() => {
    const topBar = topBarRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => topBar.classList.toggle(styles.isPinned, entry.intersectionRatio < 1),
      { threshold: [1] }
    );
    if (topBar) observer.observe(topBar)
    return () => {
      if (topBar) observer.unobserve(topBar)
    }
  }, [topBarRef])

  return(
    <>
      <div className={styles.backgroundImage} />
      <div>
        <Sidebar user={user} categories={categories} handleSidebarOpen={handleSidebarOpen} sidebarOpen={sidebarOpen} />
        <main className={styles.main}>
          <Data.Provider value={{ user, categories }}>
            <TopBar handleSidebarOpen={handleSidebarOpen} ref={topBarRef} />
            <div className={styles.pageContainer} onClick={() => handleSidebarOpen(false)}>
              <Outlet />
            </div>
          </Data.Provider>
        </main>
      </div>
    </>
  )
}

export default Page;