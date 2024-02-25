import { MasterDataList } from "./MasterDataList";

export class QuestionDataList extends MasterDataList {
  public sectionId: string;

  constructor() {
    super();
    this.sectionId = '';
  }
}
