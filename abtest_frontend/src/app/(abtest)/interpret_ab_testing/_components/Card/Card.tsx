import { Card } from "@material-tailwind/react";

interface ABTestInterpretCardProps {
    children: React.ReactNode
}
export default function ABTestInterpretCard({children}: ABTestInterpretCardProps) {
    return (
        <Card className="bg-gray-800 mt-5 w-full">
            {children}
        </Card>
    )
}