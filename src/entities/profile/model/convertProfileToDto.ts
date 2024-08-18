import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import { ImageDto, UserInfoRequest, UserInfoRequestMbti } from 'src/types';
import { convertDateObjectToDate } from 'src/shared/vo/date';

export const convertProfileToDto = (profile: MyProfile, images: ImageDto[]): UserInfoRequest => {
  return {
    name: profile.name,
    birthDate: convertDateObjectToDate(profile.birthDate).toString(),
    drinking: profile.drinking,
    // TODO: 오타 고쳐지면 삼항연산자 부분 삭제
    gender: profile.gender === 'FEMALE' ? 'FEAMLE' : 'MALE',
    height: profile.height,
    hobbies: profile.hobbies.map((x) => x.name),
    images: images,
    introduction: profile.introduction,
    job: profile.job,
    location: {
      cities: profile.location.map((l) => l.city.city),
      towns: profile.location.flatMap((l) => l.town.map((t) => t.town)),
    },
    mbti: (profile.mbti as UserInfoRequestMbti) ?? 'INFP',
    religion: profile.religion,
    smoking: profile.smoking,
    // 추가 질문
    book: undefined,
    dateStyle: [],
    foods: [],
    movie: undefined,
    pets: [],
  };
};
