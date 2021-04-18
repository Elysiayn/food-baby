import React, { useState } from "react";
import firebase from 'firebase';
import { useStoreContext } from '../../utils/GlobalState';


// This function sets up the token that firebase uses to identify where to send the notifications
function Permission () {

    const [state] = useStoreContext();
    const [permission, setPermission ] = useState(false);

     const firebaseId = state.user._id

    const messaging= firebase.messaging();

    // this creates the token and then creates or updates the user information in the firebase database
    function gainPermission() {
        messaging.requestPermission()
        .then(function() { 
            return messaging.getToken(); 
        })
        .then( function (token) {
            // this is the information that goes to the firebase database and is what prompts the firebase cloud function welcomeUser
            // found in functions/index.js
            firebase.database().ref(`users/` + firebaseId).set({
                firstName: state.user.firstName,
                lastName: state.user.lastName,
                token
            })
            .catch(function(error) {
                console.error(error)
            })
            setPermission(true);
        })
        .catch(function(err) {
            console.log(err);
        })
    };

    // this removes the token it does not update the firebase database as that would trigger the cloud function and then cause an invalid token error
    function removePermission() {
        messaging.deleteToken();
        setPermission(false);
        console.log('token removed')
    };

    return (
        
        (!permission) ? (
            <div className="ui green button" onClick={gainPermission}>
            <i aria-label="turn notifications on" className=" big envelope outline icon"></i> Turn notifications on
            </div>
        ) : (
            <div className="ui red button" onClick={removePermission}>
            <i aria-label="turn notifications off" className=" big envelope open outline icon"></i> Turn notifications off
            </div>
        )
        
    )
};

export default Permission;