import React from 'react';
import {Empty} from 'antd';

function EmptyComponent({text}) {
    return (
      
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{height: 40}}
            description={
                <span>
                   {text}
                </span>
            }
        />
    
    )
}

export default EmptyComponent;
