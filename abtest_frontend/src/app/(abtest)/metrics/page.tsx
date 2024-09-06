import api from "@/utils/api";
import Metrics from "./_containers";
import ABTestSetTitle from "@/components/ui/ABTestSetTitle";

export default async function Page() {
  try {
    const [allDimensions, listEventTypes, listMetrics] = await Promise.all([
      api.getAllDimentions(),
      api.getListEventType(),
      api.getListMetrics(),
    ]);

    return (
      <main className="flex min-h-screen flex-col">
        <div className="flex flex-col ml-80 mr-5">
          <ABTestSetTitle title={'Metrics'}/>
          <Metrics
            allDimensions={allDimensions}
            listEventTypes={listEventTypes}
            listMetrics={listMetrics}
          />
        </div>
        
      </main>
    )
  } catch (error) {
    throw error
  }
}
