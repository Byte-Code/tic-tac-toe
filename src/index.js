import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';
import GameContainers from './containers/GameContainers'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home'

const store = createStore(
  reducers,
  compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const About = () => <h2>About</h2>;

ReactDOM.render(
  <Provider store ={store}>
      <Router>
          <div>
            <Route exact path="/" render={ () => <Home /> } />
            <Route exact path="/game/:gameName" render={(routerProps) => <GameContainers {...routerProps}/>} />
            <Route path="/about" component={About} />
          </div>
      </Router>
  </Provider>, 
  document.getElementById("root")
);


  