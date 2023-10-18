import { Formik, Form as Frm, useField } from 'formik'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
export function Form({ children, ...props }) {
    return (
        <Formik {...props}>
            <Frm style={{ margin: "30px auto", display: "flex", flexDirection: "column", gap: "25px" }}>
                {children}
            </Frm>
        </Formik>
    )
}
export function TextInput({ label, ...props }) {
    const [field, meta] = useField(props)

    return (
        <TextField
            error={meta.error && meta.touched}
            label={label}
            {...field}
            {...props}
            helperText={(meta.touched && meta.error) ? meta.error : ""}
            variant="standard"
            sx={{ width: "100%" }}
        />

    )
}

