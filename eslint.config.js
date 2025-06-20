// @ts-check
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import { importX as eslintPluginImportX } from 'eslint-plugin-import-x';

import eslintPluginConfigPrettier from 'eslint-config-prettier/flat';

export default tseslint.config(
  // =====================================================================
  // 전역 설정 (모든 파일에 적용)
  // =====================================================================
  {
    // ESLint가 린팅을 건너뛸 파일/폴더를 지정합니다.
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
      // 'deploy/', // 배포 관련 폴더
      '**/*.stories.ts',
      '**/*.stories.tsx',
      '.storybook/**/*.ts',
      '.storybook/**/*.tsx',

      // 예: '.next/', '.svelte-kit/', '.output/', 'public/', 'assets/'
    ],
  },
  // ESLint 자체의 권장 규칙 세트
  js.configs.recommended,
  // TypeScript ESLint의 권장 규칙 세트
  ...tseslint.configs.recommended,
  // =====================================================================
  // 공통 JavaScript (ES Module) 설정
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
      },
    },
    rules: {
      // 기본적인 JavaScript 규칙 추가 또는 재정의
      'no-unused-vars': 'off', // TS eslint 사용
      'no-console': ['warn', { allow: ['warn', 'error'] }], // console.log 경고, console.warn/error 허용
      eqeqeq: 'error', // `===` 사용 강제 (느슨한 비교 `==` 금지)
      curly: 'error', // 모든 제어문에 중괄호 사용 강제
      // 'dot-notation': 'warn', // 가능한 경우 점 표기법 사용 권장 (`obj['prop']` 대신 `obj.prop`)
      'no-trailing-spaces': 'warn', // 코드 라인 끝의 불필요한 공백 제거
      'comma-dangle': ['warn', 'always-multiline'], // 멀티라인에서 trailing comma 강제
      'no-debugger': 'error', // debugger 사용 금지
      'no-alert': 'warn', // alert, confirm, prompt 사용 경고
      'prefer-const': 'warn', // 재할당되지 않는 변수는 const 사용 권장
      'eslint-plugin/naming-convention': 'off',
    },
  },
  // =====================================================================
  // TypeScript 설정 (.ts, .tsx 파일에만 적용)
  // =====================================================================
  {
    files: ['**/*.ts', '**/*.tsx'],
    // tseslint.config에서 제공하는 TypeScript 관련 기본 및 타입 체크 규칙을 확장합니다.
    // 'recommendedTypeChecked'는 타입 정보를 사용하므로, 성능에 영향을 줄 수 있습니다.
    // 프로젝트 규모나 빌드 속도에 따라 'recommended'만 사용하거나 특정 규칙만 활성화할 수 있습니다.
    languageOptions: {
      parser: tseslint.parser, // TypeScript 코드를 파싱할 파서 지정
      parserOptions: {
        project: [
          './tsconfig.json',
          './tsconfig.node.json',
          './tsconfig.app.json',
        ], // Explicitly list all tsconfig files
        tsconfigRootDir: import.meta.dirname, // `tsconfig.json`을 찾을 기준 디렉토리 (현재 설정 파일 기준)
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // TypeScript 관련 규칙 추가 또는 재정의
      '@typescript-eslint/no-explicit-any': 'warn', // `any` 타입 사용 경고
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수 반환 타입 명시 강제 끄기 (필요 시 'error'로 변경)
      '@typescript-eslint/no-non-null-assertion': 'off', // Non-null assertion (`!`) 사용 허용 (프로젝트 스타일에 따라 'warn' 또는 'error'로 변경)
      '@typescript-eslint/prefer-nullish-coalescing': 'off', // Nullish coalescing (`??`) 연산자 사용 권장
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }], // 배열 타입을 `Type[]` 형식으로 강제
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ], // TypeScript 버전의 no-unused-vars (언더스코어 변수 무시)
      'no-unused-vars': 'off', // ESLint 기본 no-unused-vars 비활성화 (TS 버전으로 대체)
      '@typescript-eslint/naming-convention': [
        'error',
        // --- 1. React 컴포넌트 변수 (e.g. const MyComponent = () => <div />) ---
        {
          selector: 'variable',
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
          filter: {
            regex: '^[A-Z][0-9A-Za-z]*$', // 이름이 대문자로 시작하는 함수만 해당
            match: true,
          },
          types: ['function'],
        },

        // --- 2. React 컴포넌트 함수 선언 (e.g. function MyComponent() {}) ---
        {
          selector: 'function',
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
          filter: {
            regex: '^[A-Z][A-Za-z0-9]*$', // 이름이 대문자로 시작하는 함수만 해당
            match: true,
          },
        },
        // --- 3. 함수 매개변수 및 생성자 파라미터 속성 ---
        {
          selector: ['parameter', 'parameterProperty'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // --- 4. const로 선언된 불변 데이터 변수 ---
        {
          selector: 'variable',
          modifiers: ['const'],
          types: ['string', 'number', 'array', 'function'],
          format: ['UPPER_CASE'],
          custom: {
            regex: '^[A-Z0-9_]+$',
            match: true,
          },
        },
        // --- 5. 따옴표가 필요한 속성 (e.g. API 응답 필드 등) ---
        {
          selector: 'property',
          modifiers: ['requiresQuotes'],
          format: null,
        },
        // --- 6. 일반 변수 (대문자 2개 이상 연속 사용 금지 e.g. myID ) ---
        {
          selector: ['variable'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
          custom: {
            regex: '([A-Z]{2,})',
            match: false,
          },
        },
        // --- 7. 일반 함수 (소문자 시작) ---
        {
          selector: 'function',
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
        // --- 8. 타입 관련 요소 ---
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        // --- 9. enum 멤버 ---
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],
    },
  },
  // =====================================================================
  // React 설정 (.jsx, .tsx 파일에만 적용)
  // =====================================================================
  {
    files: ['**/*.{jsx,tsx}'],
    ...eslintPluginReact.configs.flat['jsx-runtime'],
    ...eslintPluginReactHooks.configs.recommended,
    ...eslintPluginReactRefresh.configs.vite,
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
      'react-refresh': eslintPluginReactRefresh,
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
  // JSX 접근성 설정 (.jsx, .tsx 파일에만 적용)
  // =====================================================================
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'jsx-a11y': eslintPluginJsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // JSX 문법 사용
        },
      },
    },
    rules: {
      ...eslintPluginJsxA11y.configs.recommended.rules,
      // 추가적인 접근성 규칙 설정
      'jsx-a11y/anchor-is-valid': 'warn', // 유효하지 않은 앵커 태그 경고
      'jsx-a11y/no-static-element-interactions': 'off', // 정적 요소에 이벤트 핸들러 사용 - MUI
      'jsx-a11y/click-events-have-key-events': 'off', // 클릭 이벤트가 키 이벤트를 가져야 하는지 여부 - MUI
      'jsx-a11y/alt-text': 'warn', // 이미지에 alt 속성이 없을 때 경고
      'jsx-a11y/aria-props': 'warn', // 올바르지 않은 aria 속성 사용 시 경고
    },
  },

  // =====================================================================
  // Import 관련 설정  (.ts, .tsx 파일에만 적용)
  // =====================================================================
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser, // TypeScript 코드를 파싱할 파서 지정
      parserOptions: {
        project: [
          './tsconfig.json',
          './tsconfig.node.json',
          './tsconfig.app.json',
        ], // Explicitly list all tsconfig files
        tsconfigRootDir: import.meta.dirname, // `tsconfig.json`을 찾을 기준 디렉토리 (현재 설정 파일 기준)
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'import-x': eslintPluginImportX,
    },
    rules: {
      // import 순서 규칙 설정
      'import-x/order': [
        'error', // 'warn'로 변경?
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          pathGroups: [
            {
              // React external 그룹으로
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              // alias경로를 internal 그룹으로
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'], // 항상 최상위에 위치하게 됨
          named: true,
          alphabetize: {
            // 알파벳 순서로 정렬
            order: 'asc', // 오름차순 정렬
            caseInsensitive: true, // 대소문자 구분 없이 정렬
          },
          'newlines-between': 'always',
          warnOnUnassignedImports: false,
          sortTypesGroup: true,
          'newlines-between-types': 'always',
        },
      ],
      'sort-imports': 'off', // es기본 import 정렬 규칙 비활성화 (import/order로 대체)
    },
  },

  // =====================================================================
  // * Prettier 통합 (항상 마지막에 위치해야 Prettier 규칙이 다른 ESLint 규칙을 덮어씁니다.)
  // =====================================================================

  eslintPluginConfigPrettier
);
