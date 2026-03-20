import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oz-project-scentmatch.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  reactCompiler: true,
  // Next.js 16: Turbopack 기본 사용. SVG를 React 컴포넌트로 import 하기 위해 SVGR 사용
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          { loader: require.resolve('@svgr/webpack'), options: { icon: true } },
        ],
        as: '*.js',
      },
    },
  },
}

export default nextConfig
