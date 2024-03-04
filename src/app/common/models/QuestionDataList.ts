import { MasterDataList } from './MasterDataList';

export class QuestionDataList extends MasterDataList {
  public sectionId: {
    _id: string,
    name:string
  };

  constructor() {
    super();
    this.sectionId = {
      _id: '',
      name:''
    };
  }
}
