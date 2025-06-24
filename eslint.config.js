// @ts-check
import eslint from '@eslint/js';
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
      '**/*.stories.ts',
      '**/*.stories.tsx',
      '.storybook/**/*.ts',
      '.storybook/**/*.tsx',
      '**/legacy/**', // 레거시 코드 폴더

      // 예: '.next/', '.svelte-kit/', '.output/', 'public/', 'assets/'
    ],
  },
  // ESLint 자체의 권장 규칙 세트
  eslint.configs.recommended,
  // TypeScript ESLint의 권장 규칙 세트
  tseslint.configs.recommendedTypeChecked, // recommended를 포함한다

  // =====================================================================
  // 공통 JavaScript (ES Module) 설정
  //    .js, .jsx, .mjs, .ts, .tsx, .vue 파일에 기본적으로 적용됩니다.
  //    (CommonJS 파일은 별도의 섹션에서 처리됩니다.)
  // =====================================================================
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest', // 최신 ECMAScript 버전 문법 지원
      sourceType: 'module', // ES Modules 사용 (`import`/`export`)
      globals: {
        ...globals.browser, // 웹 브라우저 환경 전역 변수 (window, document, console 등)
      },
    },
    rules: {
      // js 팀 규칙 설정 - recommended에 포함되지 않은 규칙들 (논의)

      // ❄️ frozen 안정화 된 규칙들 (--fix가능한, 추천할만한) // warn 쓸거면 안쓰는게 낫지 않을까? fix가능하게
      'arrow-body-style': ['error', 'as-needed'], // 화살표 함수의 중괄호 사용 최소화, always로 할지?
      curly: 'error', // 모든 제어문에 중괄호 사용 강제 if (foo) foo++; -> if (foo) { foo++; }
      'dot-notation': 'error', // 가능한 경우 점 표기법 사용 권장 (obj['prop'] 대신 obj.prop)
      'logical-assignment-operators': 'error', // 논리 연산자 할당 사용 강제 (e.g. `x &&= y` 대신 `x = x && y`)

      // 그 외 제안
      'no-console': ['error', { allow: ['warn', 'error'] }], // console.log 경고, console.warn/error 허용
      eqeqeq: 'error', // `===` 사용 강제 (느슨한 비교 `==` 금지)
      'no-alert': 'error', // alert, confirm, prompt 사용 경고
      'prefer-const': 'error', // 재할당되지 않는 변수는 const 사용 권장
      yoda: 'warn', // Yoda 조건문 사용 경고 (e.g. `if (42 === x)` 대신 `if (x === 42)`)

      // eslint/js recommended에 있지만 명시적
      'no-debugger': 'error', // debugger 사용 금지
      'no-unused-vars': 'error', // 사용하지 않는 변수 금지

      // prettier와 충돌우려 비활성화 옵션 (eslintv9부터는 포매팅 관련 규칙 빠졌지만 명시적으로)
      'no-trailing-spaces': 'off',
      'comma-dangle': 'off',
      'quote-props': 'off',
    },
  },
  // =====================================================================
  // TypeScript 설정 (.ts, .tsx 파일에만 적용)
  // =====================================================================

  {
    files: ['**/*.ts', '**/*.tsx'],
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
    rules: {
      'quote-props': 'off', // prettier와 충돌우려 비활성화

      /* ---  recommended + typeChecked 규칙 중 재정의 --- */
      '@typescript-eslint/ban-ts-comment': [
        // ts-comment에 대한 금지, 단 주석과 함께 허용 등 예외 처리
        'error',
        {
          'ts-ignore': 'allow-with-description', // ts-ignore(바로 다음줄 모든 ts오류 억제) 사용을 허용하되 설명이 필요함
          'ts-expect-error': 'allow-with-description', // ts-expect-error(위와 유사) 사용을 허용하되 설명이 필요함
          'ts-nocheck': true, // ts-nocheck(파일 전체 ts오류 억제) 사용을 금지
          'ts-check': false, // ts-check(파일 전체 ts오류 검사-주로타입검사 비활성화된 파일대상) 사용 허용
        },
      ],
      // '@typescript-eslint/no-unsafe-return': 'warn', // any 타입을 반환하는 함수 경고 // recommended "error"
      // '@typescript-eslint/no-unsafe-assignment': 'warn', // any 타입을 할당하는 경우 경고 reccommended 'error'

      /* --- eslint/js 커스텀 규칙 설정 --- */
      eqeqeq: 'error', // `===` 사용 강제 (느슨한 비교 `==` 금지)
      'no-console': ['error', { allow: ['warn', 'error'] }], // console.log 경고, console.warn/error 허용
      'prefer-const': 'error', // 재할당되지 않는 변수는 const 사용 권장

      /* --- ts-eslint 커스텀 규칙 설정 --- */
      // ts-eslint 커스텀 - eslint/js off 필요한 경우
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': 'error', // 점 표기법 사용 권장 (TypeScript에서 처리)

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        // 사용되지 않는 변수 경고 (아래 조건에서는 허용)
        'error',
        {
          varsIgnorePattern: '^_', // 변수 이름이 언더스코어로 시작하는 경우 무시
          argsIgnorePattern: '^_', // 매개변수 이름이 언더스코어로 시작하는 경우 무시
          ignoreRestSiblings: true, // 구조분해에서 잔여 속성 무시 가능
        },
      ],

      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': [
        // magic numbers 사용 금지
        'error',
        {
          ignore: [0, 1, -1], // 일반적으로 사용되는 숫자들 허용
          ignoreEnums: true, // enum 값은 허용 // enum foo { SECOND = 1000 }
          ignoreNumericLiteralTypes: true, // 숫자 리터럴 타입은 허용 // type SmallPrimes = 2 | 3 | 5 | 7 | 11;
          ignoreReadonlyClassProperties: true, // 읽기 전용 클래스 속성은 허용
          ignoreTypeIndexes: true, // 타입 인덱스는 허용 // type Foo = Bar[0];
          ignoreArrayIndexes: true, // 배열 인덱스는 허용
          ignoreDefaultValues: true, // 기본값은 허용 (예: 함수 매개변수의 기본값)
          ignoreClassFieldInitialValues: true, // 클래스 필드 초기값은 허용
          enforceConst: true, // 상수로 선언된 숫자만 허용
          detectObjects: false, // 객체의 숫자 값은 감지하지 않음
        },
      ],

      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off', // 변수를 선언 전에 사용하는 것을 금지 off

      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': [
        //eslint의 no-unused-expressions 확장
        'warn',
        {
          allowShortCircuite: false, // isReady && start() 금지 -> if문 대체
          allowTernary: false, // isReady ? start() : null 금지 -> if문 대체
          allowTaggedTemplates: true, // 태그드 템플릿 리터럴 허용 styled.idv`` styled-components에서는 허용 필수
        },
      ],

      // ts-eslint 커스텀 - eslint/js 연관 x
      '@typescript-eslint/no-explicit-any': 'warn', // `any` 타입 사용 경고
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수 반환 타입 명시 강제 끄기 (필요 시 'error'로 변경)
      '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 명시 강제 끄기 (필요 시 'error'로 변경)
      '@typescript-eslint/no-empty-interface': 'off', // 빈 interface 선언 금지 (모델 정의 부분에서 class와 interface를 합치기 위해 사용하는 용법도 잡고 있어서)
      '@typescript-eslint/no-non-null-assertion': 'off', // Non-null assertion (`!`) 사용 금지 off (warn?)

      // stylistic 규칙 (논의)
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }], // 배열 타입을 `Type[]` 형식으로 강제
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'off', // 구현 없이 비어 있는 함수를 금지 off
      '@typescript-eslint/prefer-nullish-coalescing': 'off', // Nullish coalescing (`??`) 연산자 사용 권장

      /* --- 네이밍 컨벤션 규칙 --- */
      '@typescript-eslint/naming-convention': [
        'error',
        // --- 1. React 컴포넌트 변수 (e.g. const MyComponent = () => <div />) ---
        {
          selector: 'variable',
          types: ['function'],
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },

        // --- 2. React 컴포넌트 함수 선언 (e.g. function MyComponent() {}) ---
        {
          selector: 'function',
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
          filter: {
            regex: '^[A-Z]', // 이름이 대문자로 시작하는 함수만 해당
            match: true,
          },
        },
        // --- 3. 함수 매개변수 및 생성자 파라미터 속성 ---
        {
          selector: ['parameter', 'parameterProperty'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'forbid',
        },
        // --- 4. const로 선언된 불변 데이터 변수 ---
        {
          selector: 'variable',
          modifiers: ['const'],
          types: ['string', 'number'],
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
      'react/prop-types': 'off', // TypeScript 사용 시 PropTypes는 일반적으로 불필요
      'react/react-in-jsx-scope': 'off', // React 17+에서 더 이상 `import React`가 필요 없으므로 비활성화
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

      // react-hooks
      'react-hooks/rules-of-hooks': 'error', // React Hooks 규칙 위반 시 오류
      'react-hooks/exhaustive-deps': 'warn', // `useEffect` 등의 의존성 배열 누락/오류 시 경고

      // react-refresh
      'react-refresh/only-export-components': [
        'error',
        { allowConstantExport: true },
      ], // 컴포넌트만 export하도록 강제 (상수 export 허용 for vite)
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
      // 기존 eslint-plugin-import의 권장 주요 규칙 적용
      'import-x/default': 'error', // default export가 없는 경우 오류
      'import-x/named': 'error', // named export가 없는 경우 오류
      'import-x/namespace': 'error', // namespace import가 없는 경우 오류
      'import-x/no-unresolved': 'error', // 모듈을 찾을 수 없는 경우 오류
      'import-x/no-duplicates': 'warn', // 중복된 import 경고
      'import-x/no-absolute-path': 'warn', // 절대 경로 import 경고

      // 그 외 import-x 규칙 설정
      'import-x/no-self-import': 'error', // 자기 자신을 import하는 경우 오류
      'import-x/no-cycle': 'error', // 순환 참조 import 금지
      'import-x/no-useless-path-segments': 'error', // 불필요한 경로 세그먼트 제거

      // import 순서 규칙 설정
      'sort-imports': 'off', // es기본 import 정렬 규칙 비활성화 (import/order로 대체)

      'import-x/order': [
        'error', //
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
    },
  },

  // =====================================================================
  // * Prettier 통합 (가장 아래에 위치해야 다른 포맷팅 관련 규칙을 모두 무시하고 Prettier가 우선 적용되도록 함)
  // =====================================================================

  eslintPluginConfigPrettier,
);
