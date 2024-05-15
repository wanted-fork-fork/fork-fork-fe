import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  background: '#f4f4f4',
  borderRadius: '24px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const headerSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
});

export const headerRightSection = style({
  position: 'absolute',
  top: '12px',
  right: '12px',
});

export const profileImageContainer = style({
  width: '80px',
  height: '80px',
});

export const profileImage = style({
  width: '80px',
  height: '80px',
  borderRadius: '999px',
  objectFit: 'cover',
});

export const summaryContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const profileName = style({
  fontWeight: '600',
  fontSize: '18px',
});

export const info = style({
  fontWeight: '400',
  fontSize: '14px',
  selectors: {
    'div > &:not(:last-child)::after': {
      content: '·',
      margin: '0 4px',
    },
  },
});

export const detailSection = style({
  background: '#fff',
  borderRadius: '16px',
  padding: '16px',
});

export const detailTable = style({
  width: '100%',
  textAlign: 'left',
  borderCollapse: 'separate',
  borderSpacing: '15px',
  margin: '-15px',
});

globalStyle(`${detailTable} th`, {
  color: '#535353',
  fontWeight: '600',
  fontSize: '14px',
});

globalStyle(`${detailTable} td`, {
  color: '#282828',
  fontWeight: '500',
  fontSize: '14px',
});
