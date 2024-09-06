import Link from "next/link";
import Image from "next/image";
import { CardItemProps } from "@/types/cards";
import React from "react";

const CardsItemTwo: React.FC<CardItemProps> = ({
  cardImageSrc,
  cardTitle,
  cardContent,
  children,
}) => {
  return (
    <div className="rounded-sm  border-b-10 border-r-8 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between">
        <div className="p-6">
          <h4 className="mb-3 text-xl font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary">
            {cardTitle}
          </h4>
          <p>{cardContent}</p>
        </div>
        <div className="block px-6 pt-4">
          <Image
            width={600}
            height={300}
            src={cardImageSrc || ""}
            alt="Cards"
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default CardsItemTwo;
