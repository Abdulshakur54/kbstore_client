import Box from '@mui/material/Box'
import Header from '../../components/Header'
import { Form, TextInput } from '../../components/FormikComponents'
import { object, string } from 'yup'
import { useMutation } from '@apollo/client'
import { CREATE_CATEGORY, GET_CATEGORIES } from '../../graphql/queries'
import SubmitButton from '../../components/SubmitButton'
import Message from '../../components/Message'
import { useState } from 'react'
import ErrorDialog from '../../components/ErrorDialog'
export default function CreateCategory() {
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [show, setShow] = useState(false)
    const [mutate, { loading, error, data }] = useMutation(CREATE_CATEGORY)
    const initialValues = {
        name: ""
    }
    const validate = object({
        name: string()
            .required("Name is Required")
            .min(3, "Name allows minimum of 3 characters")
            .max(20, "Name allows maximum of 20 characters")
            .matches(/^[a-zA-Z ]+$/, "Invalid Name")

    })

    const submitHandler = ({ name }, { resetForm }) => {
        mutate({
            variables: { name },
            onCompleted: () => { resetForm({ value: "" }) },
            update: (cache, { data: { createCategory } }) => {

                const { categories } = cache.readQuery({
                    query: GET_CATEGORIES
                })

                const updatedCategories = [...categories, createCategory.category]
                updatedCategories.sort((cat1, cat2) => {
                    return cat1.name.localeCompare(cat2.name, undefined, { sensitivity: 'base' })
                })
                cache.writeQuery({
                    query: GET_CATEGORIES,
                    data: { categories: updatedCategories }
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
            <Header text={"Create Category"} />
            <Form
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={submitHandler}
            >
                <TextInput label={"Name"} id="name" name="name" />
                <Message show={show} setShow={setShow} error={error} message={data?.createCategory?.message} />
                <ErrorDialog open={open} setOpen={setOpen} errorMessage={errorMessage} />
                <SubmitButton loading={loading} />
            </Form>
        </Box>
    )
}