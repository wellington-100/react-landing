import logo from './logo.svg';
import './App.css';

import { Home } from './layout/Home';
import { Admin } from './layout/Admin';
import { Page_404 } from './layout/404';


function App({pathname}) {

  return (
    <div> { pathname === "/" ? <Home /> 
    : pathname === "/admin" ? <Admin /> : <Page_404 />} </div>
  )
}

export default App;





