import api from '@/utils/api'
import Overview from './_container'
import ABTestSetTitle from '@/components/ui/ABTestSetTitle'


export default async function Page() {
  

  const listExps = await api.getListExps()

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col ml-80 mr-5">
        <ABTestSetTitle title={'Overview of A/B Testing'}/>
        <Overview listExps={listExps}/>
      </div>
    </main>
  )
}
