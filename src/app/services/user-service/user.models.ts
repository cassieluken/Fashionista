export interface IUser {
    _id?: string;
    name: string;
    pw?: string;
    role: string;
  }
  
  export class User implements IUser {
    constructor(
      public name: string,
      public role: string,
      public pw?: string,
      public _id?: string
    ) {
      this._id = _id ? _id : null;
      this.name = name;
      this.role = role;
      this.pw = pw ? pw : null;
    }
  }