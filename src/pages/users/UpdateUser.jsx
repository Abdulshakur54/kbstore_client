import Box from '@mui/material/Box'
import Header from '../../components/Header'
import { Form, TextInput } from '../../components/FormikComponents'
import { object, string } from 'yup'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_USER, GET_USER } from '../../graphql/queries'
import SubmitButton from '../../components/SubmitButton'
import Message from '../../components/Message'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorDialog from '../../components/ErrorDialog'
export default function UpdateUser() {
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [show, setShow] = useState(false)
    const { username } = useParams()
    const { loading: qLoading, error: qError, data: qData } = useQuery(GET_USER, { variables: { username } })
    const [mutate, { loading, error, data }] = useMutation(UPDATE_USER)
    if (qError) return 'error'
    if (qLoading) return 'Loading'
    const initialValues = {
        firstName: qData.user.firstName,
        lastName: qData.user.lastName,
        username
    }
    const validate = object({
        firstName: string()
            .required("Firstname is Required")
            .min(3, "Firstname allows minimum of 3 characters")
            .max(20, "Firstname allows maximum of 20 characters")
            .matches(/^[a-zA-Z ]+$/, "Invalid Firstname"),
        lastName: string()
            .required("Lastname is Required")
            .min(3, "Lastname allows minimum of 3 characters")
            .max(20, "Lastname allows maximum of 20 characters")
            .matches(/^[a-zA-Z ]+$/, "Invalid Lastname"),
    })

    const submitHandler = ({ firstName, lastName, username }) => {
        mutate({
            variables: { firstName, lastName, username },
            onError: (err) => {
                setErrorMessage(err.message)
                setOpen(true)
            }
        })
        setShow(true)
    }

    return (
        <Box>
            <Header text={"Update User"} />
            <Form
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={submitHandler}
            >
                <TextInput label={"Firstname"} id="firstName" name="firstName" />
                <TextInput label={"Lastname"} id="lastName" name="lastName" />
                <Message show={show} setShow={setShow} error={error} message={data?.updateUser?.message} />
                <SubmitButton loading={loading} />
                <ErrorDialog open={open} setOpen={setOpen} errorMessage={errorMessage}/>
            </Form>
        </Box>
    )
}