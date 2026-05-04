import React from "react";
import Sidebar from "../Components/Home/Sidebar";
import Topbar from "../Components/Home/Topbar";
import Main from "../Components/Home/Main";

export default function Home({ library }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar open={sidebarOpen} />
      <div className="flex flex-col flex-1 w-full">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Main library={library} />
      </div>
    </div>
  );
}