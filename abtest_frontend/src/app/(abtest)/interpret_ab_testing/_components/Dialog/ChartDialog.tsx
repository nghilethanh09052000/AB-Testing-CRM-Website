"use client";

import _ from "lodash";
import { useEffect, useRef, useState, useMemo } from "react";
import { MetricData } from "../../_containers/InterpretMetric";
import * as d3 from "d3";
import { ScaleLinear } from "d3";

type ABTestInterpretAxisLeftProps = {
  yScale: ScaleLinear<number, number>;
  pixelsPerTick: number;
};

type ABTestInterpretAxisBottomProps = {
  xScale: ScaleLinear<number, number>;
  pixelsPerTick: number;
};

interface ABTestInterpretAxesProps {
  width: number;
  height: number;
}

interface ABTestInterpretBoxPlotProps {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  width: number;
  stroke: string;
  fill: string;
}
interface ABTestInterpretChartDialogProps {
  statisticData: MetricData;
  expName: string;
}

const RenderBoxPlot = ({
  min,
  q1,
  median,
  q3,
  max,
  width,
  stroke,
  fill,
}: ABTestInterpretBoxPlotProps) => {
  const STROKE_WIDTH = 2;

  return (
    <g>
      <line
        x1={width / 2}
        x2={width / 2}
        y1={min}
        y2={max}
        stroke={stroke}
        strokeWidth={STROKE_WIDTH}
      />
      <rect
        x={0}
        y={q3}
        width={width}
        height={q1 - q3}
        stroke={stroke}
        fill={fill}
        strokeWidth={STROKE_WIDTH}
      />
      <line
        x1={0}
        x2={width}
        y1={median}
        y2={median}
        stroke={stroke}
        strokeWidth={STROKE_WIDTH}
      />
    </g>
  );
};

const RenderAxisLeft = ({
  yScale,
  pixelsPerTick,
}: ABTestInterpretAxisLeftProps) => {
  const TICK_LENGTH = 6;
  const range = yScale.range();
  const ticks = useMemo(() => {
    const height = range[0] - range[1];
    const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  return (
    <>
      {/* Main vertical line */}
      <path
        d={["M", 0, range[0], "L", 0, range[1]].join(" ")}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          <line x2={-TICK_LENGTH} stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateX(-20px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

const RenderAxisBottom = ({
  xScale,
  pixelsPerTick,
}: ABTestInterpretAxisBottomProps) => {
  const TICK_LENGTH = 6;
  const range = xScale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale]);

  return (
    <>
      {/* Main horizontal line */}
      <path
        d={["M", range[0], 0, "L", range[1], 0].join(" ")}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y2={TICK_LENGTH} stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

const RenderAxis = ({ width, height }: ABTestInterpretAxesProps) => {
  const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  const xScale = d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);
  const yScale = d3.scaleLinear().domain([0, 11]).range([boundsHeight, 0]);
  const logScale = d3
    .scaleLog<string>()
    .domain([0.000000000000000000000001, 10])
    .range(["red", "blue"])
    .clamp(true);
  return (
    <div>
      <svg width={width} height={height} shapeRendering={"crispEdges"}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          overflow={"visible"}
        >
          {/* graph content */}

          {/* Y axis */}
          <RenderAxisLeft yScale={yScale} pixelsPerTick={30} />

          {/* X axis, use an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <RenderAxisBottom xScale={xScale} pixelsPerTick={60} />
          </g>
        </g>
      </svg>
    </div>
  );
};

const ABTestInterpretChartDialog = ({
  statisticData,
  expName,
}: ABTestInterpretChartDialogProps) => {
  const { p_value, power_result, ci_u, ci_l, delta, ctl_mean, details } =
    statisticData;

  const med = details.metric_cfg.mde;


  return (
    <div>
      <RenderBoxPlot
        width={100}
        q1={100}
        median={200}
        q3={50}
        min={380}
        max={10}
        stroke="black"
        fill={"#ead4f5"}
      />
      <RenderAxis width={400} height={400} />
    </div>
  );
};

export default ABTestInterpretChartDialog;
