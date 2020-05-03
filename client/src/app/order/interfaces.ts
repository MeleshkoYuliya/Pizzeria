export interface Order {
  name: string
  phone: string
  email: string
  address: string
  flat: number
  floor: number
  payment: string
  pizzas: Array<Pizza>
  totalPrice: number
  sendEmail: string
  sendSms: string
}

interface Pizza {
  name: string
  quantity: number
  cost: number
}