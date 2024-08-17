import { useSuspenseQuery } from '@tanstack/react-query';
import { getAllInfo, GetAllInfoResult } from 'src/types';

export const useGetAllProfileInfo = () => {
  const { data, status, isFetching, error } = useSuspenseQuery<GetAllInfoResult>({
    queryFn: getAllInfo,
    queryKey: ['info', 'all'],
  });

  return {
    data,
    status,
    isFetching,
    error,
  };
};
