import { flicks } from "../Flicks/Flicks"

export const ProfileFlick = () => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-1">
        {flicks.map((flick, index) => (
            <div key={index} className="w-full h-auto overflow-hidden rounded-lg">
            <img
                src={flick}
                alt={`Flick ${index + 1}`}
                className="w-full h-full object-contain hover:scale-110 transition-transform duration-300 rounded-lg"
            />
            </div>
        ))}
    </div>
  )
}
