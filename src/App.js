import './App.css';
//import { Route, Switch, Redirect } from 'react-router-dom';
import Header from "./components/Header/Header"
import { BrowserRouter } from 'react-router-dom';
//<Route path="/" exact component={Lesons} />

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
