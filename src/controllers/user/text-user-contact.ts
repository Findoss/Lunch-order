import type { User } from '../../models/user/types';

export const textUserContacts = (users: User[]): string => {
  const MAX_LENGTH_NAME = Math.max(...users.map((user) => user.name.length));

  return users
    .map(({ name, tel, bank }) => {
      const space = new Array(MAX_LENGTH_NAME - name.length + 2).join(' ');
      return `${name}\`${space}\` \`${tel}\`\n${bank}`;
    })
    .join('\n\n');
};
