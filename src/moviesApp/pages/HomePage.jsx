import { useEffect, useRef, useState } from "react";
import { MoviesLayout } from "../layout";
import { useSelector } from "react-redux";
import { OptionsIcon, ShowMoviesbyURL } from "../components";
import { attachIcon, imageIcon } from "../../assets/icons";
import { useForm } from "react-hook-form";
import { Modal } from "flowbite-react";
import { ShowAttachedMovies } from "../components/ShowAttachedMovies";

export const HomePage = () => {
  const { displayName, photoURL, email } = useSelector((state) => state.auth);

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedFile, setselectedFile] = useState(null);
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const ruta = URL.createObjectURL(selectedFile);
    setUrl(ruta);
  }, [selectedFile]);
  const onSubmitSocial = (data) => {
    console.log(data);
  };

  // Modal Attach movie in form
  const [isModalVisible, setIsModalVisible] = useState(false);
  const initialFormModal ={attachMovie:''}
  const [formModal, setFormModal] = useState(initialFormModal);
  const [searchMovies, setSearchMovies] = useState("");
  const onInputChange = ({ target }) => {
    console.log(target.value);
    setFormModal({...formModal,[target.name]:target.value});
  };
  const onResetModalForm = ()=>{
    setFormModal(initialFormModal)
  }
  const onModalSubmit = (e) => {
    e.preventDefault();
    if(formModal.attachMovie==='') return setSearchMovies('')
    setSearchMovies(`https://api.jikan.moe/v4/anime?q=${formModal.attachMovie}`);
  };

  const dropElement = useRef(null);
  const showDropdown = () => {
    dropElement.current.classList.toggle("hidden");
  };

  return (
    <MoviesLayout>
      <form
        onSubmit={handleSubmit(onSubmitSocial)}
        className="w-full md:w-[680px] mx-auto bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
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
              {...register("description", {
                required: "Description is required in post",
              })}
              className="w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Share your thoughts..."
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
            <img src={url ? url : ""} className={url ? "mt-4" : ""} alt="" />
          </div>
        </div>
        <div className="flex items-center px-8 py-2 flex-wrap text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-b-lg border-t border-gray-200 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800">
          <input
            type="file"
            id="photoFile"
            className="hidden"
            name="photoFile"
            {...register("photoFile")}
            onChange={(e) => setselectedFile(e.target.files[0])}
            disabled={false}
          />
          <label
            htmlFor="photoFile"
            className={`${
              false ? "bg-gray-500" : "hover:cursor-pointer"
            } rounded-lg mr-3`}
          >
            <img src={imageIcon} className="w-8" alt="" />
          </label>
          <label
            className={`${
              false ? "bg-gray-500" : "hover:cursor-pointer"
            } rounded-lg flex gap-3`}
            onClick={(e) => {
              e.preventDefault();
              setIsModalVisible(true);
            }}
          >
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
                ref={dropElement}
              >
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
        onClose={() => setIsModalVisible(false)}
        style={{ overflowY: "hidden" }}
        size="4xl"
      >
        <Modal.Header>Attach some movie</Modal.Header>
        <Modal.Body>
          <form className="flex items-center" onSubmit={onModalSubmit}>
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center justify-between pl-3 pointer-events-none w-full">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                
              </div>
              <input
                type="text"
                id="attachMovie"
                name="attachMovie"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                value={formModal.attachMovie}
                onChange={onInputChange}
              />
              {(formModal.attachMovie!='') && <div onClick={()=>{onResetModalForm();setSearchMovies('')}} className="absolute right-4 z-50 top-2 hover:cursor-pointer">x</div>}
            </div>
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
              
            </button>
          </form>
          <div
            
            className="mt-3 bg-white sm:flex-row dark:bg-transparent h-96 overflow-auto"
          >
            {
              searchMovies==='' ? <p className="dark:text-white">Search a movie...</p> : <ShowAttachedMovies url={searchMovies} page={9} />
            }
            
          </div>
        </Modal.Body>
      </Modal>
    </MoviesLayout>
  );
};
