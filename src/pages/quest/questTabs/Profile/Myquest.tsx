import { Quest } from "../../../../types/quest";
import { constant } from "../../../../constants/constant";
import useFetchWithToken from "../../../../hooks/useQuest";
import { QuestsApiResponse } from "../AllQuests";
import { MyAllQuestCard } from "../../_components/questCard/MyAllQuest";
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 overflow-y-auto max-h-[calc(100vh-200px)]  [-ms-overflow-style:none] [scrollbar-width:none]
  [&::-webkit-scrollbar]:hidden">
        {quests.map((quest) => (
                  <MyAllQuestCard quest={quest} key="self"/>
                ))}
        </div>
    )
}