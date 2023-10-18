import Box from '@mui/material/Box'
import Header from '../../components/Header'
import { Form, TextInput } from '../../components/FormikComponents'
import { object, string } from 'yup'
import { useMutation } from '@apollo/client'
import { CREATE_USER, GET_USERS } from '../../graphql/queries'
import SubmitButton from '../../components/SubmitButton'
import Message from '../../components/Message'
import { useState } from 'react'
import ErrorDialog from '../../components/ErrorDialog'
export default function createUser() {
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [show, setShow] = useState(false)
    const [mutate, { loading, error, data }] = useMutation(CREATE_USER)
    const initialValues = {
        firstName: "",
        lastName: "",
        username: ""
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
        username: string()
            .required("Username is Required")
            .min(3, "Username allows minimum of 3 characters")
            .max(20, "Username allows maximum of 20 characters")
            .matches(/^[a-zA-Z 0-9]+$/, "Invalid Username"),

    })

    const submitHandler = ({ firstName, lastName, username }, { resetForm }) => {
        mutate({
            variables: { firstName, lastName, username },
            onCompleted: () => { resetForm({ value: "" }) },
            update: (cache, { data: { createUser } }) => {

                const { users } = cache.readQuery({
                    query: GET_USERS
                })

                const updatedUser = [...users, createUser.user]
                updatedUser.sort((user1, user2) => {
                    return user1.username.localeCompare(user2.username, undefined, { sensitivity: 'base' })
                })
                cache.writeQuery({
                    query: GET_USERS,
                    data: { users: updatedUser }
                })
            },
            onError: (err) => {
                setErrorMessage(err.message)
                setOpen(true)
            }
        })
        setShow(true)
    }

    return (
        <Box>
            <Header text={"Create User"} />
            <Form
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={submitHandler}
            >
                <TextInput label={"Firstname"} id="firstName" name="firstName" />
                <TextInput label={"Lastname"} id="lastName" name="lastName" />
                <TextInput label={"Username"} id="username" name="username" />
                <Message show={show} setShow={setShow} error={error} message={data?.createUser?.message} />
                <SubmitButton loading={loading} />
                <ErrorDialog open={open} setOpen={setOpen} errorMessage={errorMessage}/>
            </Form>
        </Box>
    )
}