import types from './all.types';

// ----- Register --------


export const clearStorageAll = () => (
    {
        type : types.CLEAR_STORAGE_ALL,
    }
)


export const openDashboard = (payload)=>(
    {
        type : types.OPEN_DASHBOARD,
        payload
    }
)

// export const openDashboard = (payload) => (
//     {
//         type : types.OPEN_DASHBOARD, 
//         payload
//     }
// )



 
