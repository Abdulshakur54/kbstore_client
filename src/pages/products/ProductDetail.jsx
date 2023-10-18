import Box from '@mui/material/Box'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PRODUCT } from '../../graphql/queries'
import VerticalDisplay from '../../components/VerticalDisplay'
import { capitalizeEachWord, formatDate } from '../../utilities'
import UpdateButton from '../../components/UpdateButton'
export default function ProductDetail() {
    const { name } = useParams()
    const { loading, data, error } = useQuery(GET_PRODUCT, { variables: { name } })
    if (loading) return "loading"
    if (error) return `${error.message}`
    return (
        <Box>
            <Header text={"Product Detail"} />
            <UpdateButton linkTo={`/updateProduct/${name}`} />
            <Box>
                <VerticalDisplay label={"Name"} value={capitalizeEachWord(data.product.name)} />
                <VerticalDisplay label={"Category"} value={capitalizeEachWord(data.product.category)} />
                <VerticalDisplay label={"Cost Price"} value={data.product.costPrice} />
                <VerticalDisplay label={"Image"} value={capitalizeEachWord(data.product.image)} />
                <VerticalDisplay label={"Description"} value={capitalizeEachWord(data.product.description)} />
                <VerticalDisplay label={"Created"} value={formatDate(data.product.created)} />
                <VerticalDisplay label={"Updated"} value={formatDate(data.product.updated)} />
            </Box>
        </Box>
    )
}