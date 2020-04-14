import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from './Components/spinner';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch,Route , withRouter} from 'react-router-dom';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from "./redux/rootReducer/rootReducer";
import {setUser ,clearUser} from './redux/user/userActions';


const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount(){
    console.log(this.props.isLoading)
    firebase.auth().onAuthStateChanged(user =>{
      if (user){
        //console.log(user);
        
        this.props.setUser(user);
        this.props.history.push('/');
      }else{
        this.props.history.push('/login');
       this.props.clearUser();
      }
  }

    )
  }
  render() {

  return this.props.isLoading ? <Spinner/> : (
    
  <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      


  </Switch>
  
);

  }



 

}
const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

const mapDispatchToProps = dispatch => ({
  setUser : user => dispatch(setUser(user)),
  clearUser: () => dispatch(clearUser())

});
const RootWithAuth = withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));

ReactDOM.render(
  <Provider store={store}>
 <BrowserRouter>
   <RootWithAuth />
  </BrowserRouter>
  </Provider>
 
   
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
