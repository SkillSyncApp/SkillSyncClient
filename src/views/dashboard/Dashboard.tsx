import { Outlet } from "react-router";
import NavBar from "../../components/nav-bar/NavBar";
import SideNavBar from "../../components/side-nav-bar/SideNavBar";
import { Toaster } from "react-hot-toast";

function Dashboard() {
  return (
    <div
      className="bg-primary font-display flex flex-col overflow-hidden h-[100vh]"
      style={{ isolation: "isolate" }}
    >
      <NavBar />
      <main className="bg-lightgray rounded-[20px] mx-5 flex flex-1">
        <div className="w-[250px] bg-white drop-shadow-lg z-20">
          <SideNavBar />
        </div>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}

export default Dashboard;
