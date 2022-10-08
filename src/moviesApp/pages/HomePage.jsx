import { useEffect, useRef, useState } from "react";
import { MoviesLayout } from "../layout";
import { useSelector } from "react-redux";
import { OptionsIcon } from "../components";
import { attachIcon, imageIcon } from "../../assets/icons";
import { useForm } from "react-hook-form";
import { Modal } from "flowbite-react";

export const HomePage = () => {
  const { displayName, photoURL, email } = useSelector((state) => state.auth);

  const {register,handleSubmit,formState:{errors}} = useForm()

  const [selectedFile, setselectedFile] = useState(null)
  const [url, setUrl] = useState(null)
  useEffect(()=>{
    if(!selectedFile){
      return
    }
    const ruta = URL.createObjectURL(selectedFile)
    setUrl(ruta) 
  },[selectedFile])

  const [isModalVisible, setIsModalVisible] = useState(false)



  const onSubmitSocial = (data)=>{
    console.log(data)
  }

  const dropElement = useRef(null)

  const showDropdown = ()=>{
    dropElement.current.classList.toggle("hidden")
  }

  return (
    <MoviesLayout>
      <form onSubmit={handleSubmit(onSubmitSocial)} className="w-full md:w-[680px] mx-auto bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 bg-white flex rounded-lg md:p-8 dark:bg-gray-800">
          <span className="w-1/4">
            <img
              className="w-12 h-12 rounded-full self-start"
              src={photoURL}
              alt="Rounded avatar"
            />
          </span>
          <div className="block w-3/4">
            <textarea
              id="description"
              rows="4"
              {...register("description",{required:"Description is required in post"})}
              className="w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Share your thoughts..."
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            <img src={url ? url : ''} className={url ? "mt-4" : ""} alt="" />
          </div>

        </div>
        <div className="flex items-center px-8 py-2 flex-wrap text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-b-lg border-t border-gray-200 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800">

          <input
            type="file"
            id="photoFile"
            className="hidden"
            name="photoFile"
            {...register("photoFile")}
            onChange={e=>setselectedFile(e.target.files[0])}
            disabled={false}
          />
          <label htmlFor="photoFile" className={`${false ? 'bg-gray-500' : 'hover:cursor-pointer' } rounded-lg mr-3`}>
            <img src={imageIcon} className="w-8" alt="" />
          </label>
          <label className={`${false ? 'bg-gray-500' : 'hover:cursor-pointer' } rounded-lg flex gap-3`} onClick={(e)=>{e.preventDefault();setIsModalVisible(true)}}>
            <img src={attachIcon} className="w-6 fill-gray-300" alt="" />
          </label>
          <button
            type="submit"
            className="ml-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Publish
          </button>
        </div>
      </form>

      <div className="w-full md:w-[680px] mx-auto my-6 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center pt-4 px-8">
          <img className="w-10 h-10 rounded-full" src={photoURL} alt="" />
          <div className="font-medium text-black dark:text-white ml-4">
            <div>Jese Leos</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Hace 15 min
            </div>
          </div>

          <div className="flex justify-center ml-auto">
              <div className="dropdown relative">
                <div
                  className="
                        hover:cursor-pointer
                        dropdown-toggle
                        font-medium
                        text-xs
                        flex
                        items-center
                        whitespace-nowrap
                        fill-white
                      "
                  onClick={showDropdown}
                >
                  <OptionsIcon className="fill-black dark:fill-white" />
                </div>
                <ul
                  className="
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          right-0
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          m-0
          bg-clip-padding
          border-none
        " 
        ref={dropElement} >
                  <li>
                    <a
                      className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                      href="#"
                    >
                      Action
                    </a>
                  </li>
                  <li>
                    <a
                      className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                      href="#"
                    >
                      Another action
                    </a>
                  </li>
                  <li>
                    <a
                      className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                      href="#"
                    >
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
          </div>
        </div>
        <div
          className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
          id="about"
        >
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Powering innovation &amp; trust at 200,000+ companies worldwide
          </h2>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            Empower Developers, IT Ops, and business teams to collaborate at
            high velocity. Respond to changes and deliver great customer and
            employee service experiences fast.
          </p>
        </div>
        <div className="flex flex-wrap text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-b-lg border-t border-gray-200 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800">
          <h1 className="py-4 px-8">Hola Mundo</h1>
        </div>
      </div>
      <Modal
            show={isModalVisible}
            onClose={()=>setIsModalVisible(false)}
            style={{height:"100vh",top:"200px"}}
            size="2xl"
          >
            <Modal.Header>
              Movie Information
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col items-start bg-white sm:flex-row dark:bg-transparent">
                <img className="object-cover w-auto h-96 sm:rounded-none mx-auto sm:m-0" src="" alt="" />
                <div className="flex flex-col justify-between sm:px-4 sm:py-0 px-0 py-4 leading-normal">
                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">defrv frrv</h5>
                    <h3 className="flex items-center gap-1 mb-3 font-semibold text-gray-900 dark:text-white">1818</h3>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">rvrv rve</p>
                </div>
              </div>
            </Modal.Body>
          </Modal>
    </MoviesLayout>
  );
};
