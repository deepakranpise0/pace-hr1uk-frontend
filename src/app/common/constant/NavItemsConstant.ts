import { UserTypeConstant } from '../enum/UserTypeConstant';
import { NavLinksModel } from '../models/NavLinkModel';

export const NavItemsContant: NavLinksModel[] = [
  {
    label: 'Domain',
    roles: [UserTypeConstant.ADMIN],
    subItems: [],
    icon: 'domain',
    url: '/',
  },
  {
    label: 'Section',
    roles: [UserTypeConstant.ADMIN],
    subItems: [],
    icon: 'book',
    url: '/',
  },
  {
    label: 'Questions',
    roles: [UserTypeConstant.ADMIN],
    subItems: [],
    icon: 'question_answer',
    url: '/',
  },
];
