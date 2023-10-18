import { useEffect, useState } from "react"

export default function FlashMessage({component, timeout=3000}){
    const [show,setShow] = useState(true)
    useEffect(()=>{

    },[])
    return(
        component
    )
}