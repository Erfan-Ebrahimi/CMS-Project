import './App.scss';

// ----------COMPONENTS--------------//
import Header from "./components/header/Header"
import Sidebar from "./components/sidebar/Sidebar"

const App = () => {
  return (
    <>
      <Sidebar/>
      <div className="main">
        <Header/>
        {/* div routes */}
      </div>
    </>
  )
}

export default App