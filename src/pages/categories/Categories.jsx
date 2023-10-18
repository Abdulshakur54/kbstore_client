import Box from '@mui/material/Box'
import Header from '../../components/Header'
import AddButton from '../../components/AddButton'
import ListItem from '../../components/ListItem'
import { useMutation, useQuery } from '@apollo/client'
import { DEL_CATEGORY, GET_CATEGORIES } from '../../graphql/queries'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { colors } from '../../defaults'
import List from '../../components/List'
import { useState } from 'react'
import { Typography } from '@mui/material'
import ConfirmDialog from '../../components/ConfirmDialog'
import ErrorDialog from '../../components/ErrorDialog'
export default function Categories() {
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [disabledId, setDisabledId] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [callback, setCallback] = useState(() => { })
    const { loading, data, error } = useQuery(GET_CATEGORIES)
    const [delCategory, { loading: mLoading, data: mData, error: mError }] = useMutation(DEL_CATEGORY)
    if (loading) return 'loading'
    if (error) return `${error.message}`

    if (mError) return 'mutation error'



    const deleteCategory = (name, id) => {
        setOpenDialog(true)
        setCallback(
            () => () => {
                setOpenDialog(false)
                setDisabledId(id)
                delCategory({
                    variables: { name },
                    update: (cache, { data: { deleteCategory } }) => {
                        if (deleteCategory.code == 200) {
                            const { categories } = cache.readQuery({ query: GET_CATEGORIES })
                            const updatedCategories = categories.filter(category => category.id != deleteCategory.category.id)
                            cache.writeQuery({
                                query: GET_CATEGORIES,
                                data: {
                                    categories: updatedCategories
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
            <Header text="Categories" />
            <AddButton linkTo={"/createCategory"} />
            <List>

                {data.categories.length > 0 ? data.categories.map((category) => (<ListItem text={category.name}
                    icons={[{ icon: (props) => <EditIcon {...props} />, color: colors.blue, linkTo: `/updateCategory/${category.name}` },
                    { icon: (props) => <DeleteIcon {...props} onClick={(event) => { deleteCategory(category.name, category.id); event.stopPropagation() }} />, disabled: (disabledId == category.id) && true, color: (disabledId != category.id) && colors.red }
                    ]}
                    linkTo={`/categoryDetail/${category.name}`} key={category.id} />)) : <Typography>No Category Found</Typography>}
            </List>
            <ConfirmDialog open={openDialog} setOpen={setOpenDialog} confirm={callback} />
            <ErrorDialog open={open} setOpen={setOpen} errorMessage={errorMessage} />
        </Box>
    )
}