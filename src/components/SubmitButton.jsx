import Button from '@mui/material/Button'
export default function SubmitButton({loading,  ...props}) {
    return (
        <Button variant="contained" color="primary"  type="submit" disabled={loading} {...props}>
            {loading ? "submitting": "submit"}
        </Button>
    )
}