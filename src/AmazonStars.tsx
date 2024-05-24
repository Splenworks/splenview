import React from "react"
import FilledStar from "./assets/star-filled.svg?react"
import EmptyStar from "./assets/star-empty.svg?react"
import HalfStar from "./assets/star-half.svg?react"

interface AmazonStarsProps {
  rating: number
}

const AmazonStars: React.FC<AmazonStarsProps> = ({ rating }) => {
  const integerPart = rating >= 5 ? 5 : Math.floor(rating)
  const floatingPart = Math.round((rating - integerPart) * 10)
  const filledStarCount = integerPart + (floatingPart > 7 ? 1 : 0) // 0.8 and 0.9 will be considered as full star
  const hasHalfStar = floatingPart >= 3 && floatingPart <= 7 // 0.3 to 0.7 will be considered as half star
  const emptyStarCount = 5 - filledStarCount - (hasHalfStar ? 1 : 0)

  return (
    <>
      {new Array(filledStarCount).fill(0).map((_, i) => (
        <FilledStar key={i} className="w-4 h-4 text-yellow-500" />
      ))}
      {hasHalfStar && <HalfStar className="w-4 h-4 text-yellow-500" />}
      {new Array(emptyStarCount).fill(0).map((_, i) => (
        <EmptyStar key={i} className="w-4 h-4 text-yellow-500" />
      ))}
    </>
  )
}

export default AmazonStars
