import React, {useState} from 'react';
import {CheckCircleTwoTone} from "@ant-design/icons";
import axios from "../../utils/request";

import ax from 'axios';
import {BASE_URL} from "../../utils";
import {Image, message} from "antd";

const UploadImage = (props) => {
    const {handleResultUpload,initialImage=''} = props;
    const [CoreUpload, setCoreUpload] = useState("");
    const [Uploaded, setUploaded] = useState(false);
    const [Uploading, setUploading] = useState(false);
    const handleUpload = async(e) => {
        let payload = {"content_type": "image"}
        setUploading(true)
        await axios.post(`${BASE_URL}/core/upload/`, payload)
            .then( async(resp) => {
                if (resp.data.code === 200) {

                    console.log(resp.data.data.result)
                    setCoreUpload(resp.data.data.result)
                  await ax.put(resp.data.data.result.upload_url, e.target.files[0])
                    .then(async(resp1) => {
                        if (resp1.status === 200) {
                            await axios.post(`${BASE_URL}/core/media/photos/`, {
                                "media_path": resp.data.data.result.upload_url,
                                "type": "image",
                                "bucket_name": "image",
                                "file_key": resp.data.data.result.file_key
                            })
                            .then((resp2) => {
                                if (resp2.data.code === 201) {
                                    
                                    
                                    setCoreUpload(resp2.data.data.result)
                                    if (resp2.data.data.result){
                                        
                                        handleResultUpload(resp2.data.data.result)
                                        // props.setIs_upload(true)
                                        setUploaded(true)
                                 
                                        setUploading(false)
                                        message.success("done")
                                    }
                                    }
                                })
                                .catch(err => {
                                        message.error("note done")
                                        console.log("Error Message", err.response);
                                        setUploading(false)
                             

                                    })
                            }
                        })
                        .catch(err => {
                            console.error(err.response);
                            setUploading(false)
                        })
                }
            })
            .catch(err => {
                console.log("Error Message", err.response);
            })
    }
    return (
        <>
            <div className="col-md-6">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <label htmlFor={"file"} className="btn-outline-pink"
                               style={{fontSize: "13px !important", cursor: "pointer"}}>
                            انتخاب تصویر
                        </label>

                        {Uploading ? <span style={{marginRight: 5}}> درحال آپلود... </span> : ""}
                        {Uploaded ? <CheckCircleTwoTone style={{marginRight: 5}} twoToneColor="#52c41a"/> : ""}

                        <input onChange={(e) => handleUpload(e)} id={'file'} type="file" accept=".jpg, .jpeg, .png"
                               style={{display: "none"}}/>
                    </div>

                    {
                        initialImage ?  <div>
                            <Image src={initialImage?.exact_url} width={100}/>
                        </div>:''
                    }
                </div>

            </div>



        </>
    );
};

export default UploadImage;