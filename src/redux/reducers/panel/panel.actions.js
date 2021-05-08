import types from './panel.types'



export const toggleActiveNavDrawer = (payload) => (
    {
        type : types.ACTIVE_NAV_DRAWER ,
        payload: payload
    }
)

export const toggleClickNavDrawer = () => (
    {
        type : types.CLICK_NAV_DRAWER_TOGGLER ,
    }
)

export const clearActiveNavDrawer = () => (
    {
        type : types.CLEAR_ACTIVE_DRAWER ,
    }
)




