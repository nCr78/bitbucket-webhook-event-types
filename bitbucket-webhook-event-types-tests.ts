import { Bitbucket } from './index';

const user: Bitbucket.User = {
  uuid: 'some-uuid',
  display_name: 'John Doe',
  account_id: '12345',
  nickname: 'johndoe',
  type: 'user',
  links: {
    self: { href: 'https://...' },
    html: { href: 'https://...' },
    avatar: { href: 'https://...' }
  }
};
