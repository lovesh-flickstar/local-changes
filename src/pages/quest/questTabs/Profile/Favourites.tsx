import { useEffect, useState } from "react";
import { AllQuestCard } from "../../_components/questCard/AllQuestCard"
import { Quest } from "../../../../types/quest";
import { constant } from "../../../../constants/constant";
import axios from "axios";

export const FavouritesQuest = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchFavouritesQuests = async () => {
      const accessToken = localStorage.getItem('accessToken');
  
      try {
        const response = await axios.get(`${constant.BASE_URL}/v1/quest?type=favourites`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("fetching ",response)
        setQuests(response.data.data.quests);
      } catch (error) {
        console.error('Error fetching sponsored quests:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFavouritesQuests();
  }, []);

  if (loading) return <p>Loading quests...</p>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 overflow-y-auto max-h-[calc(100vh-200px)]  [-ms-overflow-style:none] [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden">
        {quests.map((quest) => (
                  <AllQuestCard quest={quest} key="fav"/>
                ))}
        </div>
    )
}