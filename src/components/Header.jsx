import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
export default function Header({text}) {
    return (
        <Box sx={{ marginY: "11px" }}>
            <Typography component={"h2"} variant={"h5"}>
               {text}
            </Typography>
        </Box>
    )
}