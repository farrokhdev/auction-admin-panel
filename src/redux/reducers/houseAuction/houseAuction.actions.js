import types from './houseAuction.types';
import axios from "../../../utils/request";
import UploadAxios from "../../../utils/uploadRequest";
import {BASE_URL} from "../../../utils";
import {UPLOAD_EXEL_AUCTION} from "../../../utils/constant";
import {Upload} from "antd";
import {getTokenObject} from "../../../utils/utils";

// ----- Register --------
export const setHOUSEAUCTION = (payload) => (
    {
        type: types.SET_ADD_HOUSEAUCTION,
        payload
    }
)
export const removeHOUSEAUCTION = (payload) => (
    {
        type: types.REMOVE_ADD_HOUSEAUCTION,
    }
)


export const uploadExel = (name,file) => async dispatch=>{

        UploadAxios.put(`${BASE_URL}${UPLOAD_EXEL_AUCTION(name)}`,file)
            .then(r => {
                console.log(r)
             return r;
        }).catch(e => {

        })

}



