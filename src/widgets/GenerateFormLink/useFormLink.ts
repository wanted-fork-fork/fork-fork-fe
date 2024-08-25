import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createLink, getLinkByMatchMakerId, regenerateLinkKey, updateLinkOpen, UpdateLinkOpenRequest } from 'src/types';

type LinkState = {
  isOpen: boolean;
  linkKey: string | null;
  linkId: string | null;
};

export const useFormLink = () => {
  const [formLink, setFormLink] = useState<LinkState>({
    isOpen: false,
    linkKey: null,
    linkId: null,
  });

  const { data, status } = useQuery({
    queryFn: () => getLinkByMatchMakerId(),
    queryKey: ['link'],
  });
  const { mutateAsync: createLinkMutation } = useMutation({
    mutationFn: () => createLink(),
  });
  const { mutateAsync: regenerateLinkMutation } = useMutation({
    mutationFn: () => regenerateLinkKey(),
  });
  const { mutateAsync: updateLinkOpenMutation } = useMutation({
    mutationFn: (req: UpdateLinkOpenRequest) => updateLinkOpen(req),
  });

  useEffect(() => {
    if (status === 'success') {
      setFormLink({
        ...data.data,
      });
    }
  }, [data, status]);

  const getLink = useCallback(async () => {
    if (!formLink.linkKey) {
      const newLink = await createLinkMutation();
      setFormLink({ ...newLink.data });
      return `${location.host}/form/${newLink.data.linkKey}`;
    }
    return `${location.host}/form/${formLink.linkKey}`;
  }, [createLinkMutation, formLink.linkKey]);

  const regenerateLink = useCallback(async () => {
    const newLink = await (formLink.linkKey ? regenerateLinkMutation : createLinkMutation)();
    setFormLink({ ...newLink.data });
  }, [createLinkMutation, formLink.linkKey, regenerateLinkMutation]);

  const updateLinkOpenState = useCallback(
    async (state: boolean) => {
      if (!formLink.linkId) {
        const newLink = await createLinkMutation();
        setFormLink({ ...newLink.data, isOpen: state });
        return;
      }
      await updateLinkOpenMutation({ linkId: formLink.linkId, isOpen: state });
      setFormLink((prev) => ({ ...prev, isOpen: state }));
    },
    [createLinkMutation, formLink.linkId, updateLinkOpenMutation],
  );

  return {
    isOpen: formLink.isOpen,
    getLink,
    regenerateLink,
    updateLinkOpenState,
  };
};
