import { useEffect, useState } from "react";
import { AllQuestCard } from "../../_components/questCard/AllQuestCard"
import { Quest } from "../../../../types/quest";
import { constant } from "../../../../constants/constant";
import axios from "axios";

export const AppliedQuest = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchAppliedQuests = async () => {
      const accessToken = localStorage.getItem('accessToken');
  
      try {
        const response = await axios.get(`${constant.BASE_URL}/v1/quest?type=applied`, {
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
  
    fetchAppliedQuests();
  }, []);

  if (loading) return <p>Loading quests...</p>;

    return (
        <div>
        {quests.map((quest) => (
                  <AllQuestCard quest={quest}/>
                ))}
        </div>
    )
}