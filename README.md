## 실행 방법

```sh
npm i
npm run dev
```

## 패키지 추가 방법

## 프로젝트 구성

FSD를 차용하여 레이어 > 슬라이스 > 세그먼트 구조로 구성

### 레이어 구조

- `apps`
    - `web`
    - `webview`
    - `mobile-app`
- `packages`
    - `pages`
    - `widgets`
    - `features`
    - `entities`
    - `shared`
        - `configs`

#### 각 레이어의 역할

- `apps`
    - 애플리케이션 전체를 관리
    - 외부와의 연결을 담당
- `pages`
    - widgets를 조합하여 한 document에 그려줄 전체 화면을 구성
    - 외부에서 데이터를 가져와 UI에 주입 (ex. persist store, 외부 API 등)
    - 전역 상태 관리
    - (주의) 상세한 UI 구조나 비즈니스 로직에 대해 너무 많이 알지 않도록 할 것
- `widgets`
    - features, entities를 조합하여 페이지의 한 섹션을 구성
- `features`
    - 데이터 변경을 발생시키는 사용자 액션과 관련된 비즈니스 로직 관리
- `entities`
    - 비즈니스 엔티티 모델, 데이터 구조와 관련된 로직 및 UI
    - (주의) 액션과 관련된 데이터가 포함되면 안 됨
- `shared`
    - config - 프로젝트 공통 설정
    - util - 도메인 의존성이 없는 순수 함수
    - ui - 도메인 의존성이 없는 UI 컴포넌트

### 슬라이스 네이밍

- `package.json`의 name에 들어갈 네이밍: `@repo/{layer-name}-{slice-name}`
- 디렉토리 네이밍: `packages/{layer-name}/{slice-name}`

**규칙**

- 단어 사이 구분이 필요할 경우 `-`를 사용한다

### `Entities` 세그먼트 구조

각 세그먼트는 모두 optional임

- `api`: API 호출 함수를 정의
    - `__mocks__`: API 호출 함수에 대한 mock 데이터 정의
- `lib`: 비즈니스 로직 정의
- `model`: 비즈니스 엔티티 모델 정의 (TS Type, Zod Schema 등)
- `ui`: 리액트 컴포넌트 & 스타일

### 규칙

- 각 레이어의 슬라이스는 패키지로 구성한다
- 슬라이스는 하위 레이어의 슬라이스가 내보내는 모듈만 참조할 수 있다
    - (entities 추가 규칙) 슬라이스의 `@x` 디렉토리에서 내보내는 모듈은 같은 레이어의 슬라이스가 참조할 수
      있다 ([참고](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/docs/en/architecture.md#entities-cross-imports))
    - (widgets 추가 규칙) `Base`로 시작되는 슬라이스는 다른 슬라이스에서 참조할 수
      있다 ([참고](https://github.com/noveogroup-amorgunov/nukeapp/blob/main/docs/en/architecture.md#Widgets-cross-imports-custom-sublayers))
- 각 슬라이스는 `index.ts` 파일에 내보낼 모듈을 정의해야 한다
    - 일반적으로 슬라이스 외부에서는 `index.ts` 파일을 통해 내보내진 모듈만 참조 가능하다
