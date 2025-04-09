import { Link } from "react-router-dom";
import avatar from "../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp"
import { FriendSuggestions } from "../Section/FriendSuggestionSection";


export default function RightSidebar({image}: {image?: string}) {
  return (
    <aside className="hidden lg:flex flex-col py-3 sticky top-0 h-screen overflow-y-auto lg:w-3/7 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex items-center justify-between p-3">
                    <Link to='/profile' className="flex items-center no-underline">
                        <img src={image || avatar} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
                        <div className="ml-3">
                            <p className="text-md font-medium font-[--font-family-primary] tracking-wider text-white">John Smith</p>
                            <p className="text-xs text-[var(--gray-dark)]">@johnsmith2045</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2 text-white">
                        <svg className="mx-2" xmlns="http://www.w3.org/2000/svg" width="31" height="29" viewBox="0 0 31 29" fill="none">
                        <path d="M27.5556 29H3.44444C1.55 29 0 27.55 0 25.7778V3.22222C0 1.45 1.55 0 3.44444 0H27.5556C29.45 0 31 1.45 31 3.22222V25.7778C31 27.55 29.45 29 27.5556 29Z" fill="#007AFF" />
                        <path d="M21.3557 18.5012C21.3557 22.605 17.3104 23.1179 16.5652 23.1179V25.375H14.649V23.1179C14.0102 23.0153 9.53906 22.605 9.53906 17.6804H13.0521C13.0521 18.1934 13.0521 20.5531 15.7135 20.5531C17.9491 20.5531 17.9491 18.809 17.9491 18.6038C17.9491 14.9104 10.2843 16.4493 10.2843 10.704C10.2843 7.2158 13.5844 6.08726 15.0748 6.08726V3.625H16.991V6.08726C18.162 6.18986 21.4621 7.11321 21.4621 11.4222H17.9491C17.9491 10.4988 17.7362 8.65212 15.7135 8.65212C13.6909 8.65212 13.6908 10.3962 13.6908 10.704C13.5844 14.0896 21.3557 12.6533 21.3557 18.5012Z" fill="white" />
                        </svg>
                    </div>
                </div>
                <hr className="my-2" />
                <FriendSuggestions/>
            </aside>
  )
}
