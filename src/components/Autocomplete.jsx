import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
export default function SelectInput({ label, options, ...props }) {
    return (
        <Autocomplete
            options={options}
            sx={{ width:"100%" }}
            {...props}
            renderInput={(params) => <TextField {...params} label={label} variant='standard' />}
        />

    )
}