import { Avatar } from "flowbite-react";
import moment from "moment/moment";
import { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { likePost, showingReplyForm } from "../../store/moviesApp/moviesSlice";
import { startCreateNewComment, startDislikePost, startLikePost } from "../../store/moviesApp/thunks";
import { LikeIcon } from "./LikeIcon";
import { SendIcon } from "./SendIcon";

export const CardPost = ({
  userInfo,
  description,
  photoPost,
  date,
  photoRelatedMovie,
  likes,
  comments,
  id,
}) => {
  const { uid } = useSelector((state) => state.auth);

  const [isShowingComments, setIsShowingComments] = useState(false)

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const onSubmitComment = ({ description})=>{
    dispatch(startCreateNewComment({postId:id,description,date:new Date().getTime(),userId:uid}))
    resetField("description")
  }

  const inputReplyRef = useRef(null)

  return (
    <div className="w-full md:w-[680px] mx-auto my-6 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center pt-4 px-8">
        <Avatar
          alt="User settings"
          img={userInfo?.photoURL}
          rounded={true}
          size={"md"}
          stacked={false}
        />
        <div className="font-medium text-black dark:text-white ml-4">
          <h2>{userInfo.displayName}</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {moment(date).fromNow(true)}
          </div>
        </div>
      </div>
      <div
        className="p-4 md:px-8 md:py-4 flex flex-col gap-3 bg-white rounded-lg dark:bg-gray-800"
        id="about"
      >
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
        <div className="image-post relative">
          <img className="w-full" src={photoPost} alt="" />
          <img
            className="absolute right-1 top-1 h-40 rounded-md"
            src={photoRelatedMovie}
            alt=""
          />
        </div>

        <div className="info-post flex justify-between">
          <button
            onClick={(e) =>
              likes.find((el) => el.userId === uid)
                ? dispatch(startDislikePost({ id, userId: uid }))
                : dispatch(
                    startLikePost({
                      id,
                      date: new Date().getTime(),
                      userId: uid,
                    })
                  )
            }
            className="flex items-center gap-2 py-1 px-2 border border-gray-300 rounded-sm bg-slate-50 hover:bg-slate-100 dark:border-gray-500 dark:rounded-sm dark:bg-slate-700 dark:hover:bg-slate-800"
          >
            <LikeIcon
              className={
                likes.find((el) => el.userId === uid)
                  ? "fill-primary-500 dark:fill-sky-500"
                  : "fill-gray-400"
              }
              height={15}
            />
            <h1
              className={`${
                likes.find((el) => el.userId === uid)
                  ? "text-primary-500 dark:text-sky-500"
                  : "text-zinc-600 dark:text-gray-400"
              } text-sm font-semibold`}
            >
              Like
            </h1>
          </button>
          <div className="rigth-info flex gap-2 font-light text-primary-500 dark:text-sky-500">
            {likes.length > 0 && (
              <button className="text-sm hover:underline ">
                {likes.length} Likes
              </button>
            )}
            {comments.length > 0 && (
              <button className="text-sm hover:underline" onClick={e=>setIsShowingComments(!isShowingComments)}>
                {comments.length} Comments
              </button>
            )}
          </div>
        </div>
        {
          isShowingComments && (
            <div className="comments-post">
              {comments.map(comment=>(
                  <div className="flex gap-2 items-start pt-5" key={comment.id}>
                  <Avatar
                    alt="User settings"
                    img={comment.userInfo?.photoURL}
                    rounded={true}
                    size={"sm"}
                    stacked={false}
                  />
                  <div className="text-black dark:text-white w-full flex flex-col gap-1">
                    <h2 className="text-xs font-medium text-gray-500 dark:text-gray-500">{comment.userInfo.displayName}</h2>
                    <p className="text-sm">{comment.description}</p>
                    <div className="w-full actions-comment text-sm text-gray-500 dark:text-gray-400 flex gap-4">
                      <div className="date text-sm">
                        {moment(comment.date).fromNow(true)}
                      </div>
                      <button className="reply font-medium hover:underline" onClick={async()=>{await dispatch(showingReplyForm({postId:id,commentId:comment.id})); inputReplyRef.current.focus()}}>
                        Reply
                      </button>
                      <button className="ml-auto">
                        <LikeIcon className="fill-gray-400" height={15}/>
                      </button>
                    </div>
                    <div className="w-full actions-comment text-sm text-gray-500 dark:text-gray-400 flex gap-4">
                    {
                      comment.isReplyingActive && (
                        <form className="comment-form flex gap-3 w-full">
                      <Avatar
                        alt="User settings"
                        img={userInfo?.photoURL}
                        rounded={true}
                        size={"sm"}
                        stacked={false}
                      />
                      <input
                        className="writing-section px-3 h-8 w-full bg-white placeholder:text-slate-400 placeholder:font-light dark:bg-slate-700 border outline-none border-secondary-200 dark:border-secondary-400 rounded-md"
                        placeholder="Write your reply here..."
                        ref={inputReplyRef}
                      ></input>
                      <button type="submit" className="ml-auto">
                        <SendIcon className="fill-primary-500 dark:fill-sky-500" />
                      </button>
                    </form>
                      )
                    }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div>
      <div className="py-4 px-4 md:px-8 flex text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-b-lg border-t border-gray-200 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800">
        <form className="comment-form flex gap-3 w-full" onSubmit={handleSubmit(onSubmitComment)}>
          <input
            className="writing-section px-3 h-10 w-full bg-white placeholder:text-slate-400 placeholder:font-light dark:bg-slate-700 border outline-none border-secondary-200 dark:border-secondary-400 rounded-md"
            placeholder="Write your comment here..."
            {...register("description",{required:"Description is neccesary"})}
          ></input>
          <button type="submit" className="ml-auto">
            <SendIcon className="fill-primary-500 dark:fill-sky-500" />
          </button>
        </form>
      </div>
    </div>
  );
};
