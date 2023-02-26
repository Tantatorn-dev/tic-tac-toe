import { api } from "../../utils/api";
import NewRoom from "./NewRoom";
import RoomCard from "./RoomCard";

const RoomList = () => {
  const { data, refetch } = api.room.getAll.useQuery();
  
  return (
    <div className="flex flex-row gap-8 mt-10">
      <NewRoom refetch={refetch as () => void} />
      <div className="grid grid-cols-4 gap-4 w-full place-items-end">
        {data?.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomList;
