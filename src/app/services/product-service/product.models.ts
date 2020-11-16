export interface IProduct {
    _id?: string;
    name: string;
    type: string;
    image: string;
    price: number;
    quantity: number;
  }
  
  export class Product implements IProduct {
    constructor(
      public name: string,
      public type: string,
      public image: string,
      public price: number,
      public quantity: number,
      public _id?: string
    ) {
      this._id = _id ? _id : null;
      this.name = name;
      this.type = type;
      this.image = image;
      this.price = price;
      this.quantity = quantity;
    }
  }