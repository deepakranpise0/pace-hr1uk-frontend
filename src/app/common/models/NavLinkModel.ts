import { UserTypeConstant } from '../enum/UserTypeConstant';

export class NavLinksModel {
  public label: string;
  public roles: UserTypeConstant;
  public subItems: NavLinksModel[];
  public icon: string;
  public url: string;

  constructor() {
    this.label = '';
    this.roles = UserTypeConstant.USER;
    this.subItems = [];
    this.icon = '';
    this.url = '';
  }
}
