/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * GOOGOO API
 * GOOGOO API Documentation
 * OpenAPI spec version: 0.0.1
 */
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
export type LoginKakaoParams = {
code: string;
};

export type UploadImageBody = {
  image: Blob;
};

export type SaveInfoParams = {
linkKey: string;
};

export type TownDtoTown = typeof TownDtoTown[keyof typeof TownDtoTown];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TownDtoTown = {
  GANGNAM: 'GANGNAM',
  GANGDONG: 'GANGDONG',
  GANGBUK: 'GANGBUK',
  GANGSEO: 'GANGSEO',
  GWANAK: 'GWANAK',
  GWANGJIN: 'GWANGJIN',
  GURO: 'GURO',
  GEUMCHEON: 'GEUMCHEON',
  NOWON: 'NOWON',
  DOBONG: 'DOBONG',
  DONGDAEMUN: 'DONGDAEMUN',
  DONGJAK: 'DONGJAK',
  MAPO: 'MAPO',
  SEODAEMUN: 'SEODAEMUN',
  SEOCHO: 'SEOCHO',
  SEONGDONG: 'SEONGDONG',
  SEONGBUK: 'SEONGBUK',
  SONGPA: 'SONGPA',
  YANGCHEON: 'YANGCHEON',
  YEONGDEUNGPO: 'YEONGDEUNGPO',
  YONGSAN: 'YONGSAN',
  EUNPYEONG: 'EUNPYEONG',
  JONGNO: 'JONGNO',
  SEOUL_JUNG: 'SEOUL_JUNG',
  JUNGRANG: 'JUNGRANG',
  GAPYEONG: 'GAPYEONG',
  GOYANG: 'GOYANG',
  GWACHEON: 'GWACHEON',
  GWANGMYEONG: 'GWANGMYEONG',
  GWANGJU: 'GWANGJU',
  GURI: 'GURI',
  GUNPO: 'GUNPO',
  GIMPO: 'GIMPO',
  NAMYANGJU: 'NAMYANGJU',
  DONGDUCHEON: 'DONGDUCHEON',
  BUCHEON: 'BUCHEON',
  SEONGNAM: 'SEONGNAM',
  SUWON: 'SUWON',
  SIHEUNG: 'SIHEUNG',
  ANSAN: 'ANSAN',
  ANSEONG: 'ANSEONG',
  ANYANG: 'ANYANG',
  YANGJU: 'YANGJU',
  YANGPYEONG: 'YANGPYEONG',
  YEOJU: 'YEOJU',
  YEONCHEON: 'YEONCHEON',
  OSAN: 'OSAN',
  YONGIN: 'YONGIN',
  UIWANG: 'UIWANG',
  UIJEONGBU: 'UIJEONGBU',
  ICHEON: 'ICHEON',
  PAJU: 'PAJU',
  PYEONGTAEK: 'PYEONGTAEK',
  POCHEON: 'POCHEON',
  HANAM: 'HANAM',
  HWASEONG: 'HWASEONG',
  GANGHWA: 'GANGHWA',
  GYEYANG: 'GYEYANG',
  NAMDONG: 'NAMDONG',
  INCHEON_DONG: 'INCHEON_DONG',
  MICHUHOL: 'MICHUHOL',
  BUPYEONG: 'BUPYEONG',
  SEO: 'SEO',
  YEONSU: 'YEONSU',
  ONGJIN: 'ONGJIN',
  INCHEON_JUNG: 'INCHEON_JUNG',
  DAEDEOK: 'DAEDEOK',
  DAEJEON_DONG: 'DAEJEON_DONG',
  DAEJEON_SEO: 'DAEJEON_SEO',
  YUSEONG: 'YUSEONG',
  DAEJEON_JUNG: 'DAEJEON_JUNG',
  BUSAN_GANGSEO: 'BUSAN_GANGSEO',
  GEUMJEONG: 'GEUMJEONG',
  GIJANG: 'GIJANG',
  BUSAN_NAM: 'BUSAN_NAM',
  BUSAN_DONG: 'BUSAN_DONG',
  DONGNAE: 'DONGNAE',
  BUSANJIN: 'BUSANJIN',
  BUSAN_BUK: 'BUSAN_BUK',
  SASANG: 'SASANG',
  SAHA: 'SAHA',
  BUSAN_SEO: 'BUSAN_SEO',
  SUYEONG: 'SUYEONG',
  YEONJE: 'YEONJE',
  YEONGDO: 'YEONGDO',
  BUSAN_JUNG: 'BUSAN_JUNG',
  HAEUNDAE: 'HAEUNDAE',
  ULSAN_NAM: 'ULSAN_NAM',
  ULSAN_DONG: 'ULSAN_DONG',
  ULSAN_BUK: 'ULSAN_BUK',
  ULJU: 'ULJU',
  ULSAN_JUNG: 'ULSAN_JUNG',
  GWANGSAN: 'GWANGSAN',
  GWANGJU_NAM: 'GWANGJU_NAM',
  GWANGJU_DONG: 'GWANGJU_DONG',
  GWANGJU_BUK: 'GWANGJU_BUK',
  GWANGJU_SEO: 'GWANGJU_SEO',
  GANGNEUNG: 'GANGNEUNG',
  GOSEONG: 'GOSEONG',
  DONGHAE: 'DONGHAE',
  SAMCHEOK: 'SAMCHEOK',
  SOKCHO: 'SOKCHO',
  YANGGU: 'YANGGU',
  YANGYANG: 'YANGYANG',
  YEONGWOL: 'YEONGWOL',
  WONJU: 'WONJU',
  INJE: 'INJE',
  JEONGSEON: 'JEONGSEON',
  CHEORWON: 'CHEORWON',
  CHUNCHEON: 'CHUNCHEON',
  TAEBAEK: 'TAEBAEK',
  PYEONGCHANG: 'PYEONGCHANG',
  HONGCHEON: 'HONGCHEON',
  HWACHEON: 'HWACHEON',
  HOENGSEONG: 'HOENGSEONG',
  SEJONG: 'SEJONG',
  GOESAN: 'GOESAN',
  DANYANG: 'DANYANG',
  BOEUN: 'BOEUN',
  YEONGDONG: 'YEONGDONG',
  OKCHEON: 'OKCHEON',
  EUMSEONG: 'EUMSEONG',
  JECHEON: 'JECHEON',
  JEUNGPYEONG: 'JEUNGPYEONG',
  JINCHEON: 'JINCHEON',
  CHEONGJU: 'CHEONGJU',
  CHUNGJU: 'CHUNGJU',
  GYERYONG: 'GYERYONG',
  GONGJU: 'GONGJU',
  GEUMSAN: 'GEUMSAN',
  NONSAN: 'NONSAN',
  DANGJIN: 'DANGJIN',
  BORYEONG: 'BORYEONG',
  BUYEO: 'BUYEO',
  SEOSAN: 'SEOSAN',
  SEOCHON: 'SEOCHON',
  ASAN: 'ASAN',
  YEONGI: 'YEONGI',
  YESAN: 'YESAN',
  CHEONAN: 'CHEONAN',
  CHEONGYANG: 'CHEONGYANG',
  TAEAN: 'TAEAN',
  HONGSEONG: 'HONGSEONG',
  GYEONGSAN: 'GYEONGSAN',
  GYEONGJU: 'GYEONGJU',
  GORYEONG: 'GORYEONG',
  GUMI: 'GUMI',
  GIMCHEON: 'GIMCHEON',
  MUNGYEONG: 'MUNGYEONG',
  BONGHWA: 'BONGHWA',
  SANGJU: 'SANGJU',
  SEONGJU: 'SEONGJU',
  ANDONG: 'ANDONG',
  YEONGDEOK: 'YEONGDEOK',
  YEONGYANG: 'YEONGYANG',
  YEONGJU: 'YEONGJU',
  YEONGCHEON: 'YEONGCHEON',
  YECHUN: 'YECHUN',
  ULLUNG: 'ULLUNG',
  ULJIN: 'ULJIN',
  UISEONG: 'UISEONG',
  CHEONGDO: 'CHEONGDO',
  CHEONGSONG: 'CHEONGSONG',
  CHILGOK: 'CHILGOK',
  POHANG: 'POHANG',
  GEOJE: 'GEOJE',
  GEOCHANG: 'GEOCHANG',
  GOSEONG_GN: 'GOSEONG_GN',
  GIMHAE: 'GIMHAE',
  NAMHAE: 'NAMHAE',
  MIRYANG: 'MIRYANG',
  SACHEON: 'SACHEON',
  SANCHEONG: 'SANCHEONG',
  YANGSAN: 'YANGSAN',
  UIRYEONG: 'UIRYEONG',
  JINJU: 'JINJU',
  CHANGNYEONG: 'CHANGNYEONG',
  CHANGWON: 'CHANGWON',
  TONGYEONG: 'TONGYEONG',
  HADONG: 'HADONG',
  HAMAN: 'HAMAN',
  HAMYANG: 'HAMYANG',
  HAPCHEON: 'HAPCHEON',
  GOCHANG: 'GOCHANG',
  GUNSAN: 'GUNSAN',
  GIMJE: 'GIMJE',
  NAMWON: 'NAMWON',
  MUJU: 'MUJU',
  BUAN: 'BUAN',
  SUNCHANG: 'SUNCHANG',
  WANJU: 'WANJU',
  IKSAN: 'IKSAN',
  IMSIL: 'IMSIL',
  JANGSU: 'JANGSU',
  JEONJU: 'JEONJU',
  JEONGEUP: 'JEONGEUP',
  JINAN: 'JINAN',
  GANGJIN: 'GANGJIN',
  GOHEUNG: 'GOHEUNG',
  GOKSEONG: 'GOKSEONG',
  GWANGYANG: 'GWANGYANG',
  GURYE: 'GURYE',
  NAJU: 'NAJU',
  DAMYANG: 'DAMYANG',
  MOKPO: 'MOKPO',
  MUAN: 'MUAN',
  BOSEONG: 'BOSEONG',
  SUNCHEON: 'SUNCHEON',
  SINAN: 'SINAN',
  YEOSU: 'YEOSU',
  YEONGGWANG: 'YEONGGWANG',
  YEONGAM: 'YEONGAM',
  WANDO: 'WANDO',
  JANGSEONG: 'JANGSEONG',
  JANGHEUNG: 'JANGHEUNG',
  JINDO: 'JINDO',
  HAMPYEONG: 'HAMPYEONG',
  HAENAM: 'HAENAM',
  HWASUN: 'HWASUN',
  JEJU: 'JEJU',
  SEOGWIPO: 'SEOGWIPO',
  GUNWEE: 'GUNWEE',
  DAEGU_NAM: 'DAEGU_NAM',
  DALSEO: 'DALSEO',
  DALSEONG: 'DALSEONG',
  DAEGU_DONG: 'DAEGU_DONG',
  DAEGU_BUK: 'DAEGU_BUK',
  DAEGU_SEO: 'DAEGU_SEO',
  SUSEONG: 'SUSEONG',
  DAEGU_JUNG: 'DAEGU_JUNG',
} as const;

export interface TownDto {
  town: TownDtoTown;
  townName: string;
}

export type CityDtoCity = typeof CityDtoCity[keyof typeof CityDtoCity];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CityDtoCity = {
  SEOUL: 'SEOUL',
  GYEONGGI: 'GYEONGGI',
  INCHEON: 'INCHEON',
  DAEJEON: 'DAEJEON',
  DAEGU: 'DAEGU',
  BUSAN: 'BUSAN',
  ULSAN: 'ULSAN',
  GWANGJU: 'GWANGJU',
  GANGWON: 'GANGWON',
  SEJONG: 'SEJONG',
  CHUNGCHEONGNAM: 'CHUNGCHEONGNAM',
  CHUNGCHEONGBUK: 'CHUNGCHEONGBUK',
  GYEONGSANGNAM: 'GYEONGSANGNAM',
  GYEONGSANGBUK: 'GYEONGSANGBUK',
  JEOLANAM: 'JEOLANAM',
  JEOLABUK: 'JEOLABUK',
  JEJU: 'JEJU',
} as const;

export interface CityDto {
  city: CityDtoCity;
  cityName: string;
}

export interface CityAndTownResponse {
  city: CityDto;
  town: TownDto[];
}

export type ArchivedInfoResponseMbti = typeof ArchivedInfoResponseMbti[keyof typeof ArchivedInfoResponseMbti];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ArchivedInfoResponseMbti = {
  ENFP: 'ENFP',
  ENFJ: 'ENFJ',
  ENTJ: 'ENTJ',
  ENTP: 'ENTP',
  ESFJ: 'ESFJ',
  ESFP: 'ESFP',
  ESTJ: 'ESTJ',
  ESTP: 'ESTP',
  INFJ: 'INFJ',
  INFP: 'INFP',
  INTJ: 'INTJ',
  INTP: 'INTP',
  ISFJ: 'ISFJ',
  ISFP: 'ISFP',
  ISTJ: 'ISTJ',
  ISTP: 'ISTP',
} as const;

export type ArchivedInfoResponseGender = typeof ArchivedInfoResponseGender[keyof typeof ArchivedInfoResponseGender];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ArchivedInfoResponseGender = {
  MALE: 'MALE',
  FEAMLE: 'FEAMLE',
} as const;

export interface ArchivedInfoResponse {
  birthDate: string;
  drinking: string;
  gender: ArchivedInfoResponseGender;
  height: number;
  hobbies: string[];
  id?: string;
  job: Job;
  location: Location;
  mbti: ArchivedInfoResponseMbti;
  name: string;
  religion: Religion;
  smoking: Smoking;
}

export interface LinkStatusResponse {
  isOpen: boolean;
  linkId: string;
  linkKey: string;
}

export interface ValidateLinkResponse {
  isValid: boolean;
  linkId: string;
}

export interface UserTokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}

export interface ImageDto {
  imageId: string;
  url: string;
}

export type UserInfoRequestMbti = typeof UserInfoRequestMbti[keyof typeof UserInfoRequestMbti];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserInfoRequestMbti = {
  ENFP: 'ENFP',
  ENFJ: 'ENFJ',
  ENTJ: 'ENTJ',
  ENTP: 'ENTP',
  ESFJ: 'ESFJ',
  ESFP: 'ESFP',
  ESTJ: 'ESTJ',
  ESTP: 'ESTP',
  INFJ: 'INFJ',
  INFP: 'INFP',
  INTJ: 'INTJ',
  INTP: 'INTP',
  ISFJ: 'ISFJ',
  ISFP: 'ISFP',
  ISTJ: 'ISTJ',
  ISTP: 'ISTP',
} as const;

export type UserInfoRequestGender = typeof UserInfoRequestGender[keyof typeof UserInfoRequestGender];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserInfoRequestGender = {
  MALE: 'MALE',
  FEAMLE: 'FEAMLE',
} as const;

export interface SaveInfoRequest {
  idealPartner: IdealPartnerRequest;
  userInfo: UserInfoRequest;
}

export type SmokingSmokingCategory = typeof SmokingSmokingCategory[keyof typeof SmokingSmokingCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SmokingSmokingCategory = {
  NON_SMOKER: 'NON_SMOKER',
  SMOKER: 'SMOKER',
  ETC: 'ETC',
} as const;

export interface Smoking {
  smokingAmount?: string;
  smokingCategory: SmokingSmokingCategory;
}

export type ReligionReligionCategory = typeof ReligionReligionCategory[keyof typeof ReligionReligionCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ReligionReligionCategory = {
  CHRISTIANITY: 'CHRISTIANITY',
  CATHOLICISM: 'CATHOLICISM',
  BUDDHISM: 'BUDDHISM',
  ETC: 'ETC',
} as const;

export interface Religion {
  religionCategory: ReligionReligionCategory;
  religionName?: string;
}

export interface NumberRange {
  max: number;
  min: number;
}

export interface Movie {
  cause: string;
  movieName: string;
}

export type LocationTownsItem = typeof LocationTownsItem[keyof typeof LocationTownsItem];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LocationTownsItem = {
  GANGNAM: 'GANGNAM',
  GANGDONG: 'GANGDONG',
  GANGBUK: 'GANGBUK',
  GANGSEO: 'GANGSEO',
  GWANAK: 'GWANAK',
  GWANGJIN: 'GWANGJIN',
  GURO: 'GURO',
  GEUMCHEON: 'GEUMCHEON',
  NOWON: 'NOWON',
  DOBONG: 'DOBONG',
  DONGDAEMUN: 'DONGDAEMUN',
  DONGJAK: 'DONGJAK',
  MAPO: 'MAPO',
  SEODAEMUN: 'SEODAEMUN',
  SEOCHO: 'SEOCHO',
  SEONGDONG: 'SEONGDONG',
  SEONGBUK: 'SEONGBUK',
  SONGPA: 'SONGPA',
  YANGCHEON: 'YANGCHEON',
  YEONGDEUNGPO: 'YEONGDEUNGPO',
  YONGSAN: 'YONGSAN',
  EUNPYEONG: 'EUNPYEONG',
  JONGNO: 'JONGNO',
  SEOUL_JUNG: 'SEOUL_JUNG',
  JUNGRANG: 'JUNGRANG',
  GAPYEONG: 'GAPYEONG',
  GOYANG: 'GOYANG',
  GWACHEON: 'GWACHEON',
  GWANGMYEONG: 'GWANGMYEONG',
  GWANGJU: 'GWANGJU',
  GURI: 'GURI',
  GUNPO: 'GUNPO',
  GIMPO: 'GIMPO',
  NAMYANGJU: 'NAMYANGJU',
  DONGDUCHEON: 'DONGDUCHEON',
  BUCHEON: 'BUCHEON',
  SEONGNAM: 'SEONGNAM',
  SUWON: 'SUWON',
  SIHEUNG: 'SIHEUNG',
  ANSAN: 'ANSAN',
  ANSEONG: 'ANSEONG',
  ANYANG: 'ANYANG',
  YANGJU: 'YANGJU',
  YANGPYEONG: 'YANGPYEONG',
  YEOJU: 'YEOJU',
  YEONCHEON: 'YEONCHEON',
  OSAN: 'OSAN',
  YONGIN: 'YONGIN',
  UIWANG: 'UIWANG',
  UIJEONGBU: 'UIJEONGBU',
  ICHEON: 'ICHEON',
  PAJU: 'PAJU',
  PYEONGTAEK: 'PYEONGTAEK',
  POCHEON: 'POCHEON',
  HANAM: 'HANAM',
  HWASEONG: 'HWASEONG',
  GANGHWA: 'GANGHWA',
  GYEYANG: 'GYEYANG',
  NAMDONG: 'NAMDONG',
  INCHEON_DONG: 'INCHEON_DONG',
  MICHUHOL: 'MICHUHOL',
  BUPYEONG: 'BUPYEONG',
  SEO: 'SEO',
  YEONSU: 'YEONSU',
  ONGJIN: 'ONGJIN',
  INCHEON_JUNG: 'INCHEON_JUNG',
  DAEDEOK: 'DAEDEOK',
  DAEJEON_DONG: 'DAEJEON_DONG',
  DAEJEON_SEO: 'DAEJEON_SEO',
  YUSEONG: 'YUSEONG',
  DAEJEON_JUNG: 'DAEJEON_JUNG',
  BUSAN_GANGSEO: 'BUSAN_GANGSEO',
  GEUMJEONG: 'GEUMJEONG',
  GIJANG: 'GIJANG',
  BUSAN_NAM: 'BUSAN_NAM',
  BUSAN_DONG: 'BUSAN_DONG',
  DONGNAE: 'DONGNAE',
  BUSANJIN: 'BUSANJIN',
  BUSAN_BUK: 'BUSAN_BUK',
  SASANG: 'SASANG',
  SAHA: 'SAHA',
  BUSAN_SEO: 'BUSAN_SEO',
  SUYEONG: 'SUYEONG',
  YEONJE: 'YEONJE',
  YEONGDO: 'YEONGDO',
  BUSAN_JUNG: 'BUSAN_JUNG',
  HAEUNDAE: 'HAEUNDAE',
  ULSAN_NAM: 'ULSAN_NAM',
  ULSAN_DONG: 'ULSAN_DONG',
  ULSAN_BUK: 'ULSAN_BUK',
  ULJU: 'ULJU',
  ULSAN_JUNG: 'ULSAN_JUNG',
  GWANGSAN: 'GWANGSAN',
  GWANGJU_NAM: 'GWANGJU_NAM',
  GWANGJU_DONG: 'GWANGJU_DONG',
  GWANGJU_BUK: 'GWANGJU_BUK',
  GWANGJU_SEO: 'GWANGJU_SEO',
  GANGNEUNG: 'GANGNEUNG',
  GOSEONG: 'GOSEONG',
  DONGHAE: 'DONGHAE',
  SAMCHEOK: 'SAMCHEOK',
  SOKCHO: 'SOKCHO',
  YANGGU: 'YANGGU',
  YANGYANG: 'YANGYANG',
  YEONGWOL: 'YEONGWOL',
  WONJU: 'WONJU',
  INJE: 'INJE',
  JEONGSEON: 'JEONGSEON',
  CHEORWON: 'CHEORWON',
  CHUNCHEON: 'CHUNCHEON',
  TAEBAEK: 'TAEBAEK',
  PYEONGCHANG: 'PYEONGCHANG',
  HONGCHEON: 'HONGCHEON',
  HWACHEON: 'HWACHEON',
  HOENGSEONG: 'HOENGSEONG',
  SEJONG: 'SEJONG',
  GOESAN: 'GOESAN',
  DANYANG: 'DANYANG',
  BOEUN: 'BOEUN',
  YEONGDONG: 'YEONGDONG',
  OKCHEON: 'OKCHEON',
  EUMSEONG: 'EUMSEONG',
  JECHEON: 'JECHEON',
  JEUNGPYEONG: 'JEUNGPYEONG',
  JINCHEON: 'JINCHEON',
  CHEONGJU: 'CHEONGJU',
  CHUNGJU: 'CHUNGJU',
  GYERYONG: 'GYERYONG',
  GONGJU: 'GONGJU',
  GEUMSAN: 'GEUMSAN',
  NONSAN: 'NONSAN',
  DANGJIN: 'DANGJIN',
  BORYEONG: 'BORYEONG',
  BUYEO: 'BUYEO',
  SEOSAN: 'SEOSAN',
  SEOCHON: 'SEOCHON',
  ASAN: 'ASAN',
  YEONGI: 'YEONGI',
  YESAN: 'YESAN',
  CHEONAN: 'CHEONAN',
  CHEONGYANG: 'CHEONGYANG',
  TAEAN: 'TAEAN',
  HONGSEONG: 'HONGSEONG',
  GYEONGSAN: 'GYEONGSAN',
  GYEONGJU: 'GYEONGJU',
  GORYEONG: 'GORYEONG',
  GUMI: 'GUMI',
  GIMCHEON: 'GIMCHEON',
  MUNGYEONG: 'MUNGYEONG',
  BONGHWA: 'BONGHWA',
  SANGJU: 'SANGJU',
  SEONGJU: 'SEONGJU',
  ANDONG: 'ANDONG',
  YEONGDEOK: 'YEONGDEOK',
  YEONGYANG: 'YEONGYANG',
  YEONGJU: 'YEONGJU',
  YEONGCHEON: 'YEONGCHEON',
  YECHUN: 'YECHUN',
  ULLUNG: 'ULLUNG',
  ULJIN: 'ULJIN',
  UISEONG: 'UISEONG',
  CHEONGDO: 'CHEONGDO',
  CHEONGSONG: 'CHEONGSONG',
  CHILGOK: 'CHILGOK',
  POHANG: 'POHANG',
  GEOJE: 'GEOJE',
  GEOCHANG: 'GEOCHANG',
  GOSEONG_GN: 'GOSEONG_GN',
  GIMHAE: 'GIMHAE',
  NAMHAE: 'NAMHAE',
  MIRYANG: 'MIRYANG',
  SACHEON: 'SACHEON',
  SANCHEONG: 'SANCHEONG',
  YANGSAN: 'YANGSAN',
  UIRYEONG: 'UIRYEONG',
  JINJU: 'JINJU',
  CHANGNYEONG: 'CHANGNYEONG',
  CHANGWON: 'CHANGWON',
  TONGYEONG: 'TONGYEONG',
  HADONG: 'HADONG',
  HAMAN: 'HAMAN',
  HAMYANG: 'HAMYANG',
  HAPCHEON: 'HAPCHEON',
  GOCHANG: 'GOCHANG',
  GUNSAN: 'GUNSAN',
  GIMJE: 'GIMJE',
  NAMWON: 'NAMWON',
  MUJU: 'MUJU',
  BUAN: 'BUAN',
  SUNCHANG: 'SUNCHANG',
  WANJU: 'WANJU',
  IKSAN: 'IKSAN',
  IMSIL: 'IMSIL',
  JANGSU: 'JANGSU',
  JEONJU: 'JEONJU',
  JEONGEUP: 'JEONGEUP',
  JINAN: 'JINAN',
  GANGJIN: 'GANGJIN',
  GOHEUNG: 'GOHEUNG',
  GOKSEONG: 'GOKSEONG',
  GWANGYANG: 'GWANGYANG',
  GURYE: 'GURYE',
  NAJU: 'NAJU',
  DAMYANG: 'DAMYANG',
  MOKPO: 'MOKPO',
  MUAN: 'MUAN',
  BOSEONG: 'BOSEONG',
  SUNCHEON: 'SUNCHEON',
  SINAN: 'SINAN',
  YEOSU: 'YEOSU',
  YEONGGWANG: 'YEONGGWANG',
  YEONGAM: 'YEONGAM',
  WANDO: 'WANDO',
  JANGSEONG: 'JANGSEONG',
  JANGHEUNG: 'JANGHEUNG',
  JINDO: 'JINDO',
  HAMPYEONG: 'HAMPYEONG',
  HAENAM: 'HAENAM',
  HWASUN: 'HWASUN',
  JEJU: 'JEJU',
  SEOGWIPO: 'SEOGWIPO',
  GUNWEE: 'GUNWEE',
  DAEGU_NAM: 'DAEGU_NAM',
  DALSEO: 'DALSEO',
  DALSEONG: 'DALSEONG',
  DAEGU_DONG: 'DAEGU_DONG',
  DAEGU_BUK: 'DAEGU_BUK',
  DAEGU_SEO: 'DAEGU_SEO',
  SUSEONG: 'SUSEONG',
  DAEGU_JUNG: 'DAEGU_JUNG',
} as const;

export type LocationCitiesItem = typeof LocationCitiesItem[keyof typeof LocationCitiesItem];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LocationCitiesItem = {
  SEOUL: 'SEOUL',
  GYEONGGI: 'GYEONGGI',
  INCHEON: 'INCHEON',
  DAEJEON: 'DAEJEON',
  DAEGU: 'DAEGU',
  BUSAN: 'BUSAN',
  ULSAN: 'ULSAN',
  GWANGJU: 'GWANGJU',
  GANGWON: 'GANGWON',
  SEJONG: 'SEJONG',
  CHUNGCHEONGNAM: 'CHUNGCHEONGNAM',
  CHUNGCHEONGBUK: 'CHUNGCHEONGBUK',
  GYEONGSANGNAM: 'GYEONGSANGNAM',
  GYEONGSANGBUK: 'GYEONGSANGBUK',
  JEOLANAM: 'JEOLANAM',
  JEOLABUK: 'JEOLABUK',
  JEJU: 'JEJU',
} as const;

export interface Location {
  cities: LocationCitiesItem[];
  towns: LocationTownsItem[];
}

export type JobJobCategory = typeof JobJobCategory[keyof typeof JobJobCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const JobJobCategory = {
  STUDENT: 'STUDENT',
  EMPLOYEE: 'EMPLOYEE',
  FREELANCER: 'FREELANCER',
  ETC: 'ETC',
} as const;

export interface Job {
  jobCategory: JobJobCategory;
  jobName: string;
}

export interface InfoImage {
  imageId: string;
  url: string;
}

export interface UserInfoRequest {
  birthDate: string;
  book?: Book;
  dateStyle?: string[];
  drinking: string;
  foods?: string[];
  gender: UserInfoRequestGender;
  height: number;
  hobbies: string[];
  images: InfoImage[];
  introduction?: string;
  job: Job;
  location: Location;
  mbti: UserInfoRequestMbti;
  movie?: Movie;
  name: string;
  pets?: string[];
  religion: Religion;
  smoking: Smoking;
}

export type DrinkingDrinkingCategory = typeof DrinkingDrinkingCategory[keyof typeof DrinkingDrinkingCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const DrinkingDrinkingCategory = {
  NO_PROBLEM: 'NO_PROBLEM',
  ONE_TWO_TIMES_A_WEEK: 'ONE_TWO_TIMES_A_WEEK',
  ONE_TWO_TIMES_A_MONTH: 'ONE_TWO_TIMES_A_MONTH',
  NEVER: 'NEVER',
  ETC: 'ETC',
} as const;

export interface Drinking {
  drinkingAmount?: string;
  drinkingCategory: DrinkingDrinkingCategory;
}

export interface IdealPartnerRequest {
  ageRange?: NumberRange;
  drinking?: Drinking;
  heightRange?: NumberRange;
  hobbies?: string[];
  images?: InfoImage[];
  location?: Location;
  religion?: Religion;
  requiredOptions?: string[];
  smoking?: Smoking;
  style?: string;
  toMatchMaker?: string;
}

export type DetailedInfoUserInfoMbti = typeof DetailedInfoUserInfoMbti[keyof typeof DetailedInfoUserInfoMbti];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const DetailedInfoUserInfoMbti = {
  ENFP: 'ENFP',
  ENFJ: 'ENFJ',
  ENTJ: 'ENTJ',
  ENTP: 'ENTP',
  ESFJ: 'ESFJ',
  ESFP: 'ESFP',
  ESTJ: 'ESTJ',
  ESTP: 'ESTP',
  INFJ: 'INFJ',
  INFP: 'INFP',
  INTJ: 'INTJ',
  INTP: 'INTP',
  ISFJ: 'ISFJ',
  ISFP: 'ISFP',
  ISTJ: 'ISTJ',
  ISTP: 'ISTP',
} as const;

export type DetailedInfoUserInfoGender = typeof DetailedInfoUserInfoGender[keyof typeof DetailedInfoUserInfoGender];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const DetailedInfoUserInfoGender = {
  MALE: 'MALE',
  FEAMLE: 'FEAMLE',
} as const;

export interface DetailedInfoIdealPartner {
  ageRange?: NumberRange;
  drinking?: Drinking;
  heightRange?: NumberRange;
  hobbies?: string[];
  images?: InfoImage[];
  location?: Location;
  religion?: Religion;
  requiredOptions?: string[];
  smoking?: Smoking;
  style?: string;
  toMatchMaker?: string;
}

export interface DetailedInfoDto {
  id: string;
  idealPartner: DetailedInfoIdealPartner;
  userInfo: DetailedInfoUserInfo;
}

export interface Book {
  bookName: string;
  cause: string;
}

export interface DetailedInfoUserInfo {
  birthDate: string;
  book?: Book;
  dateStyle?: string[];
  drinking: string;
  foods?: string[];
  gender: DetailedInfoUserInfoGender;
  height: number;
  hobbies: string[];
  images: InfoImage[];
  job: Job;
  location: Location;
  mbti: DetailedInfoUserInfoMbti;
  movie?: Movie;
  name: string;
  pets?: string[];
  religion: Religion;
  smoking: Smoking;
}

export interface CreateLinkResponse {
  isOpen: boolean;
  linkId: string;
  linkKey: string;
}

export interface Unit { [key: string]: unknown }

export interface UpdateLinkOpenRequest {
  isOpen: boolean;
  linkId: string;
}





  export const updateLinkOpen = <TData = AxiosResponse<Unit>>(
    updateLinkOpenRequest: UpdateLinkOpenRequest, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.put(
      `/api/v1/link/link-open`,
      updateLinkOpenRequest,options
    );
  }

export const regenerateLinkKey = <TData = AxiosResponse<CreateLinkResponse>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.put(
      `/api/v1/link/key`,undefined,options
    );
  }

export const updateInfo = <TData = AxiosResponse<string>>(
    detailedInfoDto: DetailedInfoDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.put(
      `/api/v1/info`,
      detailedInfoDto,options
    );
  }

export const saveInfo = <TData = AxiosResponse<string>>(
    saveInfoRequest: SaveInfoRequest,
    params: SaveInfoParams, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/api/v1/info`,
      saveInfoRequest,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }

export const createLink = <TData = AxiosResponse<CreateLinkResponse>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/api/v1/link`,undefined,options
    );
  }

export const uploadImage = <TData = AxiosResponse<ImageDto>>(
    uploadImageBody: UploadImageBody, options?: AxiosRequestConfig
 ): Promise<TData> => {const formData = new FormData();
formData.append('image', uploadImageBody.image)

    return axios.post(
      `/api/v1/image/upload`,
      formData,options
    );
  }

export const refreshToken = <TData = AxiosResponse<UserTokenDto>>(
    refreshTokenRequest: RefreshTokenRequest, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/api/v1/auth/refresh-token`,
      refreshTokenRequest,options
    );
  }

export const logout = <TData = AxiosResponse<Unit>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/api/v1/auth/logout`,undefined,options
    );
  }

export const validateLink = <TData = AxiosResponse<ValidateLinkResponse>>(
    linkKey: string, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/v1/link/valid/${linkKey}`,options
    );
  }

export const getLinkByMatchMakerId = <TData = AxiosResponse<LinkStatusResponse>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/v1/link/status`,options
    );
  }

export const getInfo = <TData = AxiosResponse<DetailedInfoDto>>(
    id: string, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/v1/info/detail/${id}`,options
    );
  }

export const getAllInfo = <TData = AxiosResponse<ArchivedInfoResponse[]>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/v1/info/all`,options
    );
  }

export const getAddress = <TData = AxiosResponse<CityAndTownResponse[]>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/v1/info/address`,options
    );
  }

export const loginKakao = <TData = AxiosResponse<UserTokenDto>>(
    params: LoginKakaoParams, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/v1/auth/kakao/login`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }

export const info = <TData = AxiosResponse<string>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/v1/auth/info`,options
    );
  }

export const deleteInfo = <TData = AxiosResponse<string>>(
    id: string, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.delete(
      `/api/v1/info/${id}`,options
    );
  }

export type UpdateLinkOpenResult = AxiosResponse<Unit>
export type RegenerateLinkKeyResult = AxiosResponse<CreateLinkResponse>
export type UpdateInfoResult = AxiosResponse<string>
export type SaveInfoResult = AxiosResponse<string>
export type CreateLinkResult = AxiosResponse<CreateLinkResponse>
export type UploadImageResult = AxiosResponse<ImageDto>
export type RefreshTokenResult = AxiosResponse<UserTokenDto>
export type LogoutResult = AxiosResponse<Unit>
export type ValidateLinkResult = AxiosResponse<ValidateLinkResponse>
export type GetLinkByMatchMakerIdResult = AxiosResponse<LinkStatusResponse>
export type GetInfoResult = AxiosResponse<DetailedInfoDto>
export type GetAllInfoResult = AxiosResponse<ArchivedInfoResponse[]>
export type GetAddressResult = AxiosResponse<CityAndTownResponse[]>
export type LoginKakaoResult = AxiosResponse<UserTokenDto>
export type InfoResult = AxiosResponse<string>
export type DeleteInfoResult = AxiosResponse<string>
