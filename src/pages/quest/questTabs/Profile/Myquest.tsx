import { AllQuestCard } from "../../_components/questCard/AllQuestCard"
import { Quest } from "../../../../types/quest";
import { constant } from "../../../../constants/constant";
import useFetchWithToken from "../../../../hooks/useQuest";
import { QuestsApiResponse } from "../AllQuests";
export const Myquest = () => {
    const { data: quests = [], isError, isLoading } = useFetchWithToken<Quest[]>(
        `${constant.BASE_URL}/v1/quest?type=self`,
        {
          selector: (res) => (res as QuestsApiResponse).data.quests,
        }
      );
    if (isError) return <p>Failed to load quests</p>;
    if (isLoading) return <p>Loading quests...</p>;

    return (
        <div>
        {quests.map((quest) => (
                  <AllQuestCard quest={quest}/>
                ))}
        </div>
    )
}