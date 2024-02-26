import { UserTypeConstant } from '../enum/UserTypeConstant';

export class UserModel {
  public _id: string;
  public name: string;
  public email: string;

  constructor() {
    this._id = '';
    this.name = '';
    this.email = '';
  }
}
