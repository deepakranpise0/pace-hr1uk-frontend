import { MasterDataType } from '../enum/AppEnum';
import { UserTypeConstant } from '../enum/UserTypeConstant';
import { NavLinksModel } from '../models/NavLinkModel';

export const NavItemsContant: NavLinksModel[] = [
  {
    label: 'Domain',
    roles: UserTypeConstant.ADMIN,
    subItems: [],
    icon: 'domain',
    url: '/master/' + MasterDataType.DOMAIN,
  },
  {
    label: 'Section',
    roles: UserTypeConstant.ADMIN,
    subItems: [],
    icon: 'book',
    url: '/master/' + MasterDataType.SECTION,
  },
  {
    label: 'Assessment Type',
    roles: UserTypeConstant.ADMIN,
    subItems: [],
    icon: 'assessment',
    url: '/master/' + MasterDataType.ASSESSMENT_TYPE,
  },
  {
    label: 'Ratings',
    roles: UserTypeConstant.ADMIN,
    subItems: [],
    icon: 'rate_review',
    url: '/ratings',
  },
  {
    label: 'Questions',
    roles: UserTypeConstant.ADMIN,
    subItems: [],
    icon: 'question_answer',
    url: '/master/' + MasterDataType.QUESTION,
  },
];
