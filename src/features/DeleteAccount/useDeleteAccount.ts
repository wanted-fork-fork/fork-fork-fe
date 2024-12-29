import { useMutation } from '@tanstack/react-query';
import { quit } from 'src/types';

export const useDeleteAccount = () => {
  const { mutateAsync } = useMutation({
    mutationFn: quit,
  });

  return mutateAsync;
};
