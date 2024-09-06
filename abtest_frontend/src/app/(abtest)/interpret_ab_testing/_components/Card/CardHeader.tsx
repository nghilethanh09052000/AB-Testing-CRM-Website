import { CardHeader, Typography } from "@material-tailwind/react"


interface ABTestInterpretCardHeaderProps {
    title: string
}

export default function ABTestInterpretCardHeader({
    title
}: ABTestInterpretCardHeaderProps) {
    return (
        <CardHeader
            className="bg-gray-900"
            floated={true}
            shadow={true}
            variant="gradient"

            >
            <Typography variant="h3" style={{color:'#f75934'}}>
                {title}
            </Typography>
        </CardHeader>
    )
}