"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import _ from 'lodash'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";



export default function ABTestLoginForm() {

  const router = useRouter()
  

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false)

  const handleSubmit = async () => {
    setError(false)
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    if(!res?.error) {
      router.push('/')
    } else {
      setError(true)
    }
  }

  
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
        pointerEvents: "fill",
        userSelect: "none",
        backdropFilter: "blur(10px)",
      }}
    >
      <Card className="w-1/3">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="red">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            size="lg"
            type="text"
            crossOrigin={""}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            size="lg"
            crossOrigin={""}
            onChange={(e) => setPassword(e.target.value)}
          />
          {
            error 
            && (
              <div className="flex justify-center items-center">
                <Typography variant="small" color="red">Invalid Email Or Password. Please Type Again</Typography>
              </div>
            )
          }
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" crossOrigin={""} />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            fullWidth
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Please Contact The Owner Of The Project
            </Typography>
          </Typography>
          
        </CardFooter>
      </Card>
    </div>
  );
}
