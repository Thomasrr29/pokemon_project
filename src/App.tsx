import { Outlet } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/header';



function App() {
  return (

    <div>
      <HeaderComponent></HeaderComponent>
      <Outlet></Outlet>
    </div>

  );
}

export default App;