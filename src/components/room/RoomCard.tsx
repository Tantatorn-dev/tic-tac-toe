import type { Room } from "@prisma/client";

const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
  return (
    <div className="rounded-lg bg-[var(--fg-color)] w-56 h-56">
      <h1 className="text-[var(--purple-one)] font-bold text-xl text-center mt-2">{room.name}</h1>
    </div>
  );
};

export default RoomCard;
