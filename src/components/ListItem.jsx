import ListItm from "@mui/material/ListItem"
import ListText from "./ListText"
import Box from '@mui/material/Box'
import { useNavigate } from "react-router-dom"
import { colors } from "../defaults"
export default function ListItem({ text, icons, linkTo }) {
    const navigate = useNavigate()
    const properties = {};
    return (
        <ListItm sx={{ paddingY: '15px', cursor: "pointer", outline: "1px solid red", outlineColor: colors.borderBlue, borderRadius: '10px'}} onClick={() => navigate(linkTo)} className="ListItem">
            <ListText text={text} />
            <Box sx={{ display: "flex", gap: "11px", justifyContent: "flex-end", alignItems: "center", flexWrap: "wrap", width: "40%" }}>
                {icons.map((icon, index) => {
                    properties.sx = { cursor: "pointer" };
                    properties.key = index
                    properties.className = "icon"
                    if (icon.linkTo) {
                        properties.onClick = (event) => { navigate(icon.linkTo); event.stopPropagation() }
                    }
                    if (icon.color) {
                        properties.sx = { ...properties.sx, color: icon.color }
                    }
                    if(icon.disabled){
                        properties.color = 'disabled'
                    }
                    return icon.icon(properties)

                })}
            </Box>
        </ListItm>
    )
}