

export type User={
  name:string,
  email:string,
  id:string,
  photoUrl:string,
}
export type CartProduct={
  id:string,
  count:number,
  price:number,
  stock:number,
  title:string,
  image:string,
}
export type NewUser={
  name:string,
  email:string,
  id:string,
  photoUrl:string,
  password:string
}
export type Product = {
  id:string,
  title:string,
  description:string,
  image:string,
  price:number,
  category:number,
  subcategory:number,
  stock:number
}
export type Category = {
  id: string;
  name: string;
}

export type CategoryMain = {
  id: number;
  name: string;
  subcategories: SubCategory[];
}
export type SubCategory = {
  name: string;
}
export type Address={
  userName:string,
  city:string,
  state:string,
  country:string,
  address:string,
  phone:number,
  zipcode:number,
  addressName:string
}