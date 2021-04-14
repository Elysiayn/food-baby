import React, { useState } from "react";
import firebase from 'firebase';
import { useStoreContext } from '../../utils/GlobalState';



function Permission () {

    const [state] = useStoreContext();
    const [permission, setPermission ] = useState(false);

     const firebaseId = state.user._id

    const messaging= firebase.messaging();

    function gainPermission() {
        messaging.requestPermission()
        .then(function() { 
            return messaging.getToken(); 
        })
        .then( function (token) {

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