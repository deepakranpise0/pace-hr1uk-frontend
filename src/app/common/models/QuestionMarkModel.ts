import { MasterDataList } from './MasterDataList';
import { QuestionDataList } from './QuestionDataList';

export class QuestionMarkModel extends QuestionDataList {
  public isSelected: boolean;

  constructor() {
    super();
    this.isSelected = false;
  }
}
