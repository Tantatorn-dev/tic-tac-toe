import { useState } from "react";
import styles from "./GameGrid.module.css";

const GameGrid = () => {
  const [gameArr] = useState<string[]>(["", "", "", "", "", "", "", "", ""]);

  return (
    <div className="grid w-96 grid-cols-3 border border-purple-300">
      {gameArr.map((cell, index) => (
        <div
          key={index}
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
