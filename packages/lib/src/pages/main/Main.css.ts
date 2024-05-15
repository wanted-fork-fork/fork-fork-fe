import { style } from 'configs/vanilla-extract';

export const headerWrapper = style({
  height: '44px',
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
});

export const title = style({
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '24px',
});

export const bodyWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '0 20px',
});

export const totalText = style({
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '16px',
});

export const addProfileButton = style({
  display: 'block',
  width: '100%',
  background: '#f4f4f4',
  height: '80px',
  borderRadius: '24px',
  textAlign: 'center',
});
