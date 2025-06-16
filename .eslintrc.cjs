module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    // 실제 tsconfig 존재 시만 필요
    // project: ['./tsconfig.json'],
    // tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'unused-imports',
  ],
  extends: [
    'eslint:recommended', // JS 기본 린트 규칙
    'plugin:@typescript-eslint/recommended', // TS용 린트 규칙
    'plugin:react/recommended', // React 기본 린트 규칙
    'plugin:react-hooks/recommended', // React hook 관련 린트 규칙
    'plugin:jsx-a11y/recommended', // 웹 접근성(a11y) 관련 린트
    'plugin:prettier/recommended', // Prettier와 충돌 방지 + 포맷팅 규칙
    'prettier', // prettier 충돌 방지 // 위 plugin:prettier/recommended 에 포함되어 있지만, 일부설정 보완효과, 위 하나만 써도 됨

    // 더 엄격한 스타일 가이드 - import순서, 변수네이밍, 함수 정의 방식 등 - 를 원한다면
    // 다른 플러그인 추가 - 단점, peer dependencies 많을 수 있고, 린트 에러 빈번할 수 있음
    // ex) airbnb 적용 예 (아래)

    // 'airbnb', // Airbnb JS 스타일 가이드
    // 'airbnb/hooks', // React Hook 규칙 포함
    // 'airbnb-typescript', // TypeScript 변형 가이드 (별도 설치 필요)
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // 팀 선호 기반
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/react-in-jsx-scope': 'off', // React 17+
    'react/prop-types': 'off', // TypeScript 사용 시 불필요
    '@typescript-eslint/consistent-type-imports': 'warn', // 일반 import로 타입만 가져옴 경고
    '@typescript-eslint/no-explicit-any': 'warn', // any 사용 억제

    // 가독성 관련
    'object-curly-spacing': ['error', 'always'], // import { a, b } 스타일 허용
    'comma-dangle': ['error', 'only-multiline'], // 여러줄 구조에서만 마지막 쉼표 강제, 단일줄에서는 쉼표x
    indent: ['error', 2, { SwitchCase: 1 }], // 들여쓰기 2칸
    quotes: ['error', 'single', { avoidEscape: true }], // 기본 따옴표 싱글, 단 문자열 안에 이미 싱글 쓰면 더블 인정
    semi: ['error', 'always'], // 세미콜론 강제

    // 안쓰는 변수, import 관련
    'no-unused-vars': 'off', // 겹치는 설정 끄기
    '@typescript-eslint/no-unused-vars': 'off', // 겹치는 설정 끄기 // 이거 대신 tsconfig.json noUnusedParameters / noUnusedLocals: true 고려(타입에서도 감지가능, ESLint없이 타입 기반 분석)
    // eslint-plugin-unused-imports 플러그인에서 설정 사용
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'unused-imports/no-unused-imports': 'error', // 사용되지 않는 import 제거
    'no-duplicate-imports': 'error', // 동일 파일 중복 import 금지

    // 그 외 권장
    'react-hooks/exhaustive-deps': 'warn', // useXX React훅 의존성 배열 누락 경고
  },
};
