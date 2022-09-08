export const escape = (str: string) => {
  const chars = [
    // '*',
    '_',
    '[',
    ']',
    '(',
    ')',
    '~',
    '>',
    '#',
    '+',
    '-',
    '=',
    '|',
    '{',
    '}',
    '.',
    '!',
  ];

  chars.forEach((char) => {
    str = str.replaceAll(char, `\\${char}`);
  });

  return str;
};
