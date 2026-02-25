import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default defineConfig([
  // [1] Next.js 전용 최적화 규칙 (Core Web Vitals, TS 체크 등)
  ...nextVitals,
  ...nextTs,

  // [2] TypeScript 권장 규칙
  ...tseslint.configs.recommended,

  // [3] 전역 무시 폴더 설정
  globalIgnores([
    '.next/**', // Next.js 빌드 폴더
    'out/**', // Next.js 빌드 폴더
    'build/**', // Next.js 빌드 폴더
    'next-env.d.ts', // Next.js 타입 정의 파일
    'public/**', // Next.js 정적 파일 폴더
    'node_modules/**', // Node.js 모듈 폴더
  ]),

  // [4] 메인 설정 블록
  {
    files: ['**/*.{ts,tsx}'], // 적용할 파일 확장자 지정
    plugins: {
      react,
      'react-hooks': reactHooks,
    },

    // 언어 및 파싱 설정
    languageOptions: {
      ecmaVersion: 2023, // 최신 문법 사용
      sourceType: 'module', // ES6 모듈 시스템 사용
      parserOptions: {
        ecmaFeatures: { jsx: true }, // JSX 문법 지원
        project: ['./tsconfig.json'], // TypeScript 설정 파일 경로
        tsconfigRootDir: import.meta.dirname, // TypeScript 설정 파일 루트 경로
      },

      // 사용 가능한 전역 변수 정의
      globals: {
        ...globals.browser, // 브라우저 전역 변수
        ...globals.node, // Node.js 전역 변수
        ...globals.es2023, // ES2023 전역 변수
      },
    },
    settings: {
      react: { version: 'detect' }, // 설치된 React 버전 자동 감지
    },
    rules: {
      // ===== React 관련 기본 규칙들 =====
      ...react.configs.recommended.rules, // React 권장 규칙
      ...react.configs['jsx-runtime'].rules, // React JSX 런타임 규칙
      ...reactHooks.configs.recommended.rules, // React Hooks 권장 규칙

      // ===== 기본적인 JS/TS 문법 관련 규칙 =====
      'prefer-const': 'warn', // 재할당하지 않는 변수는 const 사용 권장 (경고)
      'no-var': 'error', // var 사용 금지 (에러)
      'no-unused-vars': 'off', // 사용하지 않는 변수 검사 비활성화
      '@typescript-eslint/no-unused-vars': [
        'warn', // 사용하지 않는 변수 검사 (경고)
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // ===== 타입 관련 규칙 =====
      '@typescript-eslint/no-explicit-any': 'warn', // any 타입 사용 경고

      // ===== 기타 규칙 =====
      'no-console': 'warn', // console 사용 경고
      'no-duplicate-imports': 'warn', // 중복 import 경고

      // ===== React 스타일 규칙 =====
      'react/prop-types': 'off', // PropTypes 사용 강제 안함 (TypeScript 사용)
      'react/react-in-jsx-scope': 'off', // React import 강제 안함 (React 17+)
      'react/jsx-uses-react': 'off', // React 사용 감지 안함 (React 17+)
      'react/jsx-boolean-value': 'warn', // boolean prop 축약 권장
      'react/jsx-fragments': 'warn', // Fragment 단축 문법 권장
      'react/jsx-no-useless-fragment': 'warn', // 불필요한 Fragment 경고
    },
  },
  // [5] Prettier와 충돌하는 ESLint 규칙들 비활성화
  prettier, // 포맷팅은 Prettier가 담당, ESLint는 코드 품질만 담당
])
