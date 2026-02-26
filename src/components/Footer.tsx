const styles = {
  footer: 'border-t border-neutral-200 bg-white',
  container: 'mx-auto max-w-6xl px-4 py-12 sm:px-6',
  grid: 'grid grid-cols-1 gap-10 md:grid-cols-3',
  logo: 'text-xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent',
  description: 'mt-3 text-sm leading-relaxed text-neutral-600',
  snsWrap: 'mt-4 flex gap-2',
  snsIcon: 'size-10 shrink-0',
  sectionTitle: 'text-sm font-bold text-neutral-900',
  list: 'mt-3 space-y-2',
  listItem: 'text-sm text-neutral-600',
  bottomWrap: 'mt-10 border-t border-neutral-200 pt-6',
  bottomInner: 'flex flex-col items-center justify-between gap-4 sm:flex-row',
  copyright: 'text-sm text-neutral-500',
  bottomLinksWrap: 'flex items-center gap-2 text-sm text-neutral-600',
  bottomDot: 'inline-block size-1 shrink-0 rounded-full bg-neutral-400',
} as const

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <p className={styles.logo}>DeepScent</p>
            <p className={styles.description}>
              디지털 조향 솔루션으로 당신만의 향기를 찾아보세요.
              <br />
              AI 기반 추천 시스템과 전문 향기 분석으로 완벽한 조합 향기를 경험하세요.
            </p>
            <div className={styles.snsWrap}>
              <img src="/LinkA.svg" alt="" width={40} height={40} className={styles.snsIcon} />
              <img src="/LinkB.svg" alt="" width={40} height={40} className={styles.snsIcon} />
              <img src="/LinkC.svg" alt="" width={40} height={40} className={styles.snsIcon} />
            </div>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>서비스</h3>
            <ul className={styles.list}>
              <li><span className={styles.listItem}>향기 테스트</span></li>
              <li><span className={styles.listItem}>건강 테스트</span></li>
              <li><span className={styles.listItem}>AI 추천</span></li>
              <li><span className={styles.listItem}>향기 저장소</span></li>
              <li><span className={styles.listItem}>상품 둘러보기</span></li>
            </ul>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>고객지원</h3>
            <ul className={styles.list}>
              <li><span className={styles.listItem}>공지사항</span></li>
              <li><span className={styles.listItem}>FAQ</span></li>
              <li><span className={styles.listItem}>이용약관</span></li>
              <li><span className={styles.listItem}>개인정보처리방침</span></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>© 2026 DeepScent. All rights reserved.</p>
            <div className={styles.bottomLinksWrap}>
              <span className={styles.listItem}>이용약관</span>
              <span className={styles.bottomDot} aria-hidden />
              <span className={styles.listItem}>개인정보처리방침</span>
              <span className={styles.bottomDot} aria-hidden />
              <span className={styles.listItem}>문의하기</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
