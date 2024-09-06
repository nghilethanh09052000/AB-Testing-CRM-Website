"use client";

import Image from "next/image";
const ABTestCircleLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        cursor: "wait",
        pointerEvents: "fill",
        userSelect: "none",
      }}
    >
      <Image
        src="/images/icons/loading.gif"
        alt="Loading Logo"
        width={150}
        height={150}
        priority
      />
    </div>
  );
};
export default ABTestCircleLoading
