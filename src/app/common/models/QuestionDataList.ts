import { MasterDataList } from './MasterDataList';

export class QuestionDataList extends MasterDataList {
  constructor() {
    super();
    this.sectionId = {
      _id: '',
      name:''
    };
  }
}
