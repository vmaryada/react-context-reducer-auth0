import React, { useReducer } from 'react';
//import { tsPropertySignature } from '@babel/types';
import Auth from '../Auth/Auth.js'

const MeetupContext = React.createContext();
const UserContext = React.createContext();
const UserAction = React.createContext();
const auth = new Auth();
const UserLogin = React.createContext();

const InitialState = {
    meetup: {
        title: 'Auth0 Meetup',
        date: Date(),
        attendees: ['vin', 'surya', 'soujan']
    },
    users: ['klr', 'vk18', 'rpant'], 
    authenticated: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SUBSCRIBE': console.log(action.payload); return { ...state, attendees: [...state.attendees, action.payload] };
        case 'UNSUBSCRIBE': return { ...state, attendees: state.attendees.filter(attendee => attendee !== action.payload) };
        default: return state;
    }
}

function Store(props) {
    const login_reducer = (state, action) => {
        switch (action.type) {
            case 'LOGIN': console.log('action called');
                auth.signIn();
                console.log('signin called');
                state.authenticated = true; 
                //state = { name: [...state.name]}
                return state;
            case 'LOGOUT': auth.signOut();
                console.log('sign Out called');
               // state = { name: [...state.name] }
                return state;
            case 'SUBSCRIBE':
                console.log('Subscribe called');
                state = { ...state,  users:[...state.users,action.payload] };
                return state;
            case 'ADD_USER':
                console.log('add_user case called');
                state = { ...state,  users:[...state.users,action.payload] };
                console.log(state);
                return state;
            default: console.log('defaulted'); return state;
        }

    }


    const [state_meetup, dispatch] = useReducer(reducer, InitialState.meetup);
    const [state_users, login_dispatch] = useReducer(login_reducer, InitialState);
  


    //const [state_users, dispatch_users] = useReducer(reducer, InitialState.users);  
    return (
        <UserAction.Provider value={dispatch}>
            <UserContext.Provider value={{...state_users, handleLogin : auth.signIn}}>
                <UserLogin.Provider value={login_dispatch}>
                    <MeetupContext.Provider value={state_meetup}>
                        {props.children}
                    </MeetupContext.Provider>
                </UserLogin.Provider>
            </UserContext.Provider>
        </UserAction.Provider>
    )
}
export { MeetupContext };
export { UserContext };
export { UserAction };
export { UserLogin };
export default Store;