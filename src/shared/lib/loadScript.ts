export type LoadScriptOptions = {
  url: string;
  type?: 'module' | 'text/javascript';
} & Pick<HTMLScriptElement, 'integrity' | 'crossOrigin'>;

export const loadScript = async ({ url, type = 'text/javascript', integrity, crossOrigin }: LoadScriptOptions) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = type;
    script.onload = resolve;
    script.onerror = reject;
    script.src = url;
    if (integrity) {
      script.integrity = integrity;
    }
    if (crossOrigin) {
      script.crossOrigin = crossOrigin;
    }
    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
