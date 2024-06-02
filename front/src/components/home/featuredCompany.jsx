function FeaturedCompany() {
  const data = [
    '../../public/placeholder.webp',
    '../../public/placeholder.webp',
    '../../public/placeholder.webp',
    '../../public/placeholder.webp',
    '../../public/placeholder.webp',
  ]

  return (
    <div className="space-y-4">
      <p className="text-grey">Entreprises à la une</p>
      <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 gap-8">
        {data.map((companyLogo) => (
          <img src={companyLogo} alt="companyLogo" />
        ))}
      </div>
    </div>
  )
}

export default FeaturedCompany;
