import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import globals from 'globals';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import json from '@eslint/json';
import markdown from '@eslint/markdown';

export default tseslint.config(
  // 1. 전역 설정 (모든 파일에 적용)
  {
    ignores: [
      'dist/',
      'build/',
      'node_modules/',
      'coverage/',
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs',
      '**/*.test.{js,ts,mjs,cts,mts,jsx,tsx}',
      '**/*.stories.{js,ts,mjs,cts,mts,jsx,tsx}',
    ],
  },
  // 2. 기본 JavaScript (ES Module) 설정
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022, // 최신 ECMAScript 버전 사용
        globals: {
          ...globals.browser,
          ...globals.node,
          // sourceType: 'module', // ES Module 사용
          // ecmaFeatures: { jsx: true },
        },
      },
    },
    // ESLInt 기본 규칙 설정
    ...js.configs.recommended,
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['**/*.{cjs}'],
  },
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    extends: [
      ...tseslint.configs.recommended, // 기본 TypeScript 권장 규칙
      //      ...tseslint.configs.recommendedTypeChecked, // 타입 정보가 필요한 규칙 (성능 저하 주의)
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true, // `tsconfig.json` 파일에서 타입 정보를 로드
        tsconfigRootDir: import.meta.dirname, // `tsconfig.json`을 찾을 기준 디렉토리
      },
    },
    rules: {
      // TypeScript 관련 규칙 추가 또는 재정의
      '@typescript-eslint/no-explicit-any': 'warn', // `any` 사용 경고
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수 반환 타입 명시 강제 끄기 (필요 시 on)
      '@typescript-eslint/no-non-null-assertion': 'off', // Non-null assertion (!) 사용 허용 (필요 시 on)
      '@typescript-eslint/prefer-nullish-coalescing': 'warn', // Nullish coalescing (??) 사용 권장
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }], // 배열 타입 `Type[]`으로 강제
      '@typescript-eslint/consistent-type-imports': 'warn', // TypeScript에서 일관된 타입 import 사용
    },
  },

  {
    files: ['ts,mts,cts,tsx'],
  },
  // {
  //   files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  //   languageOptions: { globals: globals.browser },
  //   ...eslintPluginReact.configs.flat.recommended,
  //   rules: {
  //     'react/display-name': 'off',
  //   },
  // },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  }
  // {
  //   files: ['**/*.md'],
  //   plugins: { markdown },
  //   language: 'markdown/gfm',
  //   extends: ['markdown/recommended'],
  // },
);
