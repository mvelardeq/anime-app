import { useDispatch, useSelector } from "react-redux";
import { badIcon, excellentIcon, goodIcon, starIcon } from "../../assets/icons";
import { startDeleteFavorite, startNewFavorite } from "../../store/moviesApp/thunks";
import { HeartIcon } from "./HeartIcon";
import {Button,Modal} from 'flowbite-react'
import { useState } from "react";

export const CardMovie = ({id,image,title,score,year,synopsis}) => {

  const {favorites} = useSelector(state=>state.movies)
  const dispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <div
      className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 relative"
    >
        <a href="#" onClick={(e)=>{e.preventDefault();setIsModalVisible(true)}}>
            <img className="rounded-t-lg h-72 w-full" src={image} alt="" />
        </a>
        <HeartIcon
          className="absolute top-2 left-2 hover:cursor-pointer"
          with={35}
          height={35}
          fill={favorites.find(favorite=>favorite.id===id) ? "red" : "white"}
          // onClick={() => dispatch(startNewFavorite(id))}
          onClick={() => favorites.find(favorite=>favorite.id===id) ? dispatch(startDeleteFavorite(id)) : dispatch(startNewFavorite(id))}
        />
        <div className="card-body">
          <div className="interactions flex items-center justify-end p-1">
            {score > 8 ? (
              <img src={excellentIcon} alt="" className="w-9" />
            ) : score > 5 ? (
              <img src={goodIcon} alt="" className="w-9" />
            ) : (
              <img src={badIcon} alt="" className="w-9" />
            )}
            <div className="score flex text-gray-900 dark:text-white">
              {Math.round(score * 10)}/
              <span className="text-xs self-start mt-1">100</span>{" "}
            </div>
          </div>
          <div className="info px-3 pb-3 flex-1 flex flex-col justify-between text-gray-900 dark:text-white">
            <div className="title truncate">{title}</div>
            {year && <div className="year mt-auto">({year})</div>}
          </div>
          
          {/* <Modal
            show={isModalVisible}
            onClose={()=>setIsModalVisible(false)}
            style={{height:"100vh"}}
            size="4xl"
          >
            <Modal.Header>
              Movie Information
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col items-start bg-white sm:flex-row dark:bg-transparent">
                <img className="object-cover w-auto h-96 sm:rounded-none mx-auto sm:m-0" src={image} alt="" />
                <div className="flex flex-col justify-between sm:px-4 sm:py-0 px-0 py-4 leading-normal">
                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <h3 className="flex items-center gap-1 mb-3 font-semibold text-gray-900 dark:text-white">{year}<img src={starIcon} className="h-4 inline-block ml-2" alt="" />{score}</h3>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{synopsis}</p>
                </div>
              </div>
            </Modal.Body>
          </Modal> */}

        </div>
    </div>
  );
};
