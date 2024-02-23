import { MasterDataType } from '../enum/AppEnum';

export class MasterDataModel {
  public name: string;
  public description: string;
  public masterDataType!: MasterDataType;

  constructor() {
    this.name = '';
    this.description = '';
  }
}
