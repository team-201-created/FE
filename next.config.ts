import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Next.js 16: Turbopack 기본 사용. SVG를 React 컴포넌트로 import 하기 위해 SVGR 사용
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [{ loader: '@svgr/webpack', options: { icon: true } }],
        as: '*.js',
      },
    },
  },
  // --webpack 플래그로 빌드할 때 사용
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: { test?: RegExp }) => rule?.test instanceof RegExp && rule.test.test('.svg')
    ) as { exclude?: RegExp } | undefined
    if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/i
    config.module.rules.push({
      test: /\.svg$/i,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    })
    return config
  },
}

export default nextConfig
