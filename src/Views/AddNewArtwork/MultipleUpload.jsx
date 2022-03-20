import React from "react";
import { Upload, message } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { BASE_URL } from '../../utils';
import {PRE_UPLOAD} from '../../utils/constant';
import axios from '../../utils/request';
import UploadAxios from "../../utils/uploadRequest";

const { Dragger } = Upload;

function MultipleUpload(props) {

  // props data Required 
  const {uploadList , setUploadList} = props

  // drager uploader config data 
  const propsUpload = {
    listType: "picture",

    onChange(info) {

      console.log(info)
      const { status } = info.file;
      if (status !== "uploading") {

      }
      if (status === "done") {

      } else if (status === "error") {
        info.fileList.filter((item) => item.uid !== info.file.uid);
        //if status error, image not added to list upload 
        setUploadList(uploadList.filter((item) => item.uid !== info.file.uid));
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
      setUploadList(uploadList.filter((item) => item.uid !== file.uid));
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
        <div className="default-checkbox-image-upload d-flex justify-content-end">
          <input
            onClick={(e) => defaultImageHandler(e, file.uid)}
            name="is_default"
            className="ml-1  mt-2"
            type="radio"
          />
          <span className="pb-2 ml-2">پیش‌فرض</span>
        </div>,
      ];
    },
  };

  // function for set default image between images that uploaded
  const defaultImageHandler = (e, uid) => {
    let newList = uploadList?.map((item) =>
      item.uid === uid
        ? { ...item, is_default: true }
        : { ...item, is_default: false }
    );

    setUploadList(newList);
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

              let uploadImage;
              
              uploadImage = {
                file_key: res.data.data.result.file_key,
                media_path: res.data.data.result.upload_url,
                type: "image",
                bucket_name: "image",
                is_default: false,
                uid: file.uid,
              };

              if (
                res.data.data.result.upload_url && (file?.type.split("/")[0] === "image")
              ) {
                UploadAxios.put(res.data.data.result.upload_url, file)
                  .then((res) => {
                    setUploadList([...uploadList, uploadImage]);
                    message.success(` با موفقیت بازگذاری شد.`);
                  })
                  .catch((err) => {
                    console.error(err);
                    onError({ status: "error" });
                    message.error(`بارگذاری  با خطا مواجه شد.`);
                  });
              } else {
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
