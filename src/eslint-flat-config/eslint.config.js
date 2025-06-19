/**
 *
 * 조사하면서 다 넣은 조합
 *
 */

// @ts-check
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginConfigPrettier from 'eslint-config-prettier/flat';

import eslintPluginBoundaries from 'eslint-plugin-boundaries';
import js from '@eslint/js';
import globals from 'globals';

export default tseslint.config(
  // =====================================================================
  // 1. 전역 설정 (모든 파일에 적용)
  // =====================================================================
  {
    // ESLint가 린팅을 건너뛸 파일/폴더를 지정합니다.
    // 기존 방식과 함께 쓰던 .eslintignore 파일은 flat config에서는 사용X - 아래 ignores
    ignores: [
      'dist/', // 빌드 출력 폴더
      'build/', // 빌드 출력 폴더
      'node_modules/', // npm 패키지 폴더
      'coverage/', // 테스트 커버리지 보고서
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs',
      '*.config.ts',
      // 여기에 추가적으로 린팅을 무시할 파일/폴더를 추가하세요.
      '**/*.test.{js,ts,mjs,cts,mts,jsx,tsx}',
      '!.storybook', // Storybook 설정 폴더
      '.storybook',
      'deploy/', // 배포 관련 폴더
      '**/*.stories.ts',
      '**/*.stories.tsx',
      '.storybook/**/*.ts',
      '.storybook/**/*.tsx',

      // 예: '.next/', '.svelte-kit/', '.output/', 'public/', 'assets/'
    ],
  },
  // =====================================================================
  // 2. 공통 JavaScript (ES Module) 설정
  //    .js, .jsx, .mjs, .ts, .tsx, .vue 파일에 기본적으로 적용됩니다.
  //    (CommonJS 파일은 별도의 섹션에서 처리됩니다.)
  // =====================================================================
  // ESLint 자체의 권장 규칙 세트
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest', // 최신 ECMAScript 버전 문법 지원
      sourceType: 'module', // ES Modules 사용 (`import`/`export`)
      globals: {
        ...globals.browser, // 웹 브라우저 환경 전역 변수 (window, document, console 등)
      },
    },
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
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    // tseslint.config에서 제공하는 TypeScript 관련 기본 및 타입 체크 규칙을 확장합니다.
    // 'recommendedTypeChecked'는 타입 정보를 사용하므로, 성능에 영향을 줄 수 있습니다.
    // 프로젝트 규모나 빌드 속도에 따라 'recommended'만 사용하거나 특정 규칙만 활성화할 수 있습니다.
    extends: [
      // ...tseslint.configs.recommendedTypeChecked, // 권장 타입 체크 규칙 - 성능 저하 있을 수 있음
      // ...tseslint.configs.strictTypeChecked, // 더 엄격한 타입 체크 규칙이 필요하다면 활성화
    ],

    languageOptions: {
      parser: tseslint.parser, // TypeScript 코드를 파싱할 파서 지정
      parserOptions: {
        project: [
          './tsconfig.json',
          './tsconfig.node.json',
          './tsconfig.app.json',
          './tsconfig.storybook.json',
        ], // Explicitly list all tsconfig files
        tsconfigRootDir: import.meta.dirname, // `tsconfig.json`을 찾을 기준 디렉토리 (현재 설정 파일 기준)
      },
    },
    rules: {
      // TypeScript 관련 규칙 추가 또는 재정의
      // 코드스타일 관련 보다는 타입 안정성, 잠재적 오류에 대한 규칙 우선 사용 제안

      // --- 코드스타일 관련 규칙들 ---
      // 명시적인 반환 타입이 필요한 함수 검사 (필요에 따라 off/warn/error)
      // `@typescript-eslint/explicit-function-return-type`: 'off',
      // '@typescript-eslint/array-type': ['error', { default: 'array-simple' }], // 배열 타입을 `Type[]` 형식으로 강제
      // 타입 단언 (<Type>value) 대신 'as' 키워드 사용 강제
      // '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' }],

      // --- 편의상 off 하기 원하는 규칙들 ---
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수 반환 타입 명시 강제 끄기 (필요 시 'error'로 변경)
      '@typescript-eslint/prefer-nullish-coalescing': 'off', // Nullish coalescing (`??`) 연산자 사용 권장

      // --- ESLint 기본 규칙 중 @typescript-eslint 버전으로 대체되는 규칙들 ---
      // 사용되지 않는 변수 경고 (TypeScript 버전 사용)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // 변수 재선언 방지 (TypeScript 버전 사용)
      'no-shadow': 'off', // ESLint 기본 규칙 끄기
      '@typescript-eslint/no-shadow': 'error',
      // 정의되기 전 사용 방지 (TypeScript 버전 사용)
      'no-use-before-define': 'off', // ESLint 기본 규칙 끄기
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, classes: false, variables: false },
      ],
      // 빈 함수 방지 (TypeScript 버전 사용)
      'no-empty-function': 'off', // ESLint 기본 규칙 끄기
      '@typescript-eslint/no-empty-function': 'off', // 빈 함수가 필요한 경우도 많으므로 off 또는 warn

      // --- 타입 안정성 및 잠재적 오류 방지 규칙 (핵심) ---
      // 'any' 타입 사용 시 경고
      '@typescript-eslint/no-explicit-any': 'warn',
      // Promise가 처리되지 않은 경우 오류     // 불필요한 `await` 사용 방지
      '@typescript-eslint/no-floating-promises': 'error',
      // 불필요한 조건문 감지 (항상 true/false인 경우)
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      // '!' (Non-null assertion) 사용 경고 (신중한 사용 유도)
      '@typescript-eslint/no-non-null-assertion': 'warn',
      // '+' 연산자가 안전하지 않은 타입에 사용되는 것 방지
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        { allowAny: false },
      ],
      '@typescript-eslint/no-redundant-type-arg': 'warn', // 타입 인수 중복 시 경고
      // 불필요한 `void` 표현식 사용 방지
      '@typescript-eslint/no-meaningless-void-operator': 'error',
      // 불필요한 타입 파라미터 사용 방지
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
      // 불필요한 타입 단언 방지
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      // 불필요한 제약 조건이 있는 제네릭 사용 방지
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      // 문자열 템플릿 리터럴에서 불필요한 타입 단언 방지
      '@typescript-eslint/restrict-template-expressions': [
        'warn',
        {
          allowNumber: true,
          allowBoolean: false,
          allowAny: false,
          allowNullish: false,
          allowNever: false,
        },
      ],

      // --- 기타 유용한 규칙 ---
      // for-in 루프에서 타입 안전성 보장
      '@typescript-eslint/no-for-in-array': 'error',
      // Promise를 반환하는 함수에 대한 일관된 반환 타입 강제
      '@typescript-eslint/promise-function-async': 'error',
      // switch-case 문에서 `fallthrough`가 없는 경우 오류
      '@typescript-eslint/no-fallthrough': 'error',
    },
  },
  // =====================================================================
  // 4. React 설정 (.jsx, .tsx 파일에만 적용)
  // =====================================================================

  {
    files: ['**/*.jsx', '**/*.tsx'],
    ...eslintPluginReact.configs.flat['jsx-runtime'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // JSX 문법 사용
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect', // 설치된 React 버전 자동 감지
      },
    },
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
  // * FSD rules helper (Feature-Sliced Design 규칙)
  // =====================================================================

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      boundaries: eslintPluginBoundaries,
    },
    rules: {
      // 1. 수직적 계층 구조를 지킬 것
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message:
            '올바른 FSD Layer import 규칙을 따르세요: ${dependency.type} 레이어는 ${file.type} 레이어에서 임포트할 수 없습니다.',

          rules: [
            { from: 'app', allow: ['*'] },
            {
              from: 'pages',
              allow: ['shared', 'entities', 'features', 'widgets'],
            },
            {
              from: 'widgets',
              allow: ['shared', 'entities', 'features'],
            },
            {
              from: 'features',
              allow: ['shared', 'entities'],
            },
            {
              from: 'entities',
              allow: ['shared'],
            },
            {
              from: 'shared',
              allow: [],
            },
          ],
        },
      ],
      // 'boundaries/no-unknown': [1], // 알 수 없는 요소 참조 경고
    },

    settings: {
      'boundaries/elements': [
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'pages', pattern: 'src/pages/**' },
        { type: 'app', pattern: 'src/app/**' },
      ],
      'boundaries/includes': ['src/**/*.*'],

      // 핵심 설정 (alias import 인식)
      'boundaries/include-relative': true,
      'boundaries/include-absolute': true,
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        project: [
          './tsconfig.json',
          './tsconfig.node.json',
          './tsconfig.app.json',
        ],
      },
    },
  },

  // =====================================================================
  // * Prettier 통합 (항상 마지막에 위치해야 Prettier 규칙이 다른 ESLint 규칙을 덮어씁니다.)
  // =====================================================================

  // eslintPluginPrettierRecommended,
  eslintPluginConfigPrettier
);
