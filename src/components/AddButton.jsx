import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import ActionButton from './ActionButton';
export default function AddButton({linkTo}) {
    const navigate = useNavigate()
    return (
        <ActionButton render = {(props)=><AddCircleIcon {...props}  onClick={()=>navigate(linkTo)} />} />
    )
}