"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo.svg"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <React.Fragment>
              <Link
                href="/"
                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  pathname === "/" && "bg-graydark dark:bg-meta-4"
                }`}
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1184_13869)">
                    <path
                      d="M10.8559 0.506226C10.5184 0.506226 10.209 0.787476 10.209 1.1531V6.7781C10.209 7.1156 10.4902 7.42498 10.8559 7.42498H16.8746C17.0434 7.42498 17.2121 7.3406 17.3246 7.2281C17.4371 7.08748 17.4934 6.91873 17.4934 6.74998C17.2684 3.23435 14.3434 0.506226 10.8559 0.506226ZM11.4746 6.1031V1.79998C13.809 2.08123 15.6934 3.82498 16.1434 6.13123H11.4746V6.1031Z"
                      fill=""
                    />
                    <path
                      d="M15.384 8.69057H9.11211V2.6437C9.11211 2.3062 8.83086 2.02495 8.49336 2.02495C8.40898 2.02495 8.32461 2.02495 8.24023 2.02495C3.96523 1.99682 0.505859 5.48432 0.505859 9.75932C0.505859 14.0343 3.99336 17.5218 8.26836 17.5218C12.5434 17.5218 16.0309 14.0343 16.0309 9.75932C16.0309 9.59057 16.0309 9.42182 16.0027 9.2812C16.0027 8.9437 15.7215 8.69057 15.384 8.69057ZM8.26836 16.2562C4.66836 16.2562 1.77148 13.3593 1.77148 9.75932C1.77148 6.32807 4.47148 3.48745 7.87461 3.29057V9.30932C7.87461 9.64682 8.15586 9.9562 8.52148 9.9562H14.7934C14.6809 13.4437 11.784 16.2562 8.26836 16.2562Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1184_13869">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                  Home Page
              </Link>
            </React.Fragment>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Sipher Game --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/sipher-game" ||
                  (pathname?.includes("/sipher-game") ?? false)
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname?.includes("/sipher-game") ?? false) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 64 64"
                          xmlns="http://www.w3.org/2000/svg"
                          strokeWidth="3"
                          stroke="#000000"
                          fill="white"
                        >
                          <path d="M54.2,42.29,50,28.61l-.09-4.88c0-2.1-2.42-4.89-4.91-5.13a11.64,11.64,0,0,0-7.69,2,7.43,7.43,0,0,1-3.84,1.15H28.26a7.37,7.37,0,0,1-3.84-1.15,11.64,11.64,0,0,0-7.69-2c-2.5.24-4.91,3-4.91,5.13l-.1,4.88L7.54,42.29A4.14,4.14,0,0,0,9.9,47.75c2.72,1.19,5.61-.23,7.29-1.91l2.51-2.33c1.93-1.41,4.26-1,6.65-1h9c2.4,0,4.73-.45,6.66,1l2.5,2.33c1.68,1.68,4.21,3.53,7.3,1.91C53.93,46.65,55.18,44.44,54.2,42.29Z" />
                          <rect
                            x="42.84"
                            y="29.29"
                            width="3.85"
                            height="3.85"
                            rx="1.81"
                            transform="translate(75.97 -13.55) rotate(90)"
                          />
                          <rect
                            x="33.2"
                            y="29.29"
                            width="3.85"
                            height="3.85"
                            rx="1.81"
                            transform="translate(66.33 -3.91) rotate(90)"
                          />
                          <rect
                            x="38.02"
                            y="34.11"
                            width="3.85"
                            height="3.85"
                            rx="1.81"
                            transform="translate(79.88 72.07) rotate(180)"
                          />
                          <rect
                            x="38.02"
                            y="24.47"
                            width="3.85"
                            height="3.85"
                            rx="1.81"
                            transform="translate(79.88 52.78) rotate(-180)"
                          />
                          <circle cx="20.54" cy="31.21" r="3.97" />
                          <path d="M30.87,21.73s-.22-11.32,9.82-13.46" />
                        </svg>
                        Sipher Game
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                        <li>
                            <Link
                              href="/sipher-game/overview"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/sipher-game/overview" &&
                                "text-white"
                              }`}
                            >
                              Overview
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/sipher-game/user-info"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/sipher-game/user-info" &&
                                "text-white"
                              }`}
                            >
                              User Info
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/sipher-game/user-inventory-balance"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/sipher-game/user-inventory-balance" &&
                                "text-white"
                              }`}
                            >
                              User Inventory Balance
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/sipher-game/game-info"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/sipher-game/game-info" &&
                                "text-white"
                              } `}
                            >
                              Game Info
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/sipher-game/game-progression"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/sipher-game/game-progression" &&
                                "text-white"
                              }`}
                            >
                              Game Progression
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/sipher-game/store-review"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white  ${
                                pathname === "/sipher-game/store-review" &&
                                "text-white"
                              }`}
                            >
                              Store Review
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Sipher Game --> */}

              {/* <!-- Menu Item Blockchain --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/blockchain" ||
                  (pathname?.includes("blockchain") ?? false)
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/blockchain" ||
                            (pathname?.includes("blockchain") ?? false)) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 212.000000 237.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g
                            transform="translate(0.000000,237.000000) scale(0.100000,-0.100000)"
                            fill="#fff"
                            stroke="none"
                          >
                            <path
                              d="M984 2352 c-71 -34 -111 -108 -101 -186 l5 -41 -281 -161 -282 -162
                        -28 24 c-58 49 -155 52 -216 6 -64 -47 -89 -147 -55 -218 20 -42 68 -83 105
                        -91 l29 -5 0 -329 0 -329 -37 -15 c-101 -42 -142 -149 -93 -245 32 -63 73 -85
                        156 -85 61 0 75 4 105 26 l35 27 281 -162 281 -161 -5 -42 c-7 -55 18 -124 58
                        -157 65 -55 165 -57 225 -3 49 42 64 77 64 144 l1 58 281 162 281 161 35 -26
                        c31 -23 45 -27 106 -27 83 0 124 22 156 85 49 96 8 203 -93 245 l-37 15 0 329
                        0 329 32 6 c42 8 105 76 114 122 15 83 -21 165 -89 200 -60 32 -151 20 -202
                        -27 -20 -18 -26 -15 -301 144 l-282 162 -4 70 c-2 50 -9 78 -23 96 -52 70
                        -146 96 -221 61z m137 -65 c61 -41 70 -125 18 -176 -52 -53 -134 -44 -176 18
                        -40 60 -22 134 41 165 44 22 78 20 117 -7z m-118 -262 l27 -7 0 -187 0 -186
                        -161 -90 c-89 -49 -170 -94 -180 -99 -15 -7 -52 11 -174 85 l-155 94 0 53 c0
                        28 0 55 1 60 0 4 125 79 277 168 l277 160 30 -22 c17 -12 42 -26 58 -29z m501
                        -123 l258 -150 0 -63 1 -64 -161 -93 -160 -93 -176 102 -176 102 0 186 0 187
                        34 12 c18 7 41 21 51 32 21 23 -13 40 329 -158z m-1270 -107 c59 -28 83 -103
                        51 -164 -14 -28 -68 -61 -100 -61 -32 0 -86 33 -100 61 -23 44 -19 93 12 129
                        42 51 82 61 137 35z m1740 1 c96 -40 102 -167 10 -211 -41 -19 -58 -19 -100 1
                        -85 40 -84 167 0 208 38 19 48 19 90 2z m-762 -292 c84 -53 154 -97 156 -99 2
                        -2 -67 -46 -153 -98 l-157 -96 -156 96 c-87 52 -158 97 -160 98 -3 2 306 193
                        315 195 1 0 71 -43 155 -96z m-732 -11 l145 -88 3 -211 2 -212 -157 -91 c-138
                        -79 -159 -89 -173 -76 -9 8 -32 21 -53 30 l-37 15 0 325 0 324 43 19 c23 10
                        48 26 56 35 7 10 16 17 20 17 3 0 72 -39 151 -87z m1356 52 c20 -14 43 -25 50
                        -25 12 0 14 -59 14 -335 0 -305 -1 -335 -17 -335 -9 0 -31 -12 -50 -26 l-34
                        -26 -127 73 c-70 40 -144 83 -164 96 l-38 23 0 198 0 198 158 91 c86 51 160
                        92 164 93 4 0 24 -11 44 -25z m-971 -282 l165 -98 0 -193 0 -193 -47 28 c-27
                        15 -102 59 -168 98 l-120 71 -3 192 c-1 106 0 192 3 192 3 0 80 -44 170 -97z
                        m555 -96 l0 -193 -87 -51 c-49 -28 -123 -72 -165 -97 l-78 -46 0 193 0 192
                        163 98 c89 53 163 97 165 97 1 0 2 -87 2 -193z m-575 -343 l185 -107 0 -181 0
                        -181 -44 -18 c-25 -10 -50 -24 -56 -32 -8 -10 -68 20 -291 150 l-281 162 -1
                        69 -1 69 150 87 c82 48 150 87 152 88 1 0 86 -48 187 -106z m815 -15 l105 -60
                        -2 -66 -1 -66 -283 -163 -283 -163 -29 25 c-15 13 -39 27 -53 30 l-24 6 0 183
                        0 183 182 105 182 105 50 -29 c28 -16 98 -57 156 -90z m-1420 -24 c63 -33 80
                        -123 33 -175 -95 -104 -253 5 -188 130 28 55 98 75 155 45z m1750 0 c63 -33
                        80 -123 33 -175 -52 -57 -129 -56 -177 1 -81 96 32 232 144 174z m-853 -525
                        c17 -17 33 -42 36 -57 18 -96 -90 -175 -173 -127 -55 33 -74 97 -45 154 22 42
                        53 60 105 60 38 0 52 -5 77 -30z"
                            />
                          </g>
                        </svg>
                        Blockchain
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                        <li>
                            <Link
                              href="/blockchain/overview"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/blockchain/overview" &&
                                "text-white"
                              }`}
                            >
                              Overview
                            </Link>
                          </li>
                       
                       
                         
                       
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Blockchain --> */}

              {/* <!-- Menu Item Social --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/social" ||
                  (pathname?.includes("social") ?? false)
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/social" ||
                            (pathname?.includes("social") ?? false)) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          shapeRendering="geometricPrecision"
                          textRendering="geometricPrecision"
                          imageRendering="optimizeQuality"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          viewBox="0 0 512 336.9"
                          width="30"
                          height="30"
                          fill="white"
                        >
                          <path d="M0 336.9c7-90.55 41.49-58.69 118.75-107.03 23.86 49.79 120.84 53.41 140.73 0 66.68 42.63 117.42 12.48 116.96 107.03H0zm362.41-183.32c-3.39 0-6.15-2.84-6.15-6.34 0-3.49 2.76-6.34 6.15-6.34h57.16c3.39 0 6.15 2.85 6.15 6.34 0 3.5-2.76 6.34-6.15 6.34h-57.16zm0-71.63c-3.39 0-6.15-2.84-6.15-6.34s2.76-6.34 6.15-6.34h104.5c3.39 0 6.15 2.84 6.15 6.34s-2.76 6.34-6.15 6.34h-104.5zm0 35.82c-3.39 0-6.15-2.85-6.15-6.34 0-3.5 2.76-6.34 6.15-6.34h104.5c3.39 0 6.15 2.84 6.15 6.34 0 3.49-2.76 6.34-6.15 6.34h-104.5zm-3.32 102.08 31.01-29.74a6.993 6.993 0 0 1 4.88-1.97l99.91-.02c.83 0 1.59-.33 2.11-.86.55-.58.9-1.33.9-2.15V44.7c0-.81-.35-1.57-.89-2.11-.57-.55-1.33-.9-2.12-.9H334.43c-.77 0-1.52.36-2.09.92-.56.56-.92 1.31-.92 2.09v140.41c0 .81.35 1.57.9 2.12.54.55 1.3.89 2.11.89h17.61c3.89 0 7.05 3.16 7.05 7.05v24.68zm38.7-17.62-40.54 38.88a7.015 7.015 0 0 1-5.21 2.3c-3.9 0-7.06-3.16-7.06-7.05v-34.13h-10.55c-4.69 0-8.96-1.95-12.05-5.03-3.13-3.14-5.06-7.43-5.06-12.09V44.7c0-4.67 1.95-8.97 5.05-12.06 3.1-3.11 7.39-5.06 12.06-5.06h160.46c4.67 0 8.97 1.94 12.08 5.04 3.08 3.12 5.03 7.39 5.03 12.08v140.41c0 4.72-1.93 9-5.02 12.1-3.12 3.09-7.4 5.02-12.09 5.02h-97.1zm-260.83 23.71c-1.03-1.33 2.69-10.5 3.57-11.98-10.09-8.99-18.07-18.05-19.77-36.7l-1.08.02c-2.5-.03-4.91-.6-7.17-1.89-3.61-2.06-6.15-5.59-7.87-9.56-3.64-8.36-15.61-36.07 2.63-33.88-10.2-19.05 12.89-51.59-26.93-63.63 32.67-41.37 101.59-105.16 152.1-41.17 55.28 5.36 72.53 71.06 35.3 107.04 2.18.08 4.24.59 6.06 1.56 6.92 3.7 7.14 11.75 5.33 18.5-1.8 5.64-4.09 9.45-6.24 14.95-2.63 7.42-6.46 8.8-13.86 8-.37 18.35-8.86 27.35-20.26 38.13l3.11 10.58c-15.3 32.46-78.86 33.77-104.92.03z" />
                        </svg>
                        Social
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                        <li>
                            <Link
                              href="/social/overview"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/social/overview" && "text-white"
                              }`}
                            >
                              Overview
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/social/zendesk"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/social/zendesk" && "text-white"
                              }`}
                            >
                              Zendesk
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Social--> */}

              {/* <!-- Menu Item Ather System --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/ather-system" ||
                  (pathname?.includes("ather-system") ?? false)
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/ather-system" ||
                            (pathname?.includes("ather-system") ?? false)) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          width="30"
                          height="30"
                          fill="white"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M508.472352 383.85214c67.34534 0 122.149982 54.804642 122.149982 122.149982s-54.804642 122.149982-122.149982 122.149982-122.149982-54.804642-122.149982-122.149982S441.127012 383.85214 508.472352 383.85214M508.472352 329.563348c-97.44853 0-176.438974 78.990444-176.438974 176.438974s78.990245 176.438974 176.438974 176.438974 176.438974-78.990444 176.438974-176.438974S605.920882 329.563348 508.472352 329.563348M944.657818 613.722888c7.75814-33.08237 11.71086-67.147074 11.71086-101.721833 0-34.574758-3.95272-68.639462-11.71086-101.721833-3.424478-14.6025-18.03817-23.663956-32.64047-20.239478-14.6025 3.424478-23.663956 18.03817-20.239478 32.64047 6.806385 29.023522 10.276233 58.927247 10.276233 89.32084s-3.469847 60.297318-10.276233 89.32084c-3.424478 14.6025 5.636978 29.215992 20.239478 32.64047C926.619648 637.386844 941.23334 628.325387 944.657818 613.722888L944.657818 613.722888zM912.571772 634.571153c1.717835 0 3.155461 0.025982 4.466372 0.082944 14.984441 0.651558 27.660046-10.967564 28.311405-25.952005 0.651558-14.984441-10.967564-27.659847-25.952005-28.311205-2.173127-0.094536-4.374234-0.134309-6.825572-0.134309-14.998631 0-27.157187 12.158756-27.157187 27.157387C885.414585 622.412396 897.573141 634.571153 912.571772 634.571153L912.571772 634.571153zM823.90289 797.944586c-11.086883-17.029254-17.073024-36.869003-17.073024-57.631526 0-58.400005 47.341902-105.741907 105.741907-105.741907 14.998431 0 27.157187-12.158756 27.157187-27.157387 0-14.998431-12.158756-27.157387-27.157187-27.157387-88.397267 0-160.056482 71.659415-160.056482 160.056482 0 31.370131 9.087639 61.488711 25.869461 87.265634 8.183252 12.569478 25.006645 16.125267 37.576123 7.941815C828.530352 827.337257 832.086142 810.513864 823.90289 797.944586L823.90289 797.944586zM640.117097 937.604096c67.575784-20.29564 129.145839-56.493897 179.853459-105.270227 10.809471-10.39775 11.143045-27.589694 0.745295-38.398966s-27.589694-11.143045-38.398966-0.745295c-44.525412 42.829562-98.556179 74.595224-157.823396 92.395556-14.364661 4.314275-22.512137 19.456608-18.197862 33.821269C610.609902 933.770895 625.752236 941.918371 640.117097 937.604096L640.117097 937.604096zM416.297246 923.156492c17.308065-36.78526 54.331963-60.762003 95.703913-60.762003 41.379345 0 78.426227 23.983939 95.731094 60.762003 6.385471 13.571399 22.563902 19.396649 36.1351 13.011178 13.571399-6.385671 19.396649-22.563902 13.011178-36.1351-26.182448-55.646072-82.263425-91.952656-144.877373-91.952656-62.609751 0-118.665745 36.302187-144.850192 91.952656-6.385471 13.571199-0.56042 29.74963 13.010979 36.1351C393.733345 942.553141 409.911576 936.72789 416.297246 923.156492L416.297246 923.156492zM205.250336 833.494882c50.488769 48.177935 111.614725 83.95228 178.654872 104.107015 14.363462 4.318272 29.507994-3.825007 33.826266-18.188468 4.318272-14.363462-3.825007-29.507994-18.188468-33.826266-58.809527-17.680413-112.457954-49.078525-156.796092-91.387239-10.851043-10.35438-28.041388-9.951653-38.395768 0.89939S194.399293 823.140503 205.250336 833.494882L205.250336 833.494882zM113.276295 634.571153c58.400005 0 105.741907 47.341902 105.741907 105.741907 0 21.122679-6.193001 41.291404-17.633844 58.497139-8.304769 12.489532-4.912469 29.346503 7.576863 37.651472 12.489532 8.304769 29.346503 4.912669 37.651472-7.576863 17.319657-26.04674 26.720084-56.661384 26.720084-88.571548 0-88.397067-71.659415-160.056482-160.056482-160.056482-14.998631 0-27.157387 12.158756-27.157387 27.157387C86.119107 622.412396 98.277864 634.571153 113.276295 634.571153L113.276295 634.571153zM107.301546 634.720252c1.830759-0.100532 3.809417-0.149099 5.974749-0.149099 14.998631 0 27.157387-12.158756 27.157387-27.157387 0-14.998431-12.158756-27.157387-27.157387-27.157387-3.11269 0-6.073482 0.072551-8.954729 0.231043-14.976046 0.822842-26.449267 13.630359-25.626425 28.606405C79.518183 624.069673 92.325499 635.543094 107.301546 634.720252L107.301546 634.720252zM79.370483 410.203074c-7.770332 33.163315-11.736842 67.251004-11.736842 101.797981 0 34.546977 3.966311 68.634866 11.736842 101.797981 3.42168 14.603099 18.033373 23.667354 32.636472 20.245873 14.603099-3.42168 23.667354-18.033573 20.245873-32.636472-6.821775-29.11526-10.304613-59.045967-10.304613-89.407382 0-30.361415 3.482639-60.292322 10.304613-89.407382 3.42168-14.603099-5.642774-29.214992-20.245873-32.636472C97.403856 386.535521 82.791963 395.599975 79.370483 410.203074L79.370483 410.203074zM113.276295 389.430958c-2.165532 0-4.14419-0.048567-5.974749-0.149099-14.976046-0.822842-27.783363 10.650579-28.606405 25.626425-0.822842 14.976046 10.650579 27.783363 25.626425 28.606405 2.881047 0.158293 5.842039 0.230843 8.954729 0.230843 14.998631 0 27.157387-12.158756 27.157387-27.157387C140.433682 401.589714 128.274926 389.430958 113.276295 389.430958L113.276295 389.430958zM201.384357 225.192112c11.442442 17.207933 17.633844 37.377258 17.633844 58.524121 0 58.393209-47.335107 105.714725-105.741907 105.714725-14.998631 0-27.157387 12.158756-27.157387 27.157387 0 14.998631 12.158756 27.157387 27.157387 27.157387 88.400664 0 160.056482-71.635631 160.056482-160.0293 0-31.932949-9.398228-62.548592-26.720084-88.59873-8.304769-12.489532-25.16194-15.881832-37.651472-7.576863S193.079588 212.70258 201.384357 225.192112L201.384357 225.192112zM383.905208 86.400213c-67.040147 20.154935-128.166103 55.92908-178.654872 104.107015-10.851043 10.35438-11.25357 27.544725-0.89919 38.395768 10.35438 10.851043 27.544725 11.25357 38.395768 0.89919 44.338139-42.308915 97.986565-73.706827 156.796092-91.387239 14.363462-4.318272 22.50674-19.462804 18.188468-33.826266C413.413202 90.225419 398.26867 82.08214 383.905208 86.400213L383.905208 86.400213zM607.732254 100.845619c-17.303468 36.775266-54.348552 60.762203-95.703913 60.762203-41.396133 0-78.42183-23.974146-95.731094-60.762203-6.385471-13.571399-22.563902-19.396649-36.1351-13.010979-13.571399 6.385471-19.396649 22.563902-13.010979 36.1351 26.186446 55.654466 82.245038 91.952656 144.877373 91.952656 62.591363 0 118.669742-36.310581 144.850192-91.952656 6.385471-13.571399 0.56022-29.74963-13.011178-36.1351C630.296155 81.44897 614.117724 87.27422 607.732254 100.845619L607.732254 100.845619zM819.96476 191.662845c-50.705222-48.744751-112.269881-84.939811-179.83767-105.261633-14.363062-4.319871-29.508393 3.821809-33.828264 18.184671s3.821809 29.508393 18.184871 33.828264c59.273013 17.826913 113.309576 49.596174 157.839185 92.40415 10.812469 10.394552 28.004213 10.055582 38.398766-0.756887S830.777229 202.057397 819.96476 191.662845L819.96476 191.662845zM912.571772 389.430958c-58.407 0-105.741907-47.321516-105.741907-105.714725 0-20.786707 5.984742-40.627055 17.073024-57.658508 8.183252-12.569478 4.627463-29.392872-7.942015-37.576123-12.569478-8.183252-29.392872-4.627463-37.576123 7.942015-16.78422 25.780321-25.869461 55.8999-25.869461 87.292815 0 88.393669 71.655817 160.0293 160.056482 160.0293 14.998431 0 27.157187-12.158756 27.157187-27.157387C939.72896 401.589714 927.570203 389.430958 912.571772 389.430958L912.571772 389.430958zM917.038144 389.348214c-1.310911 0.056961-2.748337 0.082944-4.466372 0.082944-14.998631 0-27.157187 12.158756-27.157187 27.157387 0 14.998631 12.158556 27.157387 27.157187 27.157387 2.451538 0 4.652646-0.039773 6.825572-0.134109 14.984441-0.651558 26.603563-13.326964 25.952005-28.311405C944.697991 400.315778 932.022585 388.696656 917.038144 389.348214L917.038144 389.348214z" />
                        </svg>
                        Ather System
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                        <li>
                            <Link
                              href="/ather-system/overview"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ather-system/overview" &&
                                "text-white"
                              }`}
                            >
                              Overview
                            </Link>
                          </li>
                       
                       
                         
                       
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Ather System--> */}

              {/* <!-- Menu Item Dashboard --> */}
              {/* <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/" ||
                            pathname.includes("dashboard")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                            fill=""
                          />
                        </svg>
                        Dashboard
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              eCommerce
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/analytics"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/analytics" &&
                                "text-white"
                              } `}
                            >
                              Analytics
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/marketing"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/marketing" &&
                                "text-white"
                              }`}
                            >
                              Marketing
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/crm"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white  ${
                                pathname === "/dashboard/crm" && "text-white"
                              }`}
                            >
                              CRM
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/stocks"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white  ${
                                pathname === "/dashboard/stocks" && "text-white"
                              }`}
                            >
                              Stocks
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Calendar --> */}
              {/* <li>
                <Link
                  href="/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
                      fill=""
                    />
                  </svg>
                  Calendar
                </Link>
              </li> */}
              {/* <!-- Menu Item Calendar --> */}

              {/* <!-- Menu Item Profile --> */}
              {/* <li>
                <Link
                  href="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("profile") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                      fill=""
                    />
                    <path
                      d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                      fill=""
                    />
                  </svg>
                  Profile
                </Link>
              </li> */}
              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Task --> */}
              {/* <SidebarLinkGroup
                activeCondition={
                  pathname === "/tasks" || pathname.includes("tasks")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/tasks" ||
                            pathname.includes("tasks")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9728)">
                            <path
                              d="M3.45928 0.984375H1.6874C1.04053 0.984375 0.478027 1.51875 0.478027 2.19375V3.96563C0.478027 4.6125 1.0124 5.175 1.6874 5.175H3.45928C4.10615 5.175 4.66865 4.64063 4.66865 3.96563V2.16562C4.64053 1.51875 4.10615 0.984375 3.45928 0.984375ZM3.3749 3.88125H1.77178V2.25H3.3749V3.88125Z"
                              fill=""
                            />
                            <path
                              d="M7.22793 3.71245H16.8748C17.2123 3.71245 17.5217 3.4312 17.5217 3.06558C17.5217 2.69995 17.2404 2.4187 16.8748 2.4187H7.22793C6.89043 2.4187 6.58105 2.69995 6.58105 3.06558C6.58105 3.4312 6.89043 3.71245 7.22793 3.71245Z"
                              fill=""
                            />
                            <path
                              d="M3.45928 6.75H1.6874C1.04053 6.75 0.478027 7.28437 0.478027 7.95937V9.73125C0.478027 10.3781 1.0124 10.9406 1.6874 10.9406H3.45928C4.10615 10.9406 4.66865 10.4062 4.66865 9.73125V7.95937C4.64053 7.28437 4.10615 6.75 3.45928 6.75ZM3.3749 9.64687H1.77178V8.01562H3.3749V9.64687Z"
                              fill=""
                            />
                            <path
                              d="M16.8748 8.21252H7.22793C6.89043 8.21252 6.58105 8.49377 6.58105 8.8594C6.58105 9.22502 6.86231 9.47815 7.22793 9.47815H16.8748C17.2123 9.47815 17.5217 9.1969 17.5217 8.8594C17.5217 8.5219 17.2123 8.21252 16.8748 8.21252Z"
                              fill=""
                            />
                            <path
                              d="M3.45928 12.8531H1.6874C1.04053 12.8531 0.478027 13.3875 0.478027 14.0625V15.8344C0.478027 16.4813 1.0124 17.0438 1.6874 17.0438H3.45928C4.10615 17.0438 4.66865 16.5094 4.66865 15.8344V14.0625C4.64053 13.3875 4.10615 12.8531 3.45928 12.8531ZM3.3749 15.75H1.77178V14.1188H3.3749V15.75Z"
                              fill=""
                            />
                            <path
                              d="M16.8748 14.2875H7.22793C6.89043 14.2875 6.58105 14.5687 6.58105 14.9344C6.58105 15.3 6.86231 15.5812 7.22793 15.5812H16.8748C17.2123 15.5812 17.5217 15.3 17.5217 14.9344C17.5217 14.5687 17.2123 14.2875 16.8748 14.2875Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9728">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Task
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/tasks/task-list"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/tasks/task-list" && "text-white"
                              }`}
                            >
                              List
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/tasks/task-kanban"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/tasks/task-kanban" &&
                                "text-white"
                              } `}
                            >
                              Kanban
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* <!-- Menu Item Task --> */}

              {/* <!-- Menu Item Forms --> */}
              {/* <SidebarLinkGroup
                activeCondition={
                  pathname === "/forms" || pathname.includes("forms")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/forms" ||
                            pathname.includes("forms")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.43425 7.5093H2.278C2.44675 7.5093 2.55925 7.3968 2.58737 7.31243L2.98112 6.32805H5.90612L6.27175 7.31243C6.328 7.48118 6.46862 7.5093 6.58112 7.5093H7.453C7.76237 7.48118 7.87487 7.25618 7.76237 7.03118L5.428 1.4343C5.37175 1.26555 5.3155 1.23743 5.14675 1.23743H3.88112C3.76862 1.23743 3.59987 1.29368 3.57175 1.4343L1.153 7.08743C1.0405 7.2843 1.20925 7.5093 1.43425 7.5093ZM4.47175 2.98118L5.3155 5.17493H3.59987L4.47175 2.98118Z"
                            fill=""
                          />
                          <path
                            d="M10.1249 2.5031H16.8749C17.2124 2.5031 17.5218 2.22185 17.5218 1.85623C17.5218 1.4906 17.2405 1.20935 16.8749 1.20935H10.1249C9.7874 1.20935 9.47803 1.4906 9.47803 1.85623C9.47803 2.22185 9.75928 2.5031 10.1249 2.5031Z"
                            fill=""
                          />
                          <path
                            d="M16.8749 6.21558H10.1249C9.7874 6.21558 9.47803 6.49683 9.47803 6.86245C9.47803 7.22808 9.75928 7.50933 10.1249 7.50933H16.8749C17.2124 7.50933 17.5218 7.22808 17.5218 6.86245C17.5218 6.49683 17.2124 6.21558 16.8749 6.21558Z"
                            fill=""
                          />
                          <path
                            d="M16.875 11.1656H1.77187C1.43438 11.1656 1.125 11.4469 1.125 11.8125C1.125 12.1781 1.40625 12.4594 1.77187 12.4594H16.875C17.2125 12.4594 17.5219 12.1781 17.5219 11.8125C17.5219 11.4469 17.2125 11.1656 16.875 11.1656Z"
                            fill=""
                          />
                          <path
                            d="M16.875 16.1156H1.77187C1.43438 16.1156 1.125 16.3969 1.125 16.7625C1.125 17.1281 1.40625 17.4094 1.77187 17.4094H16.875C17.2125 17.4094 17.5219 17.1281 17.5219 16.7625C17.5219 16.3969 17.2125 16.1156 16.875 16.1156Z"
                            fill="white"
                          />
                        </svg>
                        Forms
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/forms/form-elements"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/forms/form-elements" &&
                                "text-white"
                              }`}
                            >
                              Form Elements
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/forms/pro-form-elements"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/forms/pro-form-elements" &&
                                "text-white"
                              }`}
                            >
                              Pro Form Elements
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/forms/form-layout"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/forms/form-layout" &&
                                "text-white"
                              } `}
                            >
                              Form Layout
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/forms/pro-form-layout"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/forms/pro-form-layout" &&
                                "text-white"
                              } `}
                            >
                              Pro Form Layout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Tables --> */}
              {/* <SidebarLinkGroup
                activeCondition={
                  pathname === "/tables" || pathname.includes("tables")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/tables" ||
                            pathname.includes("tables")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9756)">
                            <path
                              d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9756">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.052124)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Tables
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/tables"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/tables" && "text-white"
                              }`}
                            >
                              Tables
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/tables/pro-tables"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/tables/pro-tables" &&
                                "text-white"
                              }`}
                            >
                              Pro Tables
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Pages --> */}
              {/* <SidebarLinkGroup
                activeCondition={
                  pathname === "/pages" || pathname.includes("pages")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/pages" ||
                            pathname.includes("pages")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="16"
                          height="18"
                          viewBox="0 0 16 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.2875 0.506226H2.7125C1.75625 0.506226 0.96875 1.29373 0.96875 2.24998V15.75C0.96875 16.7062 1.75625 17.5219 2.74063 17.5219H13.3156C14.2719 17.5219 15.0875 16.7344 15.0875 15.75V2.24998C15.0313 1.29373 14.2438 0.506226 13.2875 0.506226ZM13.7656 15.75C13.7656 16.0312 13.5406 16.2562 13.2594 16.2562H2.7125C2.43125 16.2562 2.20625 16.0312 2.20625 15.75V2.24998C2.20625 1.96873 2.43125 1.74373 2.7125 1.74373H13.2875C13.5688 1.74373 13.7938 1.96873 13.7938 2.24998V15.75H13.7656Z"
                            fill=""
                          />
                          <path
                            d="M11.7965 2.6156H8.73086C8.22461 2.6156 7.80273 3.03748 7.80273 3.54373V7.25623C7.80273 7.76248 8.22461 8.18435 8.73086 8.18435H11.7965C12.3027 8.18435 12.7246 7.76248 12.7246 7.25623V3.5156C12.6965 3.03748 12.3027 2.6156 11.7965 2.6156ZM11.4309 6.8906H9.06836V3.88123H11.4309V6.8906Z"
                            fill=""
                          />
                          <path
                            d="M3.97773 4.35938H6.03086C6.36836 4.35938 6.67773 4.07812 6.67773 3.7125C6.67773 3.34687 6.39648 3.09375 6.03086 3.09375H3.94961C3.61211 3.09375 3.30273 3.375 3.30273 3.74063C3.30273 4.10625 3.61211 4.35938 3.97773 4.35938Z"
                            fill=""
                          />
                          <path
                            d="M3.97773 7.9312H6.03086C6.36836 7.9312 6.67773 7.64995 6.67773 7.28433C6.67773 6.9187 6.39648 6.63745 6.03086 6.63745H3.94961C3.61211 6.63745 3.30273 6.9187 3.30273 7.28433C3.30273 7.64995 3.61211 7.9312 3.97773 7.9312Z"
                            fill=""
                          />
                          <path
                            d="M12.0789 10.2374H3.97891C3.64141 10.2374 3.33203 10.5187 3.33203 10.8843C3.33203 11.2499 3.61328 11.5312 3.97891 11.5312H12.0789C12.4164 11.5312 12.7258 11.2499 12.7258 10.8843C12.7258 10.5187 12.4164 10.2374 12.0789 10.2374Z"
                            fill=""
                          />
                          <path
                            d="M12.0789 13.8093H3.97891C3.64141 13.8093 3.33203 14.0906 3.33203 14.4562C3.33203 14.8218 3.61328 15.1031 3.97891 15.1031H12.0789C12.4164 15.1031 12.7258 14.8218 12.7258 14.4562C12.7258 14.0906 12.4164 13.8093 12.0789 13.8093Z"
                            fill=""
                          />
                        </svg>
                        Pages
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/pages/settings"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/pages/settings" && "text-white"
                              }`}
                            >
                              Settings
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/file-manager"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/pages/file-manager" &&
                                "text-white"
                              } `}
                            >
                              File Manager
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/data-tables"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/pages/data-tables" &&
                                "text-white"
                              } `}
                            >
                              Data Tables
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/pricing-tables"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/pages/pricing-tables" &&
                                "text-white"
                              } `}
                            >
                              Pricing Tables
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/error-page"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/pages/error-page" && "text-white"
                              }`}
                            >
                              Error Page
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/faq"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/pages/faq" && "text-white"
                              }`}
                            >
                              Faq&apos;s
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/team"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/pages/team" && "text-white"
                              }`}
                            >
                              Teams
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/terms-conditions"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/pages/terms-conditions" &&
                                "text-white"
                              }`}
                            >
                              Terms & Conditions
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/mail-success"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/pages/mail-success" &&
                                "text-white"
                              } `}
                            >
                              Mail Success
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* <!-- Menu Item Pages --> */}
            </ul>
          </div>

          {/* <!-- Support Group --> */}
          {/* <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              SUPPORT
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  href="/messages"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("messages") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7499 2.75208H2.2499C1.29365 2.75208 0.478027 3.53957 0.478027 4.52395V13.6364C0.478027 14.5927 1.26553 15.4083 2.2499 15.4083H15.7499C16.7062 15.4083 17.5218 14.6208 17.5218 13.6364V4.49583C17.5218 3.53958 16.7062 2.75208 15.7499 2.75208ZM15.7499 4.0177C15.778 4.0177 15.8062 4.0177 15.8343 4.0177L8.9999 8.4052L2.16553 4.0177C2.19365 4.0177 2.22178 4.0177 2.2499 4.0177H15.7499ZM15.7499 14.0865H2.2499C1.96865 14.0865 1.74365 13.8615 1.74365 13.5802V5.2552L8.3249 9.47395C8.52178 9.61457 8.74678 9.67083 8.97178 9.67083C9.19678 9.67083 9.42178 9.61457 9.61865 9.47395L16.1999 5.2552V13.6083C16.2562 13.8896 16.0312 14.0865 15.7499 14.0865Z"
                      fill=""
                    />
                  </svg>
                  Messages
                </Link>
              </li>
             
              <li>
                <Link
                  href="/inbox"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("inbox") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.8749 7.44902C16.5374 7.44902 16.228 7.73027 16.228 8.0959V13.3834C16.228 14.4803 15.4124 15.3521 14.3999 15.3521H3.5999C2.55928 15.3521 1.77178 14.4803 1.77178 13.3834V8.06777C1.77178 7.73027 1.49053 7.4209 1.1249 7.4209C0.759277 7.4209 0.478027 7.70215 0.478027 8.06777V13.3553C0.478027 15.1271 1.85615 16.5896 3.57178 16.5896H14.3999C16.1155 16.5896 17.4937 15.1553 17.4937 13.3553V8.06777C17.5218 7.73027 17.2124 7.44902 16.8749 7.44902Z"
                      fill=""
                    />
                    <path
                      d="M8.5498 11.6396C8.6623 11.7521 8.83105 11.8365 8.9998 11.8365C9.16855 11.8365 9.30918 11.7803 9.4498 11.6396L12.8811 8.23652C13.1342 7.9834 13.1342 7.58965 12.8811 7.33652C12.6279 7.0834 12.2342 7.0834 11.9811 7.33652L9.64668 9.64277V2.16152C9.64668 1.82402 9.36543 1.51465 8.9998 1.51465C8.6623 1.51465 8.35293 1.7959 8.35293 2.16152V9.69902L6.01855 7.36465C5.76543 7.11152 5.37168 7.11152 5.11855 7.36465C4.86543 7.61777 4.86543 8.01152 5.11855 8.26465L8.5498 11.6396Z"
                      fill=""
                    />
                  </svg>
                  Inbox
                </Link>
              </li>
      
              <li>
                <Link
                  href="/invoice"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("invoice") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9787)">
                      <path
                        d="M15.8343 2.49902C15.8343 1.43027 14.9624 0.530273 13.8655 0.530273H4.13428C3.06553 0.530273 2.16553 1.40215 2.16553 2.49902V16.6178C2.16553 16.8428 2.30615 17.0678 2.50303 17.1803C2.6999 17.2928 2.95303 17.2646 3.1499 17.1521L4.55615 16.224L6.44053 17.4615C6.66553 17.6021 6.91865 17.6021 7.14365 17.4615L8.9999 16.224L10.8562 17.4615C10.9687 17.5459 11.0812 17.574 11.1937 17.574C11.3062 17.574 11.4468 17.5459 11.5312 17.4615L13.3874 16.224L14.7937 17.1803C14.9905 17.3209 15.2437 17.3209 15.4405 17.2084C15.6374 17.0959 15.778 16.8709 15.778 16.6459L15.8343 2.49902ZM14.0343 15.099C13.6687 14.8459 13.1905 14.8459 12.8249 15.099L11.2218 16.1678L9.61865 15.099C9.42178 14.9865 9.2249 14.9021 8.9999 14.9021C8.80303 14.9021 8.57803 14.9584 8.40928 15.099L6.80615 16.1678L5.20303 15.099C4.8374 14.8459 4.35928 14.8459 3.99365 15.099L3.45928 15.4365V2.49902C3.45928 2.10527 3.76865 1.7959 4.1624 1.7959H13.9218C14.3155 1.7959 14.6249 2.10527 14.6249 2.49902V15.4365L14.0343 15.099Z"
                        fill=""
                      />
                      <path
                        d="M7.93106 3.79272H5.5123C5.1748 3.79272 4.89355 4.07397 4.89355 4.41147C4.89355 4.74897 5.1748 5.03022 5.5123 5.03022H7.93106C8.26856 5.03022 8.54981 4.74897 8.54981 4.41147C8.54981 4.07397 8.26856 3.79272 7.93106 3.79272Z"
                        fill=""
                      />
                      <path
                        d="M12.347 3.79272H11.672C11.3345 3.79272 11.0532 4.07397 11.0532 4.41147C11.0532 4.74897 11.3345 5.03022 11.672 5.03022H12.347C12.6845 5.03022 12.9657 4.74897 12.9657 4.41147C12.9657 4.07397 12.6845 3.79272 12.347 3.79272Z"
                        fill=""
                      />
                      <path
                        d="M5.5123 8.74275H7.05918C7.39668 8.74275 7.67793 8.4615 7.67793 8.124C7.67793 7.7865 7.39668 7.50525 7.05918 7.50525H5.5123C5.1748 7.50525 4.89355 7.7865 4.89355 8.124C4.89355 8.4615 5.14668 8.74275 5.5123 8.74275Z"
                        fill=""
                      />
                      <path
                        d="M12.347 7.47717H11.672C11.3345 7.47717 11.0532 7.75842 11.0532 8.09592C11.0532 8.43342 11.3345 8.71467 11.672 8.71467H12.347C12.6845 8.71467 12.9657 8.43342 12.9657 8.09592C12.9657 7.75842 12.6845 7.47717 12.347 7.47717Z"
                        fill=""
                      />
                      <path
                        d="M7.93106 11.1334H5.5123C5.1748 11.1334 4.89355 11.4147 4.89355 11.7522C4.89355 12.0897 5.1748 12.3709 5.5123 12.3709H7.93106C8.26856 12.3709 8.54981 12.0897 8.54981 11.7522C8.54981 11.4147 8.26856 11.1334 7.93106 11.1334Z"
                        fill=""
                      />
                      <path
                        d="M12.347 11.1334H11.672C11.3345 11.1334 11.0532 11.4147 11.0532 11.7522C11.0532 12.0897 11.3345 12.3709 11.672 12.3709H12.347C12.6845 12.3709 12.9657 12.0897 12.9657 11.7522C12.9657 11.4147 12.6845 11.1334 12.347 11.1334Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9787">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Invoice
                </Link>
              </li>
         
            </ul>
          </div> */}

          {/* <!-- Others Group --> */}
          <div>
            {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3> */}

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <SidebarLinkGroup
                activeCondition={
                  pathname === "/chart" || pathname.includes("chart")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/chart" ||
                            pathname.includes("chart")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1184_13869)">
                            <path
                              d="M10.8559 0.506226C10.5184 0.506226 10.209 0.787476 10.209 1.1531V6.7781C10.209 7.1156 10.4902 7.42498 10.8559 7.42498H16.8746C17.0434 7.42498 17.2121 7.3406 17.3246 7.2281C17.4371 7.08748 17.4934 6.91873 17.4934 6.74998C17.2684 3.23435 14.3434 0.506226 10.8559 0.506226ZM11.4746 6.1031V1.79998C13.809 2.08123 15.6934 3.82498 16.1434 6.13123H11.4746V6.1031Z"
                              fill=""
                            />
                            <path
                              d="M15.384 8.69057H9.11211V2.6437C9.11211 2.3062 8.83086 2.02495 8.49336 2.02495C8.40898 2.02495 8.32461 2.02495 8.24023 2.02495C3.96523 1.99682 0.505859 5.48432 0.505859 9.75932C0.505859 14.0343 3.99336 17.5218 8.26836 17.5218C12.5434 17.5218 16.0309 14.0343 16.0309 9.75932C16.0309 9.59057 16.0309 9.42182 16.0027 9.2812C16.0027 8.9437 15.7215 8.69057 15.384 8.69057ZM8.26836 16.2562C4.66836 16.2562 1.77148 13.3593 1.77148 9.75932C1.77148 6.32807 4.47148 3.48745 7.87461 3.29057V9.30932C7.87461 9.64682 8.15586 9.9562 8.52148 9.9562H14.7934C14.6809 13.4437 11.784 16.2562 8.26836 16.2562Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1184_13869">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Chart
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
          
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/chart/basic-chart"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/chart/basic-chart" &&
                                "text-white"
                              }`}
                            >
                              Basic Chart
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/chart/advanced-chart"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/chart/advanced-chart" &&
                                "text-white"
                              }`}
                            >
                              Advanced Chart
                              
                            </Link>
                          </li>
                        </ul>
                      </div>
                 
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* <!-- Menu Item Chart --> */}

              {/* <!-- Menu Item Ui Elements --> */}

              {/* <SidebarLinkGroup
                activeCondition={pathname === "/ui" || pathname.includes("ui")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/ui" || pathname.includes("ui")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9807)">
                            <path
                              d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V7.53335C0.506348 8.4896 1.29385 9.2771 2.2501 9.2771H15.7501C16.7063 9.2771 17.4938 8.4896 17.4938 7.53335V2.3021C17.4938 1.34585 16.7063 0.55835 15.7501 0.55835ZM16.2563 7.53335C16.2563 7.8146 16.0313 8.0396 15.7501 8.0396H2.2501C1.96885 8.0396 1.74385 7.8146 1.74385 7.53335V2.3021C1.74385 2.02085 1.96885 1.79585 2.2501 1.79585H15.7501C16.0313 1.79585 16.2563 2.02085 16.2563 2.3021V7.53335Z"
                              fill=""
                            />
                            <path
                              d="M6.13135 10.9646H2.2501C1.29385 10.9646 0.506348 11.7521 0.506348 12.7083V15.8021C0.506348 16.7583 1.29385 17.5458 2.2501 17.5458H6.13135C7.0876 17.5458 7.8751 16.7583 7.8751 15.8021V12.7083C7.90322 11.7521 7.11572 10.9646 6.13135 10.9646ZM6.6376 15.8021C6.6376 16.0833 6.4126 16.3083 6.13135 16.3083H2.2501C1.96885 16.3083 1.74385 16.0833 1.74385 15.8021V12.7083C1.74385 12.4271 1.96885 12.2021 2.2501 12.2021H6.13135C6.4126 12.2021 6.6376 12.4271 6.6376 12.7083V15.8021Z"
                              fill=""
                            />
                            <path
                              d="M15.75 10.9646H11.8688C10.9125 10.9646 10.125 11.7521 10.125 12.7083V15.8021C10.125 16.7583 10.9125 17.5458 11.8688 17.5458H15.75C16.7063 17.5458 17.4938 16.7583 17.4938 15.8021V12.7083C17.4938 11.7521 16.7063 10.9646 15.75 10.9646ZM16.2562 15.8021C16.2562 16.0833 16.0312 16.3083 15.75 16.3083H11.8688C11.5875 16.3083 11.3625 16.0833 11.3625 15.8021V12.7083C11.3625 12.4271 11.5875 12.2021 11.8688 12.2021H15.75C16.0312 12.2021 16.2562 12.4271 16.2562 12.7083V15.8021Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9807">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.052124)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        UI Elements
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                 
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/ui/accordion"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/accordion" && "text-white"
                              }`}
                            >
                              Accordion
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/alerts"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/alerts" && "text-white"
                              }`}
                            >
                              Alerts
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/avatars"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/avatars" && "text-white"
                              }`}
                            >
                              Avatars
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/badge"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/badge" && "text-white"
                              }`}
                            >
                              Badge
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/breadcrumbs"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/breadcrumbs" && "text-white"
                              }`}
                            >
                              Breadcrumbs
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/buttons"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/buttons" && "text-white"
                              }`}
                            >
                              Buttons
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/buttons-group"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/buttons-group" && "text-white"
                              }`}
                            >
                              Buttons Group
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/cards"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/cards" && "text-white"
                              }`}
                            >
                              Cards
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/carousel"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/carousel" && "text-white"
                              }`}
                            >
                              Carousel
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/dropdowns"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/dropdowns" && "text-white"
                              }`}
                            >
                              Dropdowns
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/images"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/images" && "text-white"
                              }`}
                            >
                              Images
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/list"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/list" && "text-white"
                              }`}
                            >
                              List
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/modals"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/modals" && "text-white"
                              }`}
                            >
                              Modals
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/notifications"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/notifications" && "text-white"
                              }`}
                            >
                              Notifications
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/pagination"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/pagination" && "text-white"
                              }`}
                            >
                              Pagination
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/popovers"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/popovers" && "text-white"
                              }`}
                            >
                              Popovers
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/progress"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/progress" && "text-white"
                              }`}
                            >
                              Progress
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/spinners"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/spinners" && "text-white"
                              }`}
                            >
                              Spinners
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/tabs"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/tabs" && "text-white"
                              }`}
                            >
                              Tabs
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/tool-tip"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/tool-tip" && "text-white"
                              }`}
                            >
                              Tooltips
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/videos"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/videos" && "text-white"
                              }`}
                            >
                              Videos
                              
                            </Link>
                          </li>
                        </ul>
                      </div>
              
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}

              {/* <!-- Menu Item Ui Elements --> */}

              {/* <!-- Menu Item Auth Pages --> */}
              {/* <SidebarLinkGroup
                activeCondition={
                  pathname === "/auth" || pathname.includes("auth")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/auth" || pathname.includes("auth")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9814)">
                            <path
                              d="M12.7127 0.55835H9.53457C8.80332 0.55835 8.18457 1.1771 8.18457 1.90835V3.84897C8.18457 4.18647 8.46582 4.46772 8.80332 4.46772C9.14082 4.46772 9.45019 4.18647 9.45019 3.84897V1.88022C9.45019 1.82397 9.47832 1.79585 9.53457 1.79585H12.7127C13.3877 1.79585 13.9221 2.33022 13.9221 3.00522V15.0709C13.9221 15.7459 13.3877 16.2802 12.7127 16.2802H9.53457C9.47832 16.2802 9.45019 16.2521 9.45019 16.1959V14.2552C9.45019 13.9177 9.16894 13.6365 8.80332 13.6365C8.43769 13.6365 8.18457 13.9177 8.18457 14.2552V16.1959C8.18457 16.9271 8.80332 17.5459 9.53457 17.5459H12.7127C14.0908 17.5459 15.1877 16.4209 15.1877 15.0709V3.03335C15.1877 1.65522 14.0627 0.55835 12.7127 0.55835Z"
                              fill=""
                            />
                            <path
                              d="M10.4346 8.60205L7.62207 5.7333C7.36895 5.48018 6.97519 5.48018 6.72207 5.7333C6.46895 5.98643 6.46895 6.38018 6.72207 6.6333L8.46582 8.40518H3.45957C3.12207 8.40518 2.84082 8.68643 2.84082 9.02393C2.84082 9.36143 3.12207 9.64268 3.45957 9.64268H8.49395L6.72207 11.4427C6.46895 11.6958 6.46895 12.0896 6.72207 12.3427C6.83457 12.4552 7.00332 12.5114 7.17207 12.5114C7.34082 12.5114 7.50957 12.4552 7.62207 12.3145L10.4346 9.4458C10.6877 9.24893 10.6877 8.85518 10.4346 8.60205Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9814">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.052124)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Authentication
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/auth/signin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/auth/signin" && "text-white"
                              }`}
                            >
                              Sign In
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/auth/signup"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/auth/signup" && "text-white"
                              }`}
                            >
                              Sign Up
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/auth/reset-password"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/auth/reset-password" &&
                                "text-white"
                              }`}
                            >
                              Reset Password
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/auth/coming-soon"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/auth/coming-soon" && "text-white"
                              }`}
                            >
                              Coming Soon
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/auth/two-step-verification"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/auth/two-step-verification" &&
                                "text-white"
                              }`}
                            >
                              2 Step Verification
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/auth/under-maintenance"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/auth/under-maintenance" &&
                                "text-white"
                              }`}
                            >
                              Under Maintenance
                              
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
