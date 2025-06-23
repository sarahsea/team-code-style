# FE code-style

프론트엔드 팀의 통일된 코드 스타일을 위한 설정 관련 파일 모음입니다

## 코드스타일 관련 파일

```
📦.vscode
 ┗ 📜settings.json

# ESLint
📜eslint.config.js (변경: flat config 채택, .eslintignore는 쓰지 않음 - 파일 내 선언)

# prettier
📜.prettierignore
📜.prettierrc

# editorconfig
📜.editorconfig

```

## IDE 관련

## ✅ VSCode 권장 버전

- 권장 버전: `>=1.85.0`
- 확인 명령어: `code --version`

## 설정 파일 외에 살펴 보아야 할 환경 세팅

IDE 별로 코드 스타일 관련 세팅 확인 필요

- editorconfig 적용

  - vscode > extensions "editorConfig for VS Code"
  - JetBrains 기본 내장 지원
    - 다만, 설정 확인: Editor > Code Style > Enable EditorConfig support 체크 여부 확인 (기본 켜져 있음)

- ESLint / Prettier 적용
  - vscode > 워크스페이스 (.vscode/settings.json) > "editor.formatOnSave" 등 예시 확인
  - Jetbrains계열 > Preferences > languages & Framworks > javascript > Code Quality Tools
    > ESLint 설정 파일 경로 지정 | Prettier on save, configuration file 등

## 참고 노션

[FE 공통 코드 스타일](https://www.notion.so/FE_-203c3da292658061a563ed3827f1d357?source=copy_link)

## 기타 파일, 폴더 설명

- src/entities : eslint 규칙 적용 확인을 위한 예시 코드에 필요한 임의 코드 파일
- src/eslint-flat-config: 규칙 조사 단계에서 적용했던 기존 config 예시
- src/test : eslint 규칙 적용 확인을 위한 테스트 코드 파일 (incorrect / correct 코드 예제 비교)
- tsconfig.json, vite.config.mts : typescript-eslint 설정을 위해 실제 프로젝트와 유사하게 구성
