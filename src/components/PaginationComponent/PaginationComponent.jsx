import React from 'react'
import {Pagination} from 'antd';

function PaginationComponent({count , handeSelectPage}) {
    return (
        <React.Fragment>
            <div className="d-none d-sm-flex justify-content-center">
                <Pagination
                    showSizeChanger={false}
                    onChange={(e) => handeSelectPage(e)}
                    defaultCurrent={1}
                    total={count}
                    defaultPageSize={5}/>
            </div>
            <div className="d-flex d-sm-none justify-content-center ">
                <Pagination
                    onChange={(e) => handeSelectPage(e)}
                    defaultCurrent={1}
                    total={count}
                    defaultPageSize={5}
                    size="small"/>
            </div>
        </React.Fragment>
    )
}

export default PaginationComponent;
