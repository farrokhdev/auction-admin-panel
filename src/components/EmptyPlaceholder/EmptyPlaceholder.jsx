import React from 'react'
import { Empty } from 'antd';

function EmptyPlaceholder() {
    return (
        <>

            <div className="d-flex justify-content-center pb-4">
                <Empty description={"حراج‌ فعالی موجود نیست"} />
            </div>
        </>
    )
}

export default EmptyPlaceholder;