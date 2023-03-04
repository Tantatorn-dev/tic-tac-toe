import { useRouter } from "next/router";
import { useMemo } from "react";
import { api } from "../../utils/api";
import { arrIndexToPos, posToArrIndex } from "../../utils/util";
import styles from "./GameGrid.module.css";

const GameGrid = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, refetch } = api.room.getRoomHistory.useQuery(id as string);
  const play = api.room.play.useMutation();

  const gameArr = useMemo(() => {
    const arr = ["", "", "", "", "", "", "", "", ""];

    if (data) {
      data.forEach((item) => {
        const { positionX, positionY } = item;
        const index = posToArrIndex(positionX, positionY);
        arr[index] = "X";
      });
    }

    return arr;
  }, [data]);

  const handleClick = async (index: number) => {
    const { x, y } = arrIndexToPos(index);
    await play.mutateAsync({
      roomId: id as string,
      positionX: x,
      positionY: y,
    });
    refetch();
  };

  return (
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
  );
};

export default GameGrid;
