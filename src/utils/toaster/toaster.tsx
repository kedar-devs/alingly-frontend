import { useEffect } from 'react'
import toast,{Toaster as ReactHotToaster} from 'react-hot-toast'

function Toaster({message, type,count}: {message: string|React.ReactNode, type: 'success' | 'error' | 'custom',count: number}) {
    useEffect(() => {
        if(type === 'success' && typeof message === 'string') {
            toast.success(message)
        } else if(type === 'error' && typeof message === 'string') {
            toast.error(message)
        } else if(type === 'custom') {
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-in' : 'animate-out'} ${t.visible ? 'fade-in-0 scale-100' : 'fade-out-0 scale-95'}`}>
                    {message}
                </div>
            ))
        }
    }, [message, type,count])
  return (
    <ReactHotToaster />
  )
}

export default Toaster