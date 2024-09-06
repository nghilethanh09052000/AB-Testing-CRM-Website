"use client";
import { useEffect, useContext, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AppContext, setSubSideBar, setLoading } from "@/context/AppContext";
import InterpretABTestSubSideBar from "../_components/SubSideBar";
import _ from "lodash";
import { ExpsData } from "@/types/api/Get/GetExpData";
import { ExpDetailsData } from "@/types/api/Get/GetExpDetailsData";

import InterpretOverViewInterpretingABTest from "./InterpretOverview";
import InterpretTraficDiagnostics from "./InterpretTrafficDiagnostics";
import InterpretABTestingProgress from "./InterpretProgress";
import InterpretMetric from "./InterpretMetric";
import InterpretErrorData from "./InterpretError";

interface InterpretABTestingProps {
  expsData: ExpsData[];
  expDetail: ExpDetailsData;
  exp_id: string;
}

interface Options {
  value: string;
  label: string;
}

const getInitialSelectedData = (
  expsData: ExpsData[],
  exp_id: string
): Options => {
  return !exp_id
    ? _.map(expsData, (data) => ({
        value: data.exp_id,
        label: data.exp_id,
      }))[0]
    : { value: exp_id, label: exp_id };
};

export default function InterpretABTesting({
  expsData,
  expDetail,
  exp_id,
}: InterpretABTestingProps) {
  
  const [selectedExpsData, setSelectedExpData] = useState<Options>(getInitialSelectedData(expsData, exp_id));

  const pathName = usePathname();
  const router = useRouter();
  const search = useSearchParams();
  const { state, dispatch } = useContext(AppContext);
  const { subSideBar } = state;

  useEffect(() => {
    setLoading(dispatch, false);
  }, [dispatch, search]);

  const handleUpdateSearchParams = (exp_id: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("exp_id", exp_id);
    return `${window.location.pathname}?${searchParams.toString()}`;
  };

  const handleValueChange = async (value: Options) => {
    if(_.isEmpty(value.label)) return
    setSelectedExpData(value);
    setLoading(dispatch, true);
    selectedExpsData.label !== value.label && router.push(handleUpdateSearchParams(value.value));
  };

  useEffect(() => {
    _.includes("/interpret_ab_testing", pathName) &&
      setSubSideBar(dispatch, {
        ...subSideBar,
        isOpen: true,
        component: (
          <InterpretABTestSubSideBar
            selectedExpsData={selectedExpsData}
            data={expsData}
            handleValueChange={handleValueChange}
          />
        ),
      });

    return () => {
      setSubSideBar(dispatch, {
        ...subSideBar,
        isOpen: false,
        component: null,
      });
    };
  }, [selectedExpsData.value]);

  return (
   
      <>
      {!_.isEmpty(expDetail) && !_.isEmpty(expDetail.primary_metric) ? (
        <>
          <div className="flex flex-row my-5 px-7">
            <InterpretOverViewInterpretingABTest
              title="A/B Testing Information"
              expName={expDetail.exp_name}
              startDate={expDetail.start_date}
              endDate={expDetail.end_date}
              timeRunTest={expDetail.time_run_test}
            />
          </div>

          <div className="flex flex-row my-5 px-7">
            <InterpretABTestingProgress
              title="A/B Testing Progress"
              expectedPrecision={expDetail.expected_precision}
              primaryMetric={expDetail.primary_metric}
            />
          </div>

          <div className="flex flex-row my-5 px-7">
            <InterpretTraficDiagnostics
              title="Traffic Diagnostics"
              result={expDetail.primary_metric.result}
            />
          </div>

          <div className="flex flex-row my-5 px-7">
            <InterpretMetric
              title="Metric"
              expName={expDetail.exp_name}
              alpha={expDetail.alpha}
              beta={expDetail.beta}
              primaryMetric={expDetail.primary_metric}
              secondaryMetric={expDetail.secondary_metric}
            />
          </div>
        </>
      ) : (
        <InterpretErrorData />
      )}
    </>
  );
}
