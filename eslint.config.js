// @ts-check
import tseslint from 'typescript-eslint';
import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import js from '@eslint/js';
import globals from 'globals';

// JSON 파일 린팅을 위한 플러그인 및 파서
import jsoncParser from 'jsonc-eslint-parser';
import eslintPluginJsonc from 'eslint-plugin-jsonc';

// Markdown 파일 린팅을 위한 플러그인
import eslintPluginMarkdown from 'eslint-plugin-markdown';

// Node.js 관련 규칙을 위한 플러그인 (선택 사항: 필요한 경우 설치 후 활성화)
// import eslintPluginN from 'eslint-plugin-n';

export default tseslint.config(
  // =====================================================================
  // 1. 전역 설정 (모든 파일에 적용)
  // =====================================================================
  {
    // ESLint가 린팅을 건너뛸 파일/폴더를 지정합니다.
    ignores: [
      'dist/', // 빌드 출력 폴더
      'build/', // 빌드 출력 폴더
      'node_modules/', // npm 패키지 폴더
      'coverage/', // 테스트 커버리지 보고서
      '*.config.js', // ESLint 설정 파일 자체
      '*.config.mjs',
      '*.config.cjs',
      // 여기에 추가적으로 린팅을 무시할 파일/폴더를 추가하세요.
      // 예: '.next/', '.svelte-kit/', '.output/', 'public/', 'assets/'
    ],
  },
  // =====================================================================
  // 2. 공통 JavaScript (ES Module) 설정
  //    .js, .jsx, .mjs, .ts, .tsx, .vue 파일에 기본적으로 적용됩니다.
  //    (CommonJS 파일은 별도의 섹션에서 처리됩니다.)
  // =====================================================================
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest', // 최신 ECMAScript 버전 문법 지원
      sourceType: 'module', // ES Modules 사용 (`import`/`export`)
      globals: {
        ...globals.browser, // 웹 브라우저 환경 전역 변수 (window, document, console 등)
        ...globals.node, // Node.js 환경 전역 변수 (process, module, require 등)
        // 여기에 프로젝트에서 사용하는 추가적인 전역 변수를 정의할 수 있습니다.
        // 예: 'jQuery': 'readonly'
      },
    },
    // ESLint 자체의 권장 규칙 세트
    ...js.configs.recommended,
    rules: {
      // 기본적인 JavaScript 규칙 추가 또는 재정의
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 사용되지 않는 변수 경고 (언더스코어 변수는 무시)
      'no-console': ['warn', { allow: ['warn', 'error'] }], // console.log 경고, console.warn/error 허용
      eqeqeq: 'error', // `===` 사용 강제 (느슨한 비교 `==` 금지)
      curly: 'error', // 모든 제어문에 중괄호 사용 강제
      'dot-notation': 'warn', // 가능한 경우 점 표기법 사용 권장 (`obj['prop']` 대신 `obj.prop`)
      'no-trailing-spaces': 'warn', // 코드 라인 끝의 불필요한 공백 제거
      'comma-dangle': ['warn', 'always-multiline'], // 멀티라인에서 trailing comma 강제
      'no-debugger': 'error', // debugger 사용 금지
      'no-alert': 'warn', // alert, confirm, prompt 사용 경고
      'prefer-const': 'warn', // 재할당되지 않는 변수는 const 사용 권장
    },
  },
  // =====================================================================
  // 3. TypeScript 설정 (.ts, .tsx 파일에만 적용)
  // =====================================================================
  {
    files: ['**/*.ts', '**/*.tsx'],
    // tseslint.config에서 제공하는 TypeScript 관련 기본 및 타입 체크 규칙을 확장합니다.
    // 'recommendedTypeChecked'는 타입 정보를 사용하므로, 성능에 영향을 줄 수 있습니다.
    // 프로젝트 규모나 빌드 속도에 따라 'recommended'만 사용하거나 특정 규칙만 활성화할 수 있습니다.
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      // ...tseslint.configs.strictTypeChecked, // 더 엄격한 타입 체크 규칙이 필요하다면 활성화
    ],
    languageOptions: {
      parser: tseslint.parser, // TypeScript 코드를 파싱할 파서 지정
      parserOptions: {
        project: true, // `tsconfig.json` 파일에서 타입 정보를 로드합니다.
        tsconfigRootDir: import.meta.dirname, // `tsconfig.json`을 찾을 기준 디렉토리 (현재 설정 파일 기준)
      },
    },
    rules: {
      // TypeScript 관련 규칙 추가 또는 재정의
      '@typescript-eslint/no-explicit-any': 'warn', // `any` 타입 사용 경고
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수 반환 타입 명시 강제 끄기 (필요 시 'error'로 변경)
      '@typescript-eslint/no-non-null-assertion': 'off', // Non-null assertion (`!`) 사용 허용 (프로젝트 스타일에 따라 'warn' 또는 'error'로 변경)
      '@typescript-eslint/prefer-nullish-coalescing': 'warn', // Nullish coalescing (`??`) 연산자 사용 권장
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }], // 배열 타입을 `Type[]` 형식으로 강제
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ], // TypeScript 버전의 no-unused-vars (언더스코어 변수 무시)
      'no-unused-vars': 'off', // ESLint 기본 no-unused-vars 비활성화 (TS 버전으로 대체)
    },
  },
  // =====================================================================
  // 4. React 설정 (.jsx, .tsx 파일에만 적용)
  // =====================================================================
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect', // 설치된 React 버전 자동 감지
      },
    },
    extends: [
      ...eslintPluginReact.configs.recommended, // React 기본 권장 규칙
      ...eslintPluginReact.configs['jsx-runtime'], // React 17+ JSX 변환 규칙 (자동 import React)
    ],
    rules: {
      // React 관련 규칙 추가 또는 재정의
      'react/react-in-jsx-scope': 'off', // React 17+에서 더 이상 `import React`가 필요 없으므로 비활성화
      'react/prop-types': 'off', // TypeScript 사용 시 PropTypes는 일반적으로 불필요
      'react-hooks/rules-of-hooks': 'error', // React Hooks 규칙 위반 시 오류
      'react-hooks/exhaustive-deps': 'warn', // `useEffect` 등의 의존성 배열 누락/오류 시 경고
      'react/jsx-uses-react': 'off', // React 17+에서 `React` 변수 사용 여부 체크 비활성화
      'react/jsx-uses-vars': 'off', // React 17+에서 JSX 변수 사용 여부 체크 비활성화 (타입스크립트 파서가 처리)
      'react/self-closing-comp': [
        'error',
        {
          // 빈 태그 자동 닫기 `<div/>`
          component: true,
          html: true,
        },
      ],
      'react/function-component-definition': [
        'warn',
        {
          // 함수형 컴포넌트 정의 스타일
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
  },
  // =====================================================================
  // 5. Vue 설정 (.vue 파일에만 적용)
  // =====================================================================
  {
    files: ['**/*.vue'],
    extends: [
      ...eslintPluginVue.configs['flat/essential'], // Vue 기본 필수 규칙
      // ...eslintPluginVue.configs['flat/strongly-recommended'], // 더 엄격한 Vue 규칙이 필요하면 활성화
      // ...eslintPluginVue.configs['flat/recommended'], // 가장 엄격한 Vue 규칙이 필요하면 활성화
    ],
    languageOptions: {
      parser: eslintPluginVue.parsers['vue-eslint-parser'], // Vue SFC 파서 지정
      parserOptions: {
        parser: tseslint.parser, // Vue <script lang="ts"> 블록을 TypeScript로 파싱하도록 지정
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true, // tsconfig.json 참조 (Vue SFC 내의 TypeScript 코드에 타입 정보 적용)
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Vue 관련 규칙 추가 또는 재정의
      'vue/multi-word-component-names': 'off', // 컴포넌트 이름 여러 단어 강제 끄기 (필요 시 'error' 또는 'warn'로 변경)
      'vue/no-v-html': 'off', // `v-html` 사용 경고 끄기 (보안 고려하여 'warn' 또는 'error'로 변경 권장)
      'vue/html-self-closing': [
        'error',
        {
          // HTML 태그 자동 닫기 스타일
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/max-attributes-per-line': [
        'warn',
        {
          // 한 줄당 최대 속성 수 제한
          singleline: { max: 5 },
          multiline: { max: 1 },
        },
      ],
      'vue/html-indent': ['warn', 2], // HTML 템플릿 들여쓰기 2칸
      'vue/require-default-prop': 'off', // Vue 3 Composition API에서 필요 없을 수 있음
      'vue/no-setup-props-destructure': 'off', // Vue 3 `<script setup>`에서 props 구조분해 할당 허용
    },
  },
  // =====================================================================
  // 6. CommonJS 파일 설정 (.cjs 파일에만 적용)
  // =====================================================================
  {
    files: ['**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs', // CommonJS 모듈 시스템 명시 (`require`/`module.exports`)
      globals: {
        ...globals.node, // Node.js 환경 전역 변수 (주로 Node.js에서 사용되므로)
      },
    },
    // ESLint 기본 권장 규칙 적용
    ...js.configs.recommended,
    rules: {
      // CommonJS 환경에 특화된 규칙 또는 기본 규칙 재정의
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // `require` 사용 등 CommonJS 관련 함수 사용 시 오류 방지 규칙 추가 가능
      // 예: 'n/no-missing-require': ['error', { allowExternal: true }], // eslint-plugin-n 필요
    },
  },
  // =====================================================================
  // 7. JSON 파일 린팅 설정 (.json, .json5, .jsonc 파일에 적용)
  // =====================================================================
  {
    files: ['**/*.json', '**/*.json5', '**/*.jsonc'],
    languageOptions: {
      parser: jsoncParser, // JSON 전용 파서 사용
    },
    plugins: {
      jsonc: eslintPluginJsonc, // JSON 플러그인 활성화
    },
    extends: [
      ...eslintPluginJsonc.configs['recommended-with-jsonc'], // JSON 권장 규칙
    ],
    rules: {
      // JSON 관련 규칙 추가 또는 재정의
      'jsonc/sort-keys': 'off', // JSON 키 정렬 규칙 (필요 시 활성화)
      'jsonc/indent': ['error', 2], // JSON 들여쓰기 2칸 강제
      'jsonc/no-bigint-literals': 'error', // BigInt 리터럴 금지
      'jsonc/no-binary-expression': 'error', // 이진 표현식 금지
      'jsonc/no-infinity': 'error', // Infinity 금지
      'jsonc/no-nan': 'error', // NaN 금지
    },
  },
  // =====================================================================
  // 8. Markdown 파일 린팅 설정 (.md 파일 및 그 안의 코드 블록에 적용)
  // =====================================================================
  {
    files: ['**/*.md'],
    plugins: {
      markdown: eslintPluginMarkdown, // Markdown 플러그인 활성화
    },
    // Markdown 파일 내의 코드 블록을 ESLint가 인식하도록 설정
    processor: 'markdown/markdown',
    rules: {
      // Markdown 파일 자체에 대한 규칙 (필요 시 추가)
      // 'prettier/prettier': 'off', // 마크다운 파일 전체에 Prettier 적용을 원치 않을 경우
    },
  },
  // Markdown 파일 내의 코드 블록에 대한 규칙 (JS, TS, JSX, TSX 등)
  // 예제 코드의 경우 일반적인 코드보다 덜 엄격한 규칙을 적용할 수 있습니다.
  {
    files: [
      '**/*.md/*.js',
      '**/*.md/*.ts',
      '**/*.md/*.jsx',
      '**/*.md/*.tsx',
      '**/*.md/*.vue',
      '**/*.md/*.cjs',
      '**/*.md/*.mjs',
    ],
    rules: {
      'no-console': 'off', // 마크다운 예제 코드에서는 console.log 허용
      'no-unused-vars': 'off', // 마크다운 예제 코드에서는 사용하지 않는 변수 허용
      'no-undef': 'off', // 마크다운 예제 코드에서는 정의되지 않은 변수 허용 (빠른 예시용)
      eqeqeq: 'off', // 마크다운 예제 코드에서는 == 허용
      'import/no-unresolved': 'off', // import 관련 오류 무시 (외부 모듈 경로가 불분명할 수 있음)
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-redeclare': 'off', // 변수 재선언 허용
    },
  },
  // =====================================================================
  // 9. Prettier 통합 (항상 마지막에 위치해야 Prettier 규칙이 다른 ESLint 규칙을 덮어씁니다.)
  // =====================================================================
  eslintPluginPrettierRecommended
);
