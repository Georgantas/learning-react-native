
import * as types from '../actions/types';

const INITIAL_STATE = {
    email: ''
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case types.EMAIL_CHANGED:
            
        default:
            return state;
    }
}
