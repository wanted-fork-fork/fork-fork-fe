export const copyLink = (link: string) => navigator.clipboard.writeText(link);

export const createSharedProfileLink = (shareId: string, fullLink = false) =>
  `${fullLink ? location.origin : ''}/share/${shareId}`;

export const createFormLink = (key: string, fullLink = false) => `${fullLink ? location.origin : ''}/form/${key}`;
