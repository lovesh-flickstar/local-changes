import React, { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { z } from "zod";
import avatar from '../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp'
import { toast } from "sonner";
import { constant } from "../../constants/constant";
import axios from "axios";


interface  Friend {
    _id: string;
    name: string; // Added the missing 'name' property
    username: string;
    photo: string;
    followed?: boolean;
}
const FriendSuggestionSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  photo: z.any().optional(),
});

type FriendSuggestionData = z.infer<typeof FriendSuggestionSchema>;

export function FriendSuggestions() {
     const {
        reset,
      } = useForm<FriendSuggestionData>({
        resolver: zodResolver(FriendSuggestionSchema),
      });
    const [suggestions, setSuggestions] = useState<Friend[]>();
    const [nextSuggestions, setNextSuggestions] = useState<Friend[]>();

    React.useEffect(() => {
        const fetchFriendsData = async () => {
          try {
            const response = await axios.get(
              `${constant.BASE_URL}/v1/friend-suggestion`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
              }
            );
            const data = response.data;
            console.log("FriendsData:", data);
            if (data.success) {
                setSuggestions(data.data.friendSuggestion);
                }
          } catch (error) {
            console.error("Failed to fetch FriendsData:", error);
            toast.error("Failed to load FriendsData.");
          }
        };
        fetchFriendsData();
    }, [reset]);



    // here the waste code from here
    const handleFollow = async (friendId: string) => {
        try {
            // Optimistically update the UI
            setSuggestions(prev => 
                prev?.map(friend => 
                    friend._id === friendId ? { ...friend, followed: true } : friend
                )
            );
    
            // Make API call to follow user
            console.log("Following user:", friendId);   
            await axios.post(
                `${constant.BASE_URL}/v1/follow/${friendId }`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        "Content-Type": "application/json"
                    }
                }
            );
    
            // Only replace after successful API call
            setTimeout(() => {
                replaceFriend(friendId);
            }, 2000);
    
        } catch (error) {
            console.error("Follow failed:", error);
            
            // Revert UI state on error
            setSuggestions(prev => 
                prev?.map(friend => 
                    friend._id === friendId ? { ...friend, followed: false } : friend
                )
            );
            
            toast.error("Failed to follow user. Please try again.");
        }
    };
    
    const replaceFriend = (friendId: string) => {
        setSuggestions(prev => {
            const updatedList = prev?.filter(friend => friend._id !== friendId);
            const nextFriend = nextSuggestions?.shift();
            if (nextFriend) {
                updatedList?.push(nextFriend);
                setNextSuggestions(nextSuggestions ? [...nextSuggestions] : []);
            }
            return updatedList;
        });
    };

    const handleRemove = (id: string) => {
        replaceFriend(id);
    };

    return (
        <div className="home-friend-suggestions py-3 px-3">
            <div className="flex justify-between items-center mb-4 border-white/10 border-t pt-2 2xl:pt-4">
                <p className="friend-suggestions-title font-medium font-[--font-family-primary] text-md 2xl:text-lg text-white mb-0">Friend Suggestions</p>
                <div className="flex items-center text-[#007AFF] see-all cursor-pointer">
                    <span className="text-md font-[--font-family-primary]">See All</span>
                    <i className="bi bi-arrow-up-right text-md 2xl:text-lg ms-1"></i>
                </div>
            </div>

            <hr />

            <ul className="list-unstyled border-b border-white/10 flex flex-col gap-1 2xl:gap-3 ">
                {suggestions?.map((friend) => (
                    <React.Fragment key={friend._id}>
                        <li className="flex items-center justify-between border-t border-white/10 py-1">
                            <Link to='/friend-profile' className="flex items-center gap-3 no-underline">
                                <img
                                    src={friend.photo || avatar}
                                    alt={friend.username}
                                    className="friend-avatar 2xl:w-12 2xl:h-12 w-7 h-7 xl:w-10 xl:h-10 rounded-full object-cover"
                                    loading="lazy"
                                />
                                <div className="text-sm 2xl:text-base">
                                    <p className="font-[--font-family-primary] tracking-wider font-medium text-white text-md">{friend.name}</p>
                                    <p className="friend-name text-xs text-[#8E8E93]">{friend.username}</p>
                                </div>
                            </Link>

                            <div className="flex items-center space-x-2">
                                <button
                                    className={`px-2 2xl:px-4 text-xs py-1 xl:py-1.5 xl:text-sm font-medium rounded-md transition ${
                                    friend.followed
                                        ? "border border-gray-300 text-gray-600 bg-transparent"
                                        : "bg-[#007AFF] border-[#007AFF] text-white cursor-pointer"
                                    }`}
                                    onClick={() => handleFollow(friend._id)}
                                    disabled={friend.followed}
                                >
                                    {friend.followed ? "Following" : "Follow"}
                                </button>
                                <i
                                    className="bi bi-x text-gray-300 text-2xl cursor-pointer hover:text-red-500 transition"
                                    onClick={() => handleRemove(friend._id)}
                                ></i>
                                </div>

                        </li>
                        <hr />
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}


