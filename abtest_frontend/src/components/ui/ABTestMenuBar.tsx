"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import _ from "lodash";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  IconButton,
} from "@material-tailwind/react";
import { MenuContent } from "@/utils/define";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { ABTestLogOutIcons } from "../icons/icons";
import { signOut } from "next-auth/react";

const ABTestMenuBar = () => {
  const { state } = useContext(AppContext);
  const { subSideBar } = state;

  const pathname = usePathname();
  return (
    <>
      <Drawer open={true} overlay={false} className="bg-gray-800">
        <div className="flex items-center justify-between p-4">
          <Typography
            variant="h3"
            className="text-center"
            style={{ color: "#f75934" }}
          >
            A/B Testing
          </Typography>
          <IconButton 
            style={{ background:'none', color: "#f75934" }}
            onClick={()=> signOut()}
          >
            <ABTestLogOutIcons/>
          </IconButton>
          
          
        </div>
        <hr className="mb-3" />
          <List>
          {_.map(MenuContent, (item) =>  (
            <Link href={item.link} key={item.name} >
              <ListItem
                selected={item.link === pathname}
                disabled={item.disabled}
                className="flex items-center justify-between"
              >
                
                  <p className="font-bold no-underline text-white">{item.name}</p>
              
                <IconButton size="sm" style={{ color: "#f75934" }}>
                  {item.icon}
                </IconButton>
              </ListItem>
            </Link>
          ))}
          <hr className="my-2" />
          {subSideBar.isOpen && subSideBar.component}
          </List>
        
       
      </Drawer>
    </>
  );
};

export default ABTestMenuBar;
