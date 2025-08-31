import AppRouter from './AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../shared/hooks/redux'
import { useCheckQuery } from '@/features/user/userApi'
import { setUser } from '@/features/user/model/userSlice'

function App() {
  const dispatch = useAppDispatch()
  const { data, status } = useCheckQuery()
  const [isUserSet, setIsUserSet] = useState(false)

  useEffect(() => {
    if (data && status === 'fulfilled') {
      dispatch(setUser(data))
      setIsUserSet(true)
    }
  }, [data, status, dispatch])

  if (status === 'pending' || (status === 'fulfilled' && !isUserSet)) {
    return <div>Loading . . .</div>
  }

  return <AppRouter />
}

export default App

