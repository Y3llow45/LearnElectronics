import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from "./components/Header/Header"
import Home from './components/Home/Home';
import Lessons from './components/Lessons/Lessons';
import Add from './components/Add/Add';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Footer from './components/Footer/Footer';
import Blog from './components/Blog/Blog';
import Edit from './components/Edit/Edit';
import LessonDetail from './components/LessonDetail/LessonDetail';
import {UserProvider} from './contexts/UserContext';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app-container">
      <UserProvider>
        <Header/>
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
        <div className='main-content'>
          <Switch>
            <Route path="/" exact component={Home}>
            </Route>
            <Route path="/lesson/:title" component={LessonDetail} />
            <Route path="/lessons/:pageNum" component={Lessons} /> 
            <Route path="/add" component={Add} />
            <Route path="/edit" component={Edit} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/blog" component={Blog} />
          </Switch>
        </div>
      <Footer />
    </UserProvider>
    </div>
  );
}

export default App;