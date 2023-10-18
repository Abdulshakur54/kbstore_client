import Box from '@mui/material/Box'
import { colors } from '../defaults'
export default function ActionButton({render}) {
    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginY: "15px" }}>
            {render({sx:{fontSize: "35px", cursor: "pointer", marginRight: "10px", color: colors.blue }, className:"icon"})}
        </Box>
    )
}