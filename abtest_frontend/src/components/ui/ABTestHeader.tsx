"use client";

import ABTestMenuBar from "./ABTestMenuBar";
import Image from "next/image";
import { ABTestSettingIcons } from "../icons/icons";
import { IconButton } from "@material-tailwind/react";

export default function ABTestHeader() {

  return (
      <nav className="mx-auto flex items-center justify-between p-6">
        <div>
          <ABTestMenuBar/>
        </div>
        <div>
          <Image
            alt='Header Logo'
            src="/images/ather_labs/atherlabs_icons.svg"
            width={150}
            height={150}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
        <div>
          <IconButton style={{color: "#f75934" }} disabled>
            <ABTestSettingIcons/>
          </IconButton>
        </div>
      </nav>
  );
}
