export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: Address;
}