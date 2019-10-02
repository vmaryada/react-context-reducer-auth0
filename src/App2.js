import React from 'react';
import Auth from './Auth/Auth.js'
const MeetupContext = React.createContext();
const UserContext = React.createContext();

const auth = new Auth();

const initialState = {
    meetup: {
        title: 'Auth0 Online Meetup',
        date: Date(),
        attendees: ['Bob', 'Jessy', 'Christina', 'Adam']
    },
    user: {
        name: 'Roy'
    }
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'subscribeUser':
            return {
                ...state,
                attendees: [...state.attendees, action.payload],
                subscribe: true
            };
        case 'loginUser':
        console.log('login called');
            return {
                ...state,
                isAuthenticated: action.payload.authenticated,
                name: action.payload.user.name,
            };
            
        default:
            return state;
    }
};

const UserContextProvider = props => {
    const [state, dispatch] = React.useReducer(reducer, initialState.user);
    auth.handleAuthentication().then(() => {
        console.log('handle auth called');
        dispatch({
            type: 'loginUser',
            payload: {
                authenticated: true,
                user: auth.getProfile()
            }
        });
    }).catch(error=>console.log(error));
    return (
        <UserContext.Provider value={{...state,handleLogin: auth.signIn}}>
            {props.children}
        </UserContext.Provider>
    );
};


const MeetupContextProvider = ({ user, ...props }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState.meetup);
    return (
        <MeetupContext.Provider
            value={{...state,handleSubscribe: () =>
                    dispatch({ type: 'subscribeUser', payload: user.name }),
                    handleUnSubscribe: () =>
                    dispatch({ type: 'unSubscribeUser', payload: user.name })
            }}
        >
            {props.children}
        </MeetupContext.Provider>
    );
};


const App = () => (
    <UserContextProvider>
        <UserContext.Consumer>
            {user => (
                <MeetupContextProvider user={user}>
                    <MeetupContext.Consumer>
                        {meetup => (
                            <div>
                                <h1>{meetup.title}</h1>
                                <span>{meetup.date}</span>
                                <div>
                                    <h2>{`Attendees (${meetup.attendees.length})`}</h2>
                                    {meetup.attendees.map(attendant => (
                                        <li key={attendant}>{attendant}</li>
                                    ))}
                                    <p>
                                        {console.log(user.isAuthenticated)    }
                                        { user.isAuthenticated ? (
                                            !meetup.subscribed ? (
                                                <button onClick={meetup.handleSubscribe}>
                                                    Subscribe
                          </button>
                                            ) : (
                                                    <button onClick={meetup.handleUnSubscribe}>
                                                        Unsubscribe
                          </button>
                                                )
                                        ) : (
                                                <button onClick={user.handleLogin}>Login</button>
                                            )}
                                    </p>
                                </div>
                            </div>
                        )}
                    </MeetupContext.Consumer>
                </MeetupContextProvider>
            )}
        </UserContext.Consumer>
    </UserContextProvider>
);


export default App;