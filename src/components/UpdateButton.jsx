import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import ActionButton from './ActionButton';
export default function AddButton({linkTo}) {
    const navigate = useNavigate()
    return (
        <ActionButton render = {(props)=><EditIcon {...props}  onClick={()=>navigate(linkTo)} />} />
    )
}