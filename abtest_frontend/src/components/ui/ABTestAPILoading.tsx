"use client";
import { Spinner } from "@material-tailwind/react";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const ABTestAPILoading = () => {
  const { state } = useContext(AppContext);
  const { loading } = state;
  return (
    loading && (
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
          overflow: 'hidden'
        }}
      >
        <Spinner className="h-12 w-12" style={{ color: "#c88806" }} speed={2000}/>
      </div>
    )
  );
};

export default ABTestAPILoading;
