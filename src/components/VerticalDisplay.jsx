import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
export default function VerticalDisplay({label, value}){
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", marginY: "23px" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: '14px' }}>{label}</Typography>
            <Typography sx={{ fontSize: '16px' }}>{value}</Typography>
        </Box>
    )
}