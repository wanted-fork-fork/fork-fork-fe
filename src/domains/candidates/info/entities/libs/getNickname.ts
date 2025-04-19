import { nicknames } from 'src/domains/candidates/info/entities/constants/nicknames';

export const getNickname = (key: string) => {
  const idx =
    Array.from(key)
      .slice(0, 5)
      .reduce((acc, cur) => {
        const char = cur.charCodeAt(0);
        const temp = (acc << 5) - acc + char;
        return temp & temp;
      }, 0) % nicknames.length;
  return nicknames[idx];
};
