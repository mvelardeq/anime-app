import { Avatar } from "flowbite-react"
import moment from "moment/moment"

export const CardPost = ({userInfo,description,photoPost,date}) => {

  return (
      <div className="w-full md:w-[680px] mx-auto my-6 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center pt-4 px-8">
          <Avatar alt="User settings" img={userInfo?.photoURL} rounded={true} size={'md'} stacked={false} />
          <div className="font-medium text-black dark:text-white ml-4">
            <h2>{userInfo.displayName}</h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {moment(date).fromNow()}
            </div>
          </div>
        </div>
        <div
          className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
          id="about"
        >
          <img src={photoPost} alt="" />
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-b-lg border-t border-gray-200 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800">
          <h1 className="py-4 px-8">Hola Mundo</h1>
        </div>
      </div>
    )
}
