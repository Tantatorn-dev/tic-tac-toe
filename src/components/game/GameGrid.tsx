import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { api } from "../../utils/api";
import { arrIndexToPos, posToArrIndex } from "../../utils/util";
import styles from "./GameGrid.module.css";

const GameGrid = () => {
  const router = useRouter();
  const session = useSession();

  const { id } = router.query;
  const { data: historyData, refetch } = api.room.getRoomHistory.useQuery(
    id as string
  );
  const { data: roomData } = api.room.getById.useQuery(id as string);
  const play = api.room.play.useMutation();

  const gameArr = useMemo(() => {
    const arr = ["", "", "", "", "", "", "", "", ""];

    if (historyData) {
      historyData.forEach((item) => {
        const { round, positionX, positionY } = item;
        const index = posToArrIndex(positionX, positionY);
        arr[index] = round % 2 == 0 ? "O" : "X";
      });
    }

    return arr;
  }, [historyData]);

  const isMyTurn = useMemo(() => {
    if (roomData && historyData) {
      if (session.data?.user?.id === roomData.playerOneId) {
        return historyData.length % 2 === 0;
      } else {
        return historyData.length % 2 === 1;
      }
    }
    return false;
  }, [roomData, historyData, session.data]);

  const handleClick = async (index: number) => {
    const { x, y } = arrIndexToPos(index);
    await play.mutateAsync({
      roomId: id as string,
      positionX: x,
      positionY: y,
      playerId: session.data?.user?.id as string,
    });
    refetch();
  };

  return (
    <div className="flex flex-col">
      <p>{isMyTurn ? "Your Turn" : "Opponent Turn"}</p>
      <div className="grid w-96 grid-cols-3 border border-purple-300">
        {gameArr.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="flex h-32 w-32 cursor-pointer place-items-center justify-center border border-purple-400 hover:bg-indigo-900"
          >
            {cell === "X" && <p className={styles.xoText}>X</p>}
            {cell === "O" && <p className={styles.xoText}>O</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
