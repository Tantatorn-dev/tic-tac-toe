import type { Room, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

type Props = {
  room: Room & {
    playerOne: User | null;
    playerTwo: User | null;
  };
};

const RoomCard: React.FC<Props> = ({ room }) => {
  const router = useRouter();
  const session = useSession();

  const join = api.room.join.useMutation();

  return (
    <div className="flex h-56 w-56 flex-col rounded-lg bg-[var(--fg-color)] pl-4 pr-4">
      <h1 className="mt-2 text-center text-xl font-bold text-[var(--purple-one)]">
        {room.name}
      </h1>
      <div className="mt-4 mb-4 flex flex-col gap-2">
        <h2 className="text-slate-600">
          <span className="mr-4 font-semibold">Player 1</span>
          {room.playerOneId ? room.playerOne?.name : "Empty"}
        </h2>
        <h2 className="text-slate-600">
          <span className="mr-4 font-semibold">Player 2</span>
          {room.playerTwoId ? room.playerTwo?.name : "Empty"}
        </h2>
      </div>
      <button
        onClick={async () => {
          await join.mutateAsync({
            roomId: room.id,
            userId: session.data?.user?.id as string,
          });
          router.push(`/game/${room.id}`);
        }}
        className="ml-auto mr-auto mt-auto mb-6 w-32 rounded-md bg-purple-500 p-2 hover:bg-purple-400"
      >
        Join
      </button>
    </div>
  );
};

export default RoomCard;
