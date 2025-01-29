

export type UserType = 'USER' | 'ADMIN' | 'GOD'
export type SortOrder = 'ASC' | 'DESC'
// export type ReportStatus = 'PREPARING' 
export type AdType = 'PREPARING'
export type ViolationType = 'INAPPROPRIATE_CONTENT' | 'OTHER_VIOLATION_TYPES'
export type ReportStatus = 'SUBMITTED' | 'APPROVED' | 'REJECTED'


export type User = {
    id: number
    address?: string
    first_name: string
    last_name: string
    username?: string
    phone_number: string
    restaurant_name?: string
}

export type Price = {
    amount: number
    unit: string
}

