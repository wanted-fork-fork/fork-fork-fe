## 설치

1. package.json > dependencies > `@repo/config-vanilla-extract: "workspace:*"` 추가
2. `pnpm i @vanilla-extract/css --filter {workspace-name}`

### vite 플러그인 설치

1. `pnpm i -D @vanilla-extract/vite-plugin --filter {workspace-name}`
2. vite.config.ts > plugins > `vanillaExtractPlugin()` 추가

### global style 적용

메인 파일에 아래 import 추가

```ts
import '@repo/config-vanilla-extract/app.css';
```
