import { Outlet } from 'react-router';
import NavBar from "./components/nav-bar/NavBar";
import SideNavBar from './components/side-nav-bar/SideNavBar';
import './App.css';

function App() {

  return (
    <div className='bg-primary font-display flex flex-col overflow-hidden h-[100vh] pb-[20px]'>
      <NavBar />
      <main className="bg-[#EFEFEF] rounded-[20px] mx-5 flex gap-5 overflow-hidden flex-1">
        <div className='w-[250px] bg-white'>
          <SideNavBar />
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default App
