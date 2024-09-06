"use client";

import _ from "lodash";
import { Alert } from "@material-tailwind/react";
import { MetricData } from "../../_containers/InterpretMetric";

import {
  ABTestSuccessIcons,
  ABTestWarningIcons,
  ABTestThumbDownIcons,
} from "@/components/icons/icons";

interface ABTestInterpretDetailDiaglogProps {
  data: MetricData;
  alpha: number;
  beta: number;
}

const checkIsSignificant = (
  pValue: number,
  powerResult: number,
  ciUpper: number,
  ciLower: number,
  delta: number,
  alpha: number,
  beta: number
): boolean => {
  const powerCfg = 1 - beta;
  let significantConditions = 0;

  if (pValue <= alpha) significantConditions++;

  if (powerResult >= powerCfg) significantConditions++;

  if (!(ciUpper > 0 && ciLower < 0)) significantConditions++;

  if (delta !== 0) significantConditions++;

  return significantConditions === 4;
};

const ABTestInterpretDetailDiaglog = ({ data, alpha, beta }: ABTestInterpretDetailDiaglogProps) => {
    const { p_value, power_result, ci_u, ci_l, delta, ctl_mean } = data;
    const isSignificant = checkIsSignificant(
      p_value,
      power_result,
      ci_u,
      ci_l,
      delta,
      alpha,
      beta
    );
    return (
      <Alert
        icon={
          isSignificant ? (
            delta > 0 ? (
              <ABTestSuccessIcons />
            ) : (
              <ABTestThumbDownIcons />
            )
          ) : (
            <ABTestWarningIcons />
          )
        }
        color={isSignificant ? (delta > 0 ? "green" : "red") : "yellow"}
      >
        {isSignificant
          ? delta > 0
            ? `Treatment Win. Uplift Increase: ${_.round(
                delta,
                2
              )} or ${_.round((delta * 100) / ctl_mean, 2)}% +- ${_.round(
                delta - (ci_l * 100) / ctl_mean,
                2
              )}%`
            : `Treatment Lost. Uplift Decrease ${_.round(
                delta,
                2
              )} or ${_.round((delta * 100) / ctl_mean, 2)}% `
          : "The Result is not significant"}
      </Alert>
    );
  }


export default ABTestInterpretDetailDiaglog;
