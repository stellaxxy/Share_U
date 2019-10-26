import types from './types';

export function setLoginInfo(values) {
    return {
        type: types.SET_LOGIN_INFO,
        payload: values
    }
}