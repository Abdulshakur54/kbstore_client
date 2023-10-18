import Lst from '@mui/material/List'
export default function List({ children, clicked }) {
    return (
        <Lst sx={{ display: "flex", flexDirection: "column", gap: "10px", marginY: "10px" }}>
            {children}
        </Lst>
    )
}