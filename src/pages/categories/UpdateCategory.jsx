import Box from '@mui/material/Box'
import Header from '../../components/Header'
import { Form, TextInput } from '../../components/FormikComponents'
import { object, string } from 'yup'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_CATEGORY, GET_CATEGORY, GET_CATEGORIES } from '../../graphql/queries'
import SubmitButton from '../../components/SubmitButton'
import Message from '../../components/Message'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorDialog from '../../components/ErrorDialog'
export default function UpdateCategory() {
    const [open,setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [show, setShow] = useState(false)
    const { name } = useParams()
    const { loading: qLoading, error: qError, data: qData } = useQuery(GET_CATEGORY, { variables: { name } })
    const [mutate, { loading, error, data }] = useMutation(UPDATE_CATEGORY)
    if (qError) return 'error'
    if (qLoading) return 'Loading'
    const initialValues = {
        newName: qData.category.name,
        name
    }
    const validate = object({
        newName: string()
            .required("New Name is Required")
            .min(3, "New Name allows minimum of 3 characters")
            .max(20, "New Name allows maximum of 20 characters")
            .matches(/^[a-zA-Z ]+$/, "Invalid New Name"),
    })

    const submitHandler = ({ name, newName }) => {
        mutate({
            variables: { name, newName },
            update: (cache) => {
                const { categories } = cache.readQuery({
                    query: GET_CATEGORIES
                })
                categories.sort((cat1, cat2) => {
                    return cat1.name.localeCompare(cat2.name, undefined, { sensitivity: "base" })
                })
                cache.writeQuery({
                    query: GET_CATEGORIES,
                    data: {
                        categories
                    }
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
            <Header text={"Update Category"} />
            <Form
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={submitHandler}
            >
                <TextInput label={"New Name"} id="newName" name="newName" />
                <Message show={show} setShow={setShow} error={error} message={data?.updateCategory?.message} />
                <SubmitButton loading={loading} />
                <ErrorDialog open={open}  setOpen={setOpen} errorMessage={errorMessage}/>
            </Form>
        </Box>
    )
}