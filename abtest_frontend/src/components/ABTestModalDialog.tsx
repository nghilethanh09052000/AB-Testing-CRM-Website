import {useState} from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { ABTestCloseIcons } from "./icons/icons";



interface ABTestModalDialogProps {
  isOpen:boolean
  title:string;
  onHandler: () => void;

  children: React.ReactNode
} 
export default function ABTestModalDialog({
  isOpen,
  title,
  onHandler,

  children
}: ABTestModalDialogProps){


  return (
    <>
      <Dialog
        open={isOpen}
        handler={onHandler}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-white"
        
      >
        <DialogHeader className="bg-black flex items-center justify-between">
          <Typography variant="h5" color="white" className="text-center">
            { title }
          </Typography>
          <IconButton className="bg-black" onClick={onHandler}>
            <ABTestCloseIcons className="w-6 h-6"/>
          </IconButton>
        </DialogHeader>

        <DialogBody divider>
          {children}
        </DialogBody>

        <DialogFooter className="space-x-2 bg-black flex justify-between">
          <Button variant="text" color="white" onClick={onHandler}>
            close
          </Button>
          <Button variant="gradient" onClick={onHandler} color="white">
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
