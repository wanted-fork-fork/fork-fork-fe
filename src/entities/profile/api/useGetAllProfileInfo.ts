import { useQuery } from '@tanstack/react-query';
import { getAllInfo, GetAllInfoResult } from 'src/types';
import { useMemo } from 'react';
import { Gender, ProfileSummary } from 'src/entities/profile/types/profileSummary';

export const useGetAllProfileInfo = () => {
  const { data, status, isFetching, error } = useQuery<GetAllInfoResult>({
    queryFn: getAllInfo,
    queryKey: ['info', 'all'],
  });

  const profileList = useMemo<ProfileSummary[]>(
    () =>
      (data ?? []).map((info) => ({
        name: info.name,
        birthDate: new Date(info.birthDate),
        gender: info.gender as Gender,
        imageSrcList: [''],
      })),
    [data],
  );

  return {
    data: profileList,
    status,
    isFetching,
    error,
  };
};
