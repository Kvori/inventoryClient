import AppRouter from './AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { useAppDispatch } from './hooks/redux'
import { useCheckQuery } from '@/features/user/userApi'
import { setUser } from '@/features/user/userSlice'
import PageLoading from '@/shared/components/PageLoading/PageLoading'

function App() {
  const dispatch = useAppDispatch()
  const { data, status } = useCheckQuery()
  const [isUserSet, setIsUserSet] = useState(false)

  useEffect(() => {
    if (data && status === 'fulfilled') {
      dispatch(setUser(data.user))
      localStorage.setItem('token', data.token)
      setIsUserSet(true)
    }
  }, [data, status, dispatch])

  if (status === 'pending' || (status === 'fulfilled' && !isUserSet)) {
    return (
      <PageLoading />
    )
  }

  return <AppRouter />
}

export default App

