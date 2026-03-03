/**
 * Next.js Instrumentation
 * - 서버(Node) 런타임에서 MSW 설정 시 여기서 setupServer.listen() 호출
 * - 클라이언트 모킹은 MockProvider에서 setupWorker 사용
 */
export async function register() {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'

  if (process.env.NEXT_RUNTIME === 'nodejs' && useMock) {
    const { server } = await import('./mocks/server')

    server.listen({
      onUnhandledRequest: 'bypass',
    })

    console.log('✅ MSW Server Mocking Enabled')
  }
}
