import {
  DetailedInfoUserInfo,
  ImageDto,
  UserInfoLocation as LocationDto,
  UserInfoRequest,
  UserInfoRequestMbti,
} from 'src/types';
import { convertDateObjectToDate, convertDateToDateObject } from 'src/shared/functions/date';
import { Location } from 'src/entities/candidates/_common/vo/location/types/location';
import { MyProfile } from 'src/entities/candidates/info/models/myProfileStore';

export const convertProfileToDto = (profile: MyProfile, images: ImageDto[]): UserInfoRequest => {
  return {
    name: profile.name,
    birthDate: convertDateObjectToDate(profile.birthDate).toISOString(),
    drinking: profile.drinking,
    gender: profile.gender,
    height: profile.height,
    hobbies: profile.hobbies.map((x) => x.name),
    images: images,
    introduction: profile.introduction,
    job: profile.job,
    location: {
      cities: profile.location.map((l) => l.city.city),
      towns: profile.location.flatMap((l) => l.town.map((t) => t.town)),
    },
    mbti: (profile.mbti as UserInfoRequestMbti) ?? null,
    religion: profile.religion,
    smoking: profile.smoking,
    // 추가 질문
    book: profile.book,
    dateStyle: profile.dateStyle,
    foods: profile.foods,
    movie: profile.movie,
    pets: profile.pets,
  };
};

export const convertDtoToLocation = (dto: LocationDto) => {
  return dto?.towns
    .map((town, idx) => {
      const city = dto?.cities[idx];
      if (!city) return null;
      return dto?.cities[idx]
        ? ({
            town: [{ town, townName: `TOWN_${town}` }],
            city: { city, cityName: `CITY_${city}` },
          } satisfies Location)
        : null;
    })
    .filter(Boolean) as Location[];
};

export const convertDtoToProfile = (dto: DetailedInfoUserInfo): MyProfile => {
  return {
    birthDate: convertDateToDateObject(new Date(dto.birthDate)),
    drinking: dto.drinking,
    gender: dto.gender,
    height: dto.height,
    hobbies: dto.hobbies.map((h) => ({ name: h })),
    images: [],
    imageDtoList: dto.images,
    introduction: dto.introduction ?? '',
    job: dto.job,
    location: convertDtoToLocation(dto.location),
    mbti: dto.mbti ?? null,
    name: dto.name,
    religion: dto.religion,
    smoking: dto.smoking,
    pets: dto.pets ?? [],
    foods: dto.foods ?? [],
    dateStyle: dto.dateStyle ?? [],
    book: dto.book ?? { bookName: '', cause: '' },
    movie: dto.movie ?? { movieName: '', cause: '' },
  };
};
