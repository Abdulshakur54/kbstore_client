import Box from '@mui/material/Box'
import Header from '../../components/Header'
import AddButton from '../../components/AddButton'
import ListItem from '../../components/ListItem'
import { useMutation, useQuery } from '@apollo/client'
import { DEL_USER, GET_USERS } from '../../graphql/queries'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { colors } from '../../defaults'
import List from '../../components/List'
import { useState } from 'react'
import { Typography } from '@mui/material'
import ConfirmDialog from '../../components/ConfirmDialog'
import ErrorDialog from '../../components/ErrorDialog'
export default function Users() {
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [disabledId, setDisabledId] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [callback, setCallback] = useState(() => { })
    const { loading, data, error } = useQuery(GET_USERS)
    const [delUser, { loading: mLoading, data: mData, error: mError }] = useMutation(DEL_USER)
    if (loading) return 'loading'
    if (error) return 'error'

    if (mError) return 'mutation error'



    const deleteUser = (username, id) => {
        setOpenDialog(true)
        setCallback(
            () => () => {
                setOpenDialog(false)
                setDisabledId(id)
                delUser({
                    variables: { username },
                    update: (cache, { data: { deleteUser } }) => {
                        if (deleteUser.code == 200) {
                            const { users } = cache.readQuery({ query: GET_USERS })
                            const updatedUsers = users.filter(user => user.id != deleteUser.user.id)
                            cache.writeQuery({
                                query: GET_USERS,
                                data: {
                                    users: updatedUsers
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
            <Header text="Users" />
            <AddButton linkTo={"/createUser"} />
            <List>

                {data.users.length > 0 ? data.users.map((user) => (<ListItem text={user.username}
                    icons={[{ icon: (props) => <EditIcon {...props} />, color: colors.blue, linkTo: `/updateUser/${user.username}` },
                    { icon: (props) => <DeleteIcon {...props} onClick={(event) => { deleteUser(user.username, user.id); event.stopPropagation() }} />, disabled: (disabledId == user.id) && true, color: (disabledId != user.id) && colors.red }
                    ]}
                    linkTo={`/userDetail/${user.username}`} key={user.id} />)) : <Typography>No Users Found</Typography>}
            </List>
            <ConfirmDialog open={openDialog} setOpen={setOpenDialog} confirm={callback} />
            <ErrorDialog open={open} setOpen={setOpen} errorMessage={errorMessage}/>
        </Box>
    )
}