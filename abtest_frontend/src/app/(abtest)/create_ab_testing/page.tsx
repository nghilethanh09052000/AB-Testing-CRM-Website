import Image from 'next/image'
import api from '@/utils/api'
import CreateABTesting from './_containers';
import ABTestSetTitle from '@/components/ui/ABTestSetTitle';

export default async function Page() {

    return (
        <main className="flex min-h-screen flex-col">
          <div className="flex flex-col ml-80 mr-5">
            <ABTestSetTitle title='Create A/B Testing'/>
            <CreateABTesting/>
          </div>
          
          
        </main>
    )
}
