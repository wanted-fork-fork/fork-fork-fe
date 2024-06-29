export type MbtiKey = MbtiFirstWord | MbtiSecondWord | MbtiThirdWord | MbtiFourthWord;

export const MbtiFirstWords = ['E', 'I'];
export const MbtiSecondWords = ['N', 'S'];
export const MbtiThirdWords = ['T', 'F'];
export const MbtiFourthWords = ['J', 'P'];

export type MbtiFirstWord = (typeof MbtiFirstWords)[number];
export type MbtiSecondWord = (typeof MbtiSecondWords)[number];
export type MbtiThirdWord = (typeof MbtiThirdWords)[number];
export type MbtiFourthWord = (typeof MbtiFourthWords)[number];

export type Mbti = `${MbtiFirstWord}${MbtiSecondWord}${MbtiThirdWord}${MbtiFourthWord}`;
export const isValidMbti = (mbti: string): mbti is Mbti => {
  return (
    MbtiFirstWords.includes(mbti[0]) &&
    MbtiSecondWords.includes(mbti[1]) &&
    MbtiThirdWords.includes(mbti[2]) &&
    MbtiFourthWords.includes(mbti[3])
  );
};
