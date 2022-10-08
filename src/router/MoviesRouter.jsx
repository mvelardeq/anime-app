import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { MoviesRoutes } from "../moviesApp/routes/MoviesRoutes"
import { CheckingAuth } from "../ui/CheckingAuth"

export const MoviesRouter = () => {
  const status = useCheckAuth()

  if(status==='checking'){
    return <CheckingAuth />
  }

  return (
    <Routes>
      {
        (status==='authenticated')
          ? <Route path="/*" element={<MoviesRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
      }

      <Route path="/*" element={<Navigate to="auth/login" />} />
        
    </Routes>
  )
}
