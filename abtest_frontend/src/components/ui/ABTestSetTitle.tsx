"use client"

import { Typography } from "@material-tailwind/react";

interface ABTestSetTitleProps {
    title: string
}

const ABTestSetTitle = ({
    title
}: ABTestSetTitleProps) => (
    <div className="flex flex-row mt-5">
        <div className="flex flex-col w-full">
          <Typography variant="h1" className="flex items-center w-full">
            {title}
          </Typography>
          <hr className="my-3 mt-5" style={{ borderColor: "#f75934" }} />
        </div>
      </div>
)

export default ABTestSetTitle;