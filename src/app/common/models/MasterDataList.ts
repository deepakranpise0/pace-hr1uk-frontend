import { MasterDataType } from '../enum/AppEnum';
import { MasterDataModel } from './MasterDataModel';

export class MasterDataList extends MasterDataModel {
  public _id: string;
  public isActive: boolean;

  constructor() {
    super();
    this._id = '';
    this.isActive = true;
  }
}
