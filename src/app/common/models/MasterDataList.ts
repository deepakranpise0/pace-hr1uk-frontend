import { MasterDataModel } from './MasterDataModel';

export class MasterDataList extends MasterDataModel {
  public _id: string;
  public isActive: boolean;
  email: any;
  public sectionId!: {
    _id: string;
    name: string;
  };
  constructor() {
    super();
    this._id = '';
    this.isActive = true;
  }
}
