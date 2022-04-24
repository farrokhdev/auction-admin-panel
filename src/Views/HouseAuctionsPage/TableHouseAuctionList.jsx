import React from "react";
import { Link } from "react-router-dom";
import icon_more from "../../images/svg/icon-more.svg";
import momentJalaali from "moment-jalaali";
import { convertTypePersian } from "../../utils/converTypePersion";
import { Menu, Dropdown, Tooltip,Image } from "antd";
import classnames from "classnames";
import EmptyComponent from "../../components/EmptyComponent";
import { DiffFilled } from "@ant-design/icons";
import { handleShowImage } from "../../utils/showImageProduct";


function TableHouseAuctionList({ houseAuctionsList }) {
  const menu = (id, home_auction_name) => (
    <Menu>
      <Menu.Item className="text-center">
        <Link to={`/house-auctions/${id}`}>مشاهده</Link>
      </Menu.Item>
      <Menu.Item className="text-center">
        <Link to={`/house-auctions/auctions/${id}/${home_auction_name}`}>
          حراج‌های فعال
        </Link>
      </Menu.Item>
      <Menu.Item className="text-center">
        <Link to={`/house-auctions-participants/${id}`}>لیست شرکت کنندگان</Link>
      </Menu.Item>
      <Menu.Item className="text-center">
        <Link to={`/house-auctions-applicants/${id}`}>
          لیست درخواست کنندگان
        </Link>
      </Menu.Item>
    </Menu>
  );

  function messageStatusTypePersian(value) {
    switch (value) {
      case "pending":
        return "در حال بررسی";
      case "reject":
        return "رد شده";
      case "accept":
        return "پذیرفته شده";
      case "create":
        return "ثبت شده";
      default:
        return "";
    }
  }


  return (
    <React.Fragment>
      <div collapse className="table-responsive ">
        <table className="table ">
          <thead>
            <tr className="meassage-header-table-title">
              <th
                style={{ minWidth: "3rem" }}
                className=" px-0 minWidth-titleMessage"
              >
                <div className=" px-3 text-center">ردیف</div>
              </th>
              <th className=" px-0 minWidth-row" style={{ minWidth: "3rem" }}>
                            <div className=" px-3 text-center">تصویر</div>
                        </th>
              <th
                style={{ minWidth: "10rem" }}
                className="  px-0 minWidth-DateMessage"
              >
                <div className=" px-3 text-center">نام</div>
              </th>

              <th
                style={{ minWidth: "10rem" }}
                className="  px-0 minWidth-status-messageRead"
              >
                <div className=" px-3 text-center">نام خانه حراج</div>
              </th>

              <th
                style={{ minWidth: "12rem" }}
                className="  px-0 minWidth-status-messageRead"
              >
                <div className=" px-3 text-center">ایمیل</div>
              </th>

              <th
                style={{ minWidth: "8rem" }}
                className="  px-0 minWidth-status-messageRead"
              >
                <div className=" px-3 text-center">شماره تماس</div>
              </th>

              <th
                style={{ minWidth: "5rem" }}
                className="  px-0 minWidth-status"
              >
                <div className=" px-3 text-center">وضعیت</div>
              </th>
              <th
                style={{ minWidth: "5rem" }}
                className="  px-0 minWidth-status"
              >
                <div className=" px-3 text-center">ویرایش خانه حراج</div>
              </th>

              <th
                style={{ minWidth: "5rem" }}
                className="  px-0 minWidth-status-messageRead"
              >
                <div className="px-3 text-center">عملیات</div>
              </th>
            </tr>
          </thead>

          <tbody>
            {houseAuctionsList?.length ? (
              houseAuctionsList.map((houseAuction, index) => {


                const fullname =
                  houseAuction?.first_name + " " + houseAuction?.last_name;
                return (
                  <React.Fragment key={houseAuction?.id}>
                    <tr className="spaceRow row-messages">
                      <td className="">
                        <div className="my-2 content-td">
                          <div className="text-center">{++index}</div>
                        </div>
                      </td>
                      <td   className="">
                                <div  className="my-2 content-td" >
                                    <div className="text-center">
                                    <Image
                                        style={{width : '40px' , height : '30px' , cursor : 'pointer'}}
                                        className="box-image-product-list"
                                        width={40}
                                        // preview ={houseAuction?.media ? houseAuction?.media[0]?.exact_url : ''}

                                        // src={houseAuction?.media ? houseAuction?.media[0]?.exact_url : ''}
                                        src={houseAuction?.media && houseAuction?.media[0]?.exact_url || handleShowImage(houseAuction)}
                                    />
                                        {/* <img  src={artwork?.media?.exact_url} alt="image_product" /> */}
                                    </div>
                                </div>
                            </td>
                      <td className="">
                        <div className="my-2 content-td">
                          <div className=" text-center">
                            {fullname.length > 18 ? fullname.slice(0,18) + "..." : fullname }
                          </div>
                        </div>
                      </td>
                      <td className="">
                        <div className=" ">
                          <div className="my-2 content-td">
                            <div className=" text-center">
                              {houseAuction?.home_auction_name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="">
                        <div className=" my-2 content-td">
                          <div className=" w-100 text-center">
                            {houseAuction?.email
                              ? houseAuction?.email
                              : "mail@gmail.com"}
                          </div>
                        </div>
                      </td>

                      <td className="">
                        <div className="my-2 content-td">
                          <div className=" w-100 text-center">
                            {houseAuction?.mobile}
                          </div>
                        </div>
                      </td>

                      <td className="">
                        <div
                          className={classnames("my-2", "content-td", {
                            "text-state-pending":
                              houseAuction?.home_auction_request === "pending",
                            "text-state-fail":
                              houseAuction?.home_auction_request === "reject",
                            "text-state-done":
                              houseAuction?.home_auction_request === "accept",
                            "text-state-submit":
                              houseAuction?.home_auction_request === "create",
                          })}
                        >
                          {houseAuction?.home_auction_request
                            ? messageStatusTypePersian(
                                houseAuction?.home_auction_request
                              )
                            : ""}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="my-2 content-td d-flex justify-content-around">
                          <Link
                            // onClick={() => dispatch(removeAUCTION())}
                            to={
                              houseAuction?.status == "PREPARING"
                                ? `/add-new-auction/${houseAuction?.id}`
                                : `/house-auctions/${houseAuction?.id}`
                            }
                            type="button"
                          >
                            <Tooltip
                              placement="rightTop"
                              title={
                                houseAuction?.status === "PREPARING"
                                  ? "ویرایش در حراجی"
                                  : "امکان ویرایش حراج وجود ندارد"
                              }
                              color={"pink"}
                            >
                              <DiffFilled className="icon-add" />
                            </Tooltip>
                          </Link>
                        </div>
                      </td>

                      <td className=" text-center">
                        <div className="my-2 content-td">
                          <Dropdown
                            overlay={menu(
                              houseAuction?.id,
                              houseAuction?.home_auction_name
                            )}
                          >
                            <a className="">
                              <img src={icon_more} alt="" />
                              {/* <DownOutlined/> */}
                            </a>
                          </Dropdown>
                          {/* <button onClick={()=>handleClickShowDetailsMessage(ticket?.id) }>جزییات</button> */}
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })
            ) : (
              <div className="d-flex text-center w-100"></div>
            )}
          </tbody>
        </table>

        {!houseAuctionsList?.length && (
          <EmptyComponent text="درخواستی برای این خانه حراجی ثبت نشده است" />
        )}
      </div>
    </React.Fragment>
  );
}

export default TableHouseAuctionList;
