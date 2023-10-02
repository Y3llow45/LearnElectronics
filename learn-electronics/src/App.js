import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from "./components/Header/Header"
import Home from './components/Home/Home';
import Lessons from './components/Lessons/Lessons';
import Add from './components/Add/Add';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Footer from './components/Footer/Footer';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <div className="container">
        <Header />
        <ToastContainer
          className="add-toast-container"
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/lessons" component={Lessons} />
          <Route path="/add" component={Add} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </div>
    <Footer />
    </div>
  );
}

export default App;
