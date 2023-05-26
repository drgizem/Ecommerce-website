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

export type Subcategories = {
    id: number;
    name: string;
}

export type CategoryMain = {
    id: number;
    name: string;
    subcategories: Subcategories[];
}

export type Category = {
    id: string;
    name: string;}