import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";

let rootReducers = combineReducers({
    chat:chatReducer,
    app: appReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
});
export type AppStateType = ReturnType<typeof rootReducers>
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)));

//@ts-ignore
window.store = store;


export default store;