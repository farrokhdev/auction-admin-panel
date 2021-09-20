module.exports={
    REQUESTS_HOUSE_AUCTION:"/panel/request/",
    GET_TICKETS: "/panel/ticket/",
    ADD_AUCTION:"/sale/auctions/",
    DETAIL_AUCTION:id=>`/sale/auctions/${id}/`,
    EDIT_AUCTION:id=>`/sale/auctions/${id}/`,
    EDIT_PROFILE:"/account/profile/",
    LIST_PRODUCTS:"/sale/product/",
    LIST_AUCTIONS:"/sale/auctions/",
    LIST_HOUSE_AUCTIONS:"/account/home-auction/",
    UPLOAD_EXEL_AUCTION:name=>`/sale/upload/${name}/`,
    DELETE_AUCTION:id=>`/sale/auctions/${id}/`,
    ACCEPT_WITHDRAWAL : id =>  `/accounting/transaction/${id}/approve/`,
    REJECT_WITHDRAWAL : id =>  `/accounting/transaction/${id}/reject/`
}