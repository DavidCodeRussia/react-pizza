import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => (
  <div className="content__loader pizza-block">
    <ContentLoader
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="127" cy="127" r="127" />
      <rect x="0" y="270" rx="5" ry="5" width="280" height="27" />
      <rect x="0" y="317" rx="5" ry="5" width="280" height="88" />
      <rect x="4" y="429" rx="5" ry="5" width="60" height="27" />
      <rect x="128" y="421" rx="5" ry="5" width="152" height="45" />
    </ContentLoader>
  </div>
)

export default Skeleton
