

import * as types from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const emailChanged = (text) => {
    return {
        type: types.EMAIL_CHANGED,
        payload: text
    }
};

export const passwordChanged = (text) => {
    return {
        type: types.PASSWORD_CHANGED,
        payload: text
    }
}

export const loginUser = ({ email, password }) => (dispatch) => {
    dispatch({
        type: types.LOGIN_USER
    });

    firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch({
                    type: types.LOGIN_USER_SUCCESS,
                    payload: user
                })

                Actions.main();
            })
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then((user) => {
                            dispatch({
                                type: types.LOGIN_USER_SUCCESS,
                                payload: user
                            });

                            Actions.main();
                        })
                        .catch(() => {
                            dispatch({
                                type: types.LOGIN_USER_FAIL
                            })
                        });
            });
}
