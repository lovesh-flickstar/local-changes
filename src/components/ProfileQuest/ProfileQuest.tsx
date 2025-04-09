import quest3 from "../../assets/compressed/quest3.webp";
import quest2 from "../../assets/compressed/quest2.webp";
import quest1 from "../../assets/compressed/quest1.webp";
import { QuestCard } from "../Card/QuestCard";

const questData = [
    {
        image: quest2,
        title: "Visit My Coffee Cafe",
        status: "400/400",
        description: "Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us! Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us!",
        amount: 100,
    },
    {
        image: quest3,
        title: "Visit My Coffee Cafe",
        status: "100/400",
        description: "Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us! Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us!",
        amount: 100,
    },
    {
        image: quest1,
        title: "Visit My Coffee Cafe",
        status: "400/400",
        description: "Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us! Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us!",
        amount: 100,
    },
];


export const ProfileQuest = () => {
    return (
        <div className="user-profile-quest-container">
            {questData.map((data, index) => (
                <QuestCard key={index} data={data} />
            ))}
        </div>
    );
};
