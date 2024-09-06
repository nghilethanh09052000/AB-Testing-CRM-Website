'use client';

import { Slider } from "@material-tailwind/react";
import { useMemo, useCallback } from "react";


interface ABTestSliderProps {
  value: number;
  onChangeHandler: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

function roundToDecimal(value: number, decimalPlaces: number) {
  const multiplier = 10 ** decimalPlaces;
  return Math.round(value * multiplier) / multiplier;
}
export default function ABTestSlider({
  value,
  onChangeHandler,
  min,
  max,
  step,
}: ABTestSliderProps) {
  // Memoize the adjustment factors
  const adjustedMin = useMemo(() => 1, []);
  const rangeMin = useMemo(() => min, [min]);
  const rangeMax = useMemo(() => max - min, [max, min]);
  const rangeStep = useMemo(() => step, [step]);

  // Memoize the adjusted values
  const adjustedValue = useMemo(
    () => roundToDecimal(((value - rangeMin) / rangeMax) * 99 + 1, 2),
    [value, rangeMin, rangeMax]
  );

  // Memoize the adjusted step
  const adjustedStep = useMemo(() => roundToDecimal((rangeStep / rangeMax) * 99, 2), [
    rangeStep,
    rangeMax,
  ]);

  // Memoize the slider value change function
  const handleSliderChange = useCallback(
    (newValue: number) => {
      const originalValue = roundToDecimal(
        ((newValue - 1) / 99) * rangeMax + rangeMin,
        2
      );
      onChangeHandler(originalValue);
    },
    [onChangeHandler, rangeMin, rangeMax]
  );

  return (
    <Slider
      defaultValue={adjustedValue}
      onChange={(e) => {
        const newValue = +e.target.value;
        handleSliderChange(newValue);
      }}
      color="red"
      min={adjustedMin}
      max={100}
      step={adjustedStep}
    />
  );
}
