import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from "./components/Header/Header"
import Home from './components/Home/Home';
import Lessons from './components/Lessons/Lessons';
import Add from './components/Add/Add';

function App() {
  return (
      <div className="container">
        <Header />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/lessons" component={Lessons} />
            <Route path="/add" component={Add} />
          </Switch>
      </div>
  );
}

export default App;
