import Box from '@mui/material/Box'
import Header from '../../components/Header'
import { Form, TextInput } from '../../components/FormikComponents'
import { object, string, number } from 'yup'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_PRODUCT, GET_PRODUCT } from '../../graphql/queries'
import SubmitButton from '../../components/SubmitButton'
import Message from '../../components/Message'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorDialog from '../../components/ErrorDialog'
import SelectInput from '../../components/Autocomplete'
export default function UpdateProduct() {
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [show, setShow] = useState(false)
    const { name } = useParams()
    const { loading: qLoading, error: qError, data: qData } = useQuery(GET_PRODUCT, { variables: { name } })
    const [mutate, { loading, error, data }] = useMutation(UPDATE_PRODUCT)
    const options = [{ label: "Abdulshakur", value: 1 }, { label: "Muhammad", value: 35 }, { label: "Suleiman", value: 27 }]
    if (qError) return `${qError.message}`
    if (qLoading) return 'Loading'
    const initialValues = {
        name: qData.product.name,
        newName: qData.product.name,
        costPrice: qData.product.costPrice,
        image: qData.product.image,
        description: qData.product.description,
    }
    const validate = object({
        newName: string()
            .required("New Name is Required")
            .min(3, "New Name allows minimum of 3 characters")
            .max(20, "New Name allows maximum of 20 characters")
            .matches(/^[a-zA-Z ]+$/, "Invalid New Name"),
        costPrice: number()
            .required("Cost Price is required")
            .positive("Invalid Cost Price")
    })

    const submitHandler = ({ name, newName, category, costPrice, image, description }) => {
        mutate({
            variables: { name, newName, category, costPrice, image, description },
            onError: (err) => {
                setErrorMessage(err.message)
                setOpen(true)
            }
        })
        setShow(true)
    }

    return (
        <Box>
            <Header text={"Update Product"} />
            <Form
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={submitHandler}
            >
                <TextInput label={"New Name"} id="newName" name="newName" />
                <SelectInput label={"Category"} options={options} />
                <TextInput label={"Cost Price (₦)"} id="costPrice" name="costPrice" type="number" />
                <SubmitButton loading={loading} />
                <Message show={show} setShow={setShow} error={error} message={data?.updateUser?.message} />
                <ErrorDialog open={open} setOpen={setOpen} errorMessage={errorMessage} />
            </Form>
        </Box>
    )
}