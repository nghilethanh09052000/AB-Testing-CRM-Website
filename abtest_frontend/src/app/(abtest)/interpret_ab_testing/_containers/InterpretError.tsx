"use client";

import { ABTestInterpretCard, ABTestInterpretCardBody, ABTestInterpretCardHeader } from "../_components/Card";

import _ from "lodash";
import { Alert } from "@material-tailwind/react";
import {
  ABTestSuccessIcons,
  ABTestWarningIcons,
} from "@/components/icons/icons";

interface InterpretErrorDataProps {
  title?: string;
}

export default function InterpretErrorData({
  title = "No data on this Exps",
}: InterpretErrorDataProps) {
  return (
    <ABTestInterpretCard>
      <ABTestInterpretCardHeader title={title} />
      <ABTestInterpretCardBody>
        <div className="flex flex-row">
          <div className="flex flex-col text-white">
            <Alert
              color={"red"}
              variant="gradient"
              icon={<ABTestWarningIcons />}
            >
              {"There is no data to display"}
            </Alert>
          </div>
        </div>
      </ABTestInterpretCardBody>
    </ABTestInterpretCard>
  );
}
