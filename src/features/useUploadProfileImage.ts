import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ImageDto, uploadImage } from 'src/types';

export const useUploadProfileImage = () => {
  const [progress, setProgress] = useState<number>(0);

  const { mutateAsync: uploadMutation } = useMutation({
    mutationFn: uploadImage,
  });

  const uploadFileList = useCallback(
    async (files: File[], onUpload: () => void) => {
      const results: ImageDto[] = [];
      // 한번에 너무 많이 요청하지 않도록 하나씩 업로드 요청
      for (const file of files) {
        try {
          const result = await uploadMutation({ image: file });
          onUpload();
          results.push(result.data);
        } catch (e) {
          console.error(e);
        }
      }
      return results;
    },
    [uploadMutation],
  );

  const upload = useCallback(
    async (profileImages: File[], idealPartnerImages: File[]) => {
      setProgress(0);

      const total = profileImages.length + idealPartnerImages.length + 1;

      const [profileImageResults, idealImageResults] = await Promise.all([
        uploadFileList(profileImages, () => {
          setProgress((prev) => prev + 1 / total);
        }),
        uploadFileList(idealPartnerImages, () => {
          setProgress((prev) => prev + 1 / total);
        }),
      ]);

      return { profileImageResults, idealImageResults };
    },
    [uploadFileList],
  );

  return { progress, upload };
};
