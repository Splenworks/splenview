import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import CloseIcon from "./assets/xmark.svg?react"
import FilledStar from "./assets/star-filled.svg?react"

const adItem = {
  name: "Akira Toriyama's Manga Theater Hardcover - December 7, 2021",
  desc: "An extensive collection of imaginative and action-packed short stories from the creator of Dragon Ball, Akira Toriyama! From Akira Toriyama, the legendary manga creator of Dragon Ball, comes this special collection of short stories spanning the first few decades of his career. Serving as both a collection of his early works and a history of his life as a manga writer and illustrator, this giant tome is packed with everything you could ever want as a fan of classic shonen manga.",
  image: "https://m.media-amazon.com/images/I/81UUncqngWL._SL1500_.jpg",
  url: "https://amzn.to/44VchvH",
  stars: 4.8,
  reviews: 564,
}

const AmazonAd: FC = () => {
  const { t } = useTranslation()
  const [closed, setClosed] = useState(false)

  if (closed) return null

  return (
    <div className="fixed min-w-80 max-w-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl">
      <div className="bg-pink-900 text-white flex justify-center items-center relative h-8">
        <span className="text-sm font-semibold">{t("others.ad")}</span>
        <CloseIcon
          className="absolute right-2 w-3 h-3 ml-2 cursor-pointer"
          onClick={() => setClosed(true)}
        />
      </div>
      <div
        className="p-4 bg-white flex gap-6 cursor-pointer"
        onClick={() => window.open(adItem.url, "_blank")}
      >
        <div className="flex items-center justify-center">
          <img
            src={adItem.image}
            alt={adItem.name}
            className="h-full max-w-60 max-h-60 object-contain"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">{adItem.name}</span>
          <div className="flex items-center">
            {new Array(5).fill(0).map((_, i) => (
              <FilledStar key={i} className="w-4 h-4 text-yellow-500" />
            ))}
            <span className="ml-1 text-sm font-semibold text-gray-500">
              {adItem.stars} ({adItem.reviews} reviews)
            </span>
          </div>
          <p className="mt-2 mb-3 line-clamp-4 text-gray-500 text-sm leading-5">
            {adItem.desc}
          </p>
          <div>
            <button
              className="text-sm bg-yellow-500 text-black px-3 py-2 rounded transition-colors duration-300 ease-in-out mb-1"
              style={{ fontStretch: "condensed" }}
            >
              Shop on Amazon
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AmazonAd
