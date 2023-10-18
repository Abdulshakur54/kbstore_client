import Box from '@mui/material/Box'
import Header from '../../components/Header'
import AddButton from '../../components/AddButton'
import ListItem from '../../components/ListItem'
import { useMutation, useQuery } from '@apollo/client'
import { DEL_PRODUCT, GET_PRODUCTS } from '../../graphql/queries'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { colors } from '../../defaults'
import List from '../../components/List'
import { useState } from 'react'
import { Typography } from '@mui/material'
import ConfirmDialog from '../../components/ConfirmDialog'
import ErrorDialog from '../../components/ErrorDialog'
export default function Products() {
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [disabledId, setDisabledId] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [callback, setCallback] = useState(() => { })
    const { loading, data, error } = useQuery(GET_PRODUCTS)
    const [delProduct, { loading: mLoading, data: mData, error: mError }] = useMutation(DEL_PRODUCT)
    if (loading) return 'loading'
    if (error) return `${error.message}`

    if (mError) return 'mutation error'



    const deleteProduct = (name, id) => {
        setOpenDialog(true)
        setCallback(
            () => () => {
                setOpenDialog(false)
                setDisabledId(id)
                delProduct({
                    variables: { name },
                    update: (cache, { data: { deleteProduct } }) => {
                        if (deleteProduct.code == 200) {
                            const { products } = cache.readQuery({ query: GET_PRODUCTS })
                            const updatedProducts = products.filter(user => user.id != deleteProduct.product.id)
                            cache.writeQuery({
                                query: GET_PRODUCTS,
                                data: {
                                    products: updatedProducts
                                }
                            })
                        }
                    },
                    onError: (err) => {
                        setErrorMessage(err.message)
                        setOpen(true)
                    }
                })
            })
    }

    return (

        <Box>
            <Header text="Products" />
            <AddButton linkTo={"/createProduct"} />
            <List>

                {data.products.length > 0 ? data.products.map((product) => (<ListItem text={product.name}
                    icons={[{ icon: (props) => <EditIcon {...props} />, color: colors.blue, linkTo: `/updateProduct/${product.name}` },
                    { icon: (props) => <DeleteIcon {...props} onClick={(event) => { deleteProduct(product.name, product.id); event.stopPropagation() }} />, disabled: (disabledId == product.id) && true, color: (disabledId != product.id) && colors.red }
                    ]}
                    linkTo={`/productDetail/${product.name}`} key={product.id} />)) : <Typography>No Products Found</Typography>}
            </List>
            <ConfirmDialog open={openDialog} setOpen={setOpenDialog} confirm={callback} />
            <ErrorDialog open={open} setOpen={setOpen} errorMessage={errorMessage}/>
        </Box>
    )
}