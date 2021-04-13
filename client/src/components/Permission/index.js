import React, { useState } from "react";
import firebase from 'firebase';
import {Label, Icon} from 'semantic-ui-react';
import { useStoreContext } from '../../utils/GlobalState';



function Permission () {

    const [state] = useStoreContext();
    const [permission, setPermission ] = useState(false);

     const firebaseId = state.user._id

    const messaging= firebase.messaging();

    function gainPermission() {
        messaging.requestPermission()
        .then(function() {
            console.log('Have permission');
            
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
            console.log(token);
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
        <>
        <Label as='a' color='green' >
            Turn notifications on 
        <Icon className="big" aria-label="turn notifications on" name="envelope outline" onClick={gainPermission} />
        </Label>
        </>
        ) : (
        
        <Label as='a' color='red'>
            Turn notifications off 
        <Icon className="big" aria-label="turn notifications off" name="envelope open outline" onClick={removePermission} />
        </Label>
        )
        
    )
};

export default Permission;