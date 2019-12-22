import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Navigator from './components/Navigator';


function App() {

  return (
    <div className="App">

          <BrowserRouter>
          <Navigator />
            <Switch>
              <Route exact path="/" component={Customers}></Route>
              <Route path="/customers" component={Customers}></Route>
              <Route path="/trainings" component={Trainings}></Route>
            </Switch>
            </BrowserRouter>


    </div>
  );
}

export default App;
