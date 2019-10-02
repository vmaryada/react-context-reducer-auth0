import React from 'react';
import { MeetupContext } from '../Store/Store.js';
import { UserAction } from '../Store/Store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
function Meetup() {

    return (
        <UserAction.Consumer>
            {dispatch =>
                <MeetupContext.Consumer>
                    {context =>

                        <div>


                            <h4>Attendess({context.attendees.length})</h4>
                            <hr />
                            <ul style={{ textAlign: 'left' }}>
                                {context.attendees.map((attendee, index) =>
                                    <span key={index}>
                                        <li style={{ paddingBottom: '10px' }}><span style={{minWidth:'100px', display:'inline-block'}}>{attendee} &nbsp; &nbsp;</span>
      <button className='btn btn-primary btn-sm' onClick={() => dispatch({ type: 'UNSUBSCRIBE', payload: context.attendees[index] })}>Unsubscribe</button>
                                        </li>
                                    </span>)}
                            </ul>
                        </div>
                    }
                </MeetupContext.Consumer>
            }
        </UserAction.Consumer>
    )
}

export default Meetup;