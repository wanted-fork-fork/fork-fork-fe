export const copyLink = (link: string) => {
  const blob = new ClipboardItem({
    'text/plain': new Blob([link], { type: 'text/plain' }),
  });
  navigator.clipboard.write([blob]);
};

export const createSharedProfileLink = (shareId: string, fullLink = false) =>
  `${fullLink ? location.origin : ''}/share/${shareId}`;

export const createSharedGroupLink = ({
  groupId,
  shareId,
  fullLink = false
}: {
  groupId: string,
  shareId: string,
  fullLink?: boolean
}) =>
  `${fullLink ? location.origin : ''}/g/${groupId}/share/${shareId}`;

export const createFormLink = (key: string, fullLink = false) => `${fullLink ? location.origin : ''}/form/${key}`;
