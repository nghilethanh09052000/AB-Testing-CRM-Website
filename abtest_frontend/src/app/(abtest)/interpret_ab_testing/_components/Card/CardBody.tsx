import { CardBody, Typography } from "@material-tailwind/react"


interface ABTestInterpretCardBodyProps {
    children: React.ReactNode
}

export default function ABTestInterpretCardBody({
    children

}: ABTestInterpretCardBodyProps) {
    return (
        <CardBody>
            {children}
        </CardBody>
    )
}