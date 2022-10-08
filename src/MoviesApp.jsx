import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { MoviesRouter } from "./router/MoviesRouter"
import { store } from "./store"

export const MoviesApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
          <MoviesRouter />
      </Provider>
    </BrowserRouter>
  )
}
