import Sidebar from "../Components/Home/Sidebar";
import Topbar from "../Components/Home/Topbar";
import Main from "../Components/Home/Main";

export default function Home() {

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <Main />
      </div>
    </div>
  );
}