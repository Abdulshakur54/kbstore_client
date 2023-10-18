import Box from '@mui/material/Box'
import Header from '../../components/Header'
import {useParams} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {GET_USER} from '../../graphql/queries'
import VerticalDisplay from '../../components/VerticalDisplay'
import { capitalizeEachWord, formatDate } from '../../utilities'
import UpdateButton from '../../components/UpdateButton'
export default function UserDetail(){
    const {username} = useParams()
    const {loading, data, error} = useQuery(GET_USER, {variables: {username}})
    if (loading) return "loading"
    if (error) return `${error.message}`
    return(
        <Box>
            <Header text={"User Detail"}/>
            <UpdateButton linkTo={`/updateUser/${username}`}/>
            <Box>
            <VerticalDisplay label={"Firstname"} value={capitalizeEachWord(data.user.firstName)} />
            <VerticalDisplay label={"Lastname"} value={capitalizeEachWord(data.user.lastName)} />
            <VerticalDisplay label={"Username"} value={capitalizeEachWord(data.user.username)} />
            <VerticalDisplay label={"Created"} value={formatDate(data.user.created)} />
            <VerticalDisplay label={"Updated"} value={formatDate(data.user.updated)} />
            </Box>
        </Box>
    )
}