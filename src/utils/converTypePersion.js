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
            return 'تناوبی'
            
        case"SECOND_HIDDEN":
            return 'دوم پنهان'
            
        case"HIDDEN":
            return 'پنهان'

        case"PREPARING":
            return 'آماده سازی'

        case"ENROLLMENT":
            return 'ثبت‌نام'
        
        case"ACTIVE":
            return 'فعال'

        case"CLOSED":
            return 'بسته‌شده'



        default:
            return ''
    }
}