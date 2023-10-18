import Box from '@mui/material/Box'
export default function DisplayContainer({ children }) {
    return (
        <Box sx={{ padding: '15px' }}>
            {children}
        </Box>
    )
}