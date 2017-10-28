
import * as types from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case types.EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case types.PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case types.LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case types.LOGIN_USER_SUCCESS:
            // if this line were added, an error would be thrown and the catch statement would be entered
            // firebase thinks something went wrong with the request
            // banana;
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case types.LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication failed.', password: '', loading: false };
        default:
            return state;
    }
}
