import { loadScript } from 'src/shared/lib/loadScript';

export class KakaoSdk {
  private static _INSTANCE: KakaoSdk;
  private static sdkInstance: Kakao;
  public static instance() {
    return this._INSTANCE ?? (this._INSTANCE = new KakaoSdk());
  }
  private constructor() {}

  private async load() {
    await loadScript({
      url: 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js',
      integrity: 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4',
      crossOrigin: 'anonymous',
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    KakaoSdk.sdkInstance = window.Kakao;
    KakaoSdk.sdkInstance.init(import.meta.env.VITE_KAKAO_SDK_KEY);
    KakaoSdk.sdkInstance.isInitialized();
  }

  public async shareMessage({ url }: { url: string }) {
    if (!KakaoSdk.sdkInstance) {
      await this.load();
    }
    KakaoSdk.sdkInstance.Share.sendScrap({
      requestUrl: url,
    });
  }
}
