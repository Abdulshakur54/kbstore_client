import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

export default function ListText({ text }) {
    return (
        <Box sx={{ width: "60%", display: "flex" }}>
            <ListItemText primary={text} />
        </Box>

    )
}