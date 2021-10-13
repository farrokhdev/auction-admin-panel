import { Tag } from 'antd';


export function convertTypePersian(value) {
    
    switch (value) {
        case"melli":
            return 'ملی'

        case"user":
            return 'کاربر'
        
        case"admin":
            return 'ادمین'

        case"home_auction":
            return 'خانه حراج'

        case"LIVE":
            return 'زنده'
        
        case"ONLINE":
            return 'آنلاین'
        
        case"PERIODIC":
            return 'زمان‌دار'
            
        case"SECOND_HIDDEN":
            return 'حراج با دومین پیشنهاد قیمت مخفی'
            
        case"HIDDEN":
            return 'حراج با پیشنهاد قیمت مخفی'

        case"PREPARING":
            return 'آماده سازی'

        case"ENROLLMENT":
            return 'ثبت‌نام'
        
        case"ACTIVE":
            return 'فعال'

        case"CLOSED":
            return 'بسته‌شده'       
            
        case"create":
            return 'ایجاد شده' 

        case"pending":
            return 'در حال بررسی'   

        case"accept":
            return 'تایید شده'

        case"reject":
            return 'رد شده'



        default:
            return ''
    }
}


export function messageStatusTypePersian(value) {

    switch(value){
        case 'pending':
            return 'در انتظار پاسخ'
        case 'close':
            return 'بسته شده'
        case 'read':
            return 'پاسخ داده شده'
        case 'unread':
            return 'پاسخ داده شده'
        default:
            return ''
    }
}



export function convertBtnBystateParticipantsAuction(value) {

    switch(value){
        case true:
            return <Tag className="rounded" color="green">تایید شده</Tag>
        case false:
            return <Tag className="rounded" color="magenta">رد شده</Tag>
        case null :
            return <Tag className="rounded" color="#c0bfbf">در حال انتظار</Tag>

        default:
            return ''
    }
}


