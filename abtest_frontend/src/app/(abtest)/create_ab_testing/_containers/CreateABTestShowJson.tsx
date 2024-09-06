"use client"
import ABTestJsonEditor from "@/components/ABTestJsonEditor"
import { CreateABTestingData } from "@/types/api/Post/PostCreateABTestingData"
interface CreateABTestShowJsonProps {
    data: CreateABTestingData
}

export default function CreateABTestShowJson({
    data
}: CreateABTestShowJsonProps) {
    return (
        <div className="flex flex-col w-1/3 fixed right-0">
            <ABTestJsonEditor
                confirmGood={false}
                placeholder={data}
                reset={true}
                width="fit"
                viewOnly={true}
            />
        </div>
    )
}