
export const AuthLayout = ({children, title}) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen py-6 px-3 bg-white dark:bg-gray-900">
      <span className='text-primary-500 text-3xl font-bold'>MoviesApp</span>
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-6 text-center text-2xl font-medium text-gray-900 dark:text-white">{title}</h5>
          {children}
      </div>
    </div>
  )
}
