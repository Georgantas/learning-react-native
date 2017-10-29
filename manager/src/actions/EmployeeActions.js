
import * as types from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: types.EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

export const employeeCreate = ({ name, phone, shift }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
                .push({ name, phone, shift })
                .then(() => {
                    dispatch({
                        type: types.EMPLOYEE_CREATE
                    });
                    Actions.employeeList({ type: 'reset' });
                });
    }
}

export const employeesFetch = () => (dispatch) => {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => { // this will be called everytime new data comes in
                dispatch({ type: types.EMPLOYEE_FETCH_SUCCESS, payload: snapshot.val() });
            });
}

export const employeeSave = ({ name, phone, shift, uid }) => (dispatch) => {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({ name, phone, shift })
            .then(() => {
                Actions.employeeList({ type: 'reset' });
            });
};
