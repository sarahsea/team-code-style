module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jsx-a11y",
    "unused-imports",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "prettier", // prettier 충돌 방지
  ],
  rules: {
    // 팀 선호 기반
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "react/react-in-jsx-scope": "off", // React 17+
    "react/prop-types": "off", // TypeScript 사용 시 불필요
    "@typescript-eslint/consistent-type-imports": "warn", // 일반 import로 타입만 가져옴 경고
    "@typescript-eslint/no-explicit-any": "warn", // any 사용 억제
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // 안쓰는 변수 방지, 언더바로 시작 시 허용

    // 가독성 관련
    "object-curly-spacing": ["error", "always"], // import { a, b } 공백 선호
    "comma-dangle": ["error", "only-multiline"], // 여러줄 구조에서만 마지막 쉼표 강제, 단일줄에서는 쉼표x
    indent: ["error", 2, { SwitchCase: 1 }], // 들여쓰기 2칸
    quotes: ["error", "single", { avoidEscape: true }], // 기본 따옴표 싱글, 단 문자열 안에 이미 싱글 쓰면 더블 인정
    semi: ["error", "always"], // 세미콜론 강제

    // 그 외 권장
    "react-hooks/exhaustive-deps": "warn", // useXX React훅 의존성 배열 누락 경고
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
