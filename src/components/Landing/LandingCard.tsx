function LandingCard({
  title,
  description,
  link,
  imgSrc,
}: {
  title: string
  description: string
  link: string
  imgSrc: string
}) {
  return (
    <div className="flex h-78.25 w-91 flex-col gap-4 rounded-[24px] bg-[#FBF9F7] p-8.25 shadow-md">
      <img src={imgSrc} alt={title} className="mb-2 h-16.25 w-16.25" />
      <h2 className="text-2xl font-bold">{title}</h2>
      <p>{description}</p>
      <a href={link} className="text-black-primary">
        시작하기 →
      </a>
    </div>
  )
}

export default LandingCard
