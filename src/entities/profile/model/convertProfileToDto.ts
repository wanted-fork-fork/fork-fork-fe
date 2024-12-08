import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import { DetailedInfoUserInfo, ImageDto, UserInfoRequest, UserInfoRequestMbti } from 'src/types';
import { convertDateObjectToDate, convertDateToDateObject } from 'src/shared/vo/date';
import { Location } from 'src/entities/location/types/location';

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
    mbti: (profile.mbti as UserInfoRequestMbti) ?? 'INFP',
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

export const convertDtoToProfile = (dto: DetailedInfoUserInfo): MyProfile => {
  return {
    birthDate: convertDateToDateObject(new Date(dto.birthDate)),
    drinking: dto.drinking,
    gender: dto.gender,
    height: dto.height,
    hobbies: dto.hobbies.map((h) => ({ name: h })),
    images: [],
    imageDtoList: dto.images,
    introduction: '',
    job: dto.job,
    location:
      (dto.location?.towns
        .map((town, idx) => {
          const city = dto.location?.cities[idx];
          if (!city) return null;
          return dto.location?.cities[idx]
            ? ({
                town: [{ town, townName: `TOWN_${town}` }],
                city: { city, cityName: `CITY_${city}` },
              } satisfies Location)
            : null;
        })
        .filter(Boolean) as Location[]) || [],
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
