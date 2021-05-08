import types from './panel.types';

const initial_state = {
    // drawer: true,
    activeNavDrawer: 1,
    clickedNavDrawer: false,
    focusBankInfo : false,
}

const panelReducer = (state = initial_state, {type, payload}) => {
    switch (type) {

        case types.CLICK_NAV_DRAWER_TOGGLER:
            return {
                ...state,
                clickedNavDrawer: !state.clickedNavDrawer
            }

        case types.ACTIVE_NAV_DRAWER:
            return {
                ...state,
                activeNavDrawer: payload
            }

        case types.CLEAR_ACTIVE_DRAWER:
            console.log("clearActiveNavDrawer");
            return {
                ...state,
                activeNavDrawer: ""
            }

        default:
            return state;
    }
}

export default panelReducer;