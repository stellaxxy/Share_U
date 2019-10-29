import types from '../actions/types';

const DEFAULT_STATE = {
    auth: false,
    info: {
        username: null
    }
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.SET_LOGIN_INFO:
            return {...state, auth: action.payload.auth, info: {...action.payload.info}}
        default:
            return state;
    }
}