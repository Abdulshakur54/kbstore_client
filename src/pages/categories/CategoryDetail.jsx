import Box from '@mui/material/Box'
import Header from '../../components/Header'
import {useParams} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {GET_CATEGORY} from '../../graphql/queries'
import VerticalDisplay from '../../components/VerticalDisplay'
import { capitalizeEachWord, formatDate } from '../../utilities'
import UpdateButton from '../../components/UpdateButton'
export default function CategoryDetail(){
    const {name} = useParams()
    const {loading, data, error} = useQuery(GET_CATEGORY, {variables: {name}})
    if (loading) return "loading"
    if (error) return `${error.message}`
    return(
        <Box>
            <Header text={"Category Detail"}/>
            <UpdateButton linkTo={`/updateCategory/${name}`}/>
            <Box>
            <VerticalDisplay label={"Name"} value={capitalizeEachWord(data.category.name)} />
            <VerticalDisplay label={"Created"} value={formatDate(data.category.created)} />
            <VerticalDisplay label={"Updated"} value={formatDate(data.category.updated)} />
            </Box>
        </Box>
    )
}