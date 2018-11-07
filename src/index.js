import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/reducers';
import GameContainers from './containers/GameContainers'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


const About = () => <h2>About</h2>;

ReactDOM.render(
  <Provider store ={store}>
      <Router>
          <div>
            <Route exact path="/" component={GameContainers} />
            <Route path="/about" component={About} />
          </div>
      </Router>
  </Provider>, 
  document.getElementById("root")
);


  