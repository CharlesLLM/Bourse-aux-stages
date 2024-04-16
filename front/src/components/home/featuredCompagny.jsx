import React from "react";

function FeaturedCompagny() {

  const data = [
    '../../public/placeholder.webp',
    '../../public/placeholder.webp',
    '../../public/placeholder.webp',
    '../../public/placeholder.webp',
    '../../public/placeholder.webp',
  ]

  return (
    <div>
      <p className="text-grey">Entreprises à la une</p>
      <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 gap-8">
        {data.map((compagnyLogo) => (
          <img src={compagnyLogo} alt="compagnyLogo" />
        ))}
      </div>
    </div>
  )
}

export default FeaturedCompagny;
