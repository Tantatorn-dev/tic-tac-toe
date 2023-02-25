import type { Room } from "@prisma/client";

const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
  return (
    <div className="rounded-lg bg-sky-500 w-56 h-56">
      <h1>{room.name}</h1>
    </div>
  );
};

export default RoomCard;
