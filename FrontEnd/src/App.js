import { useRoutes } from 'react-router-dom';
import routes from './routes';
import './App.scss';

// ----------COMPONENTS--------------//
import Header from "./components/header/Header"
import Sidebar from "./components/sidebar/Sidebar"

const App = () => {

  const router = useRoutes(routes)

  return (
    <>
      <Sidebar/>
      <div className="main">
        <Header/>

        {/*------------- ROUTES ------------------- */}
        {router}
      </div>
    </>
  )
}

export default App