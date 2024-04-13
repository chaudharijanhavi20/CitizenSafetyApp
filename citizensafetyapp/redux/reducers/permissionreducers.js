import { PERMISSION_FAILS, PERMISSION_REQUEST, PERMISSION_SUCCESS } from "../constants/permisionconst";

export const permissionReducer = (state = { permission: [] }, action) => {

    switch (action.type) {
        case PERMISSION_REQUEST:
            return {
                loading: true,
                permissions: null,
            }

        case PERMISSION_SUCCESS:
            return {
                loading: false,
                permissions: action.payload
            }

        case PERMISSION_FAILS:
            return {
                loading: false,
                permission: null,
                errors: action.payload
            }

        default:
            return state
            break;
    }

}