import { useState } from "react";

export default function useFlash(timeout = 5000) {
    const [show, setShow] = useState(false)
    const flash = (visible) => {
        if (visible) {
            setTimeout(() => { setShow(false), clearTimeout() }, timeout)
        } else {

            clearTimeout()
            setShow(visible)
        }
    }
    return [show, flash];
}