import { createStore, combineReducers} from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { permissionReducer } from "./redux/reducers/permissionreducers";


const reducer = combineReducers({
  permission:permissionReducer
});

let initialState = {

};

// const middleware = [thunk];

const mystore = createStore(
  reducer,
  initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
);

export default mystore;