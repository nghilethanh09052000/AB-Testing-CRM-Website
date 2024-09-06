import api from '@/utils/api'
import InterpretABTesting from './_containers'
import InterpretSearchParams from '@/types/params/interpretABTestParams'
import { Suspense } from 'react'
import ABTestAPILoading from '@/components/ui/ABTestAPILoading'
import ABTestSetTitle from '@/components/ui/ABTestSetTitle'


interface InterpretABTestPageProps {
  searchParams: InterpretSearchParams
}


export default async function InterpretABTestPage({
  searchParams
}: InterpretABTestPageProps) {

  const {exp_id} = searchParams
  try {
    
    const expsData = await Promise.resolve(api.getExps())
    const expDetail = await Promise.resolve(api.getExpDetails(exp_id || expsData[6].exp_id))

    return (
      <Suspense fallback={<div>...Loading</div>}>
        <ABTestAPILoading/>
        <main className="flex min-h-screen flex-col">
          <div className="flex flex-col ml-80 mr-5">
            <ABTestSetTitle title={'Interpreting A/B Testing'}/>
            <InterpretABTesting
              expsData={expsData} 
              expDetail={expDetail}
              exp_id={exp_id}
            />
          </div>
        </main>
      </Suspense>
      
    )
  } catch(error) {
    throw error
  }
}
