import React, { PropsWithChildren, useState } from "react"
import { twJoin } from "tailwind-merge"

interface TooltipProps {
  text: string
  place?: "bottom" | "top"
  align?: "left" | "right" | "center"
}

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({
  children,
  text,
  place = "top",
  align = "center",
}) => {
  const [showTooltip, setShowTooltip] = useState(false)

  if (!text) {
    return <>{children}</>
  }

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="relative cursor-pointer"
    >
      {children}
      {showTooltip && (
        <>
          <div
            className={twJoin(
              "absolute transform",
              place === "top"
                ? "bottom-full -translate-y-1"
                : "top-full translate-y-1",
              align === "left"
                ? "left-0"
                : align === "right"
                  ? "right-0"
                  : "left-1/2 -translate-x-1/2",
            )}
            style={{ width: "max-content" }}
          >
            <div className="px-2 py-1 bg-zinc-500 rounded bg-opacity-50">
              <p className="font-normal text-xs text-white">{text}</p>
            </div>
          </div>
          <div
            className={twJoin(
              "absolute border-solid border-opacity-50 border-x-transparent border-x-4 left-1/2 transform -translate-x-1/2",
              place === "bottom"
                ? "border-b-zinc-500 border-b-4 border-t-0"
                : "border-t-zinc-500 border-t-4 border-b-0",
              place === "top" ? "bottom-full" : "top-full",
            )}
          ></div>
        </>
      )}
    </div>
  )
}

export default Tooltip
