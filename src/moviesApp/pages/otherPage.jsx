import { useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { MoviesLayout } from "../layout"
import {Navbar} from 'flowbite-react';

export const MoviePage = () => {

    // const [searchParams, setSearchParams] =useSearchParams()
    // console.log(searchParams.get("q"))

    // const {id} = useParams()
    // console.log(id)

  return (
    <MoviesLayout>
      {/* <h1>Movie Page</h1> */}
      <Navbar>
        <h1>Hola</h1>
      </Navbar>
    </MoviesLayout>
  )
}
