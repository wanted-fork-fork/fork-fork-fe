declare interface Kakao {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendScrap: ({ requestUrl: string }) => void;
  };
}

declare const window: {
  Kakao?: Kakao;
};
e