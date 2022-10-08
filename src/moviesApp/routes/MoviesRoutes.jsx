import { Navigate, Route, Routes } from "react-router-dom"
import { FavoritesPage, HomePage, MoviesPage, ProfilePage } from "../pages"

export const MoviesRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MoviesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />

        <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
