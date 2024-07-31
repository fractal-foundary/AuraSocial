import './App.css';
import Sidebar from './SideBar/sidebar';
import Home from './SideBar/Home/home';

function App() {
  return (
    <div className="main flex container mx-8">
      <Sidebar />
      <Home />
    </div >
  );
}

export default App;
