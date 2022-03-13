import React  from "react";
import { Upload, message } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { BASE_URL } from '../../utils';
import {PRE_UPLOAD} from '../../utils/constant';
import axios from '../../utils/request';
import UploadAxios from "../../utils/uploadRequest";
import {axios as upload_ax} from "axios"


const { Dragger } = Upload;

function MultipleUpload(props) {

  // props data required
  const {setFormDataArtwork , formDataArtwork} = props


  // drager config data
  const propsUpload = {
    listType: "picture",

    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {

      }
      if (status === "done") {

      } else if (status === "error") {
        // if status error, image not added to list upload 
        setFormDataArtwork({
          ...formDataArtwork , 
          media : formDataArtwork?.media?.filter((item) => item.uid !== info.file.uid) 
        });
      }

      return info;
    },
    progress: {
      strokeColor: {
        "0%": "#e6007e",
        "100%": "#e6007e",
      },
      width: "50%",
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },


    onRemove: (file) => {
        // check file_key ... 
        //  when we add the image(uploaded image), 'file_key' exist in  '/file.file_key'
        //  when we get images from backend, 'file_key' exist in '/file.originFileObj.file_key' 
        setFormDataArtwork({
          ...formDataArtwork  , 
          media : formDataArtwork?.media?.filter((item) => item.file_key !== (file.file_key ? file?.file_key : file?.originFileObj?.file_key )) 
        });
    },

    showUploadList: {
      showDownloadIcon: false,
      downloadIcon: "download ",
      showRemoveIcon: true,
      // removeIcon: <DeleteOutlined onClick={e => handleRemoveUploadImage(e)} />,
    },

    itemRender: (OriginNode, file, fileList, actions) => {

      return [
        OriginNode,
        <div className="default-checkbox-image-upload d-flex justify-content-end ">
          <input
            checked={file?.is_default}
            onClick={(e) => defaultImageHandler(e, (file.file_key ? file?.file_key : file?.originFileObj?.file_key))}
            name="is_default"
            className="ml-1  mt-2"
            type="radio"
          />
          <span className="pb-2 mx-2">پیش‌فرض</span>
        </div>,
      ];
    },

    
    // get media from server(or add media to list) and set 'name' and 'url_image', then show to user
    fileList :  formDataArtwork?.media?.map(item => ({...item , name : item?.file_name , thumbUrl : item?.exact_url ? item?.exact_url : item?.thumbUrl })) ,
  };


  // function for set default image between images that uploaded 
  const defaultImageHandler = (e, id) => {
    // when radio button clicked, 'is_default' attribute of this iamge is true and others is false 
    let newList = formDataArtwork?.media?.map(item => (
        item.file_key === id
        ? { ...item, is_default: true }
        : { ...item, is_default: false }
    ));

    setFormDataArtwork( {...formDataArtwork , media : newList});
  };

  return (
    <React.Fragment>
      <Dragger
        {...propsUpload}
        className="upload-list-inline"
        customRequest={async (e) => {
          const { file, onSuccess, onError } = e;

          await axios
            .post(`${BASE_URL}${PRE_UPLOAD}`, {
              content_type: "image",
            })
            .then((res) => {
              onSuccess({ status: "success" });
              
              file.file_key = res.data.data.result.file_key;

              // create object of data image(and add to list of images) for send to server backend
              let uploadImage;
              uploadImage = {
                file_key: res.data.data.result.file_key,
                media_path: res.data.data.result.upload_url,
                thumbUrl :  URL.createObjectURL(file) ,
                name : file.name,
                file_name : file.name,
                type: "image",
                bucket_name: "image",
                is_default: false,
                uid: file.uid,
                percent: 100
              };


              if (res.data.data.result.upload_url && (file?.type.split("/")[0] === "image")) {

                UploadAxios.put(res.data.data.result.upload_url , file)
                  .then((res) => {

                    // when upload done, object of image add to list of media for send to server backend
                    setFormDataArtwork({...formDataArtwork, media : [...formDataArtwork?.media , uploadImage ]});
                    message.success(` با موفقیت بازگذاری شد.`);
                  })
                  .catch((err) => {
                    console.error(err);
                    onError({ status: "error" });
                    message.error(`بارگذاری  با خطا مواجه شد.`);
                  });

              } else {
                onError({ status: "error" });
              }
            })
            .catch((err) => {
              console.error(err);
              onError({ status: "error" });
            });
        }}
      >
        <p className="ant-upload-drag-icon">
          <PictureOutlined className="img-icon-upload-add-new-artwork" />
        </p>
        <p className="ant-upload-text">تصاویر خود را در اینجا رها کنید</p>
      </Dragger>
    </React.Fragment>
  );
}

export default MultipleUpload;

