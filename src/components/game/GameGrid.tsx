import { useState } from "react";

const GameGrid = () => {
  const [gameArr] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  return (
    <div className="grid w-96 grid-cols-3 border border-purple-300">
      {gameArr.map((_, index) => (
        <div
          key={index}
          className="h-32 w-32 cursor-pointer border border-purple-400 hover:bg-indigo-900"
        ></div>
      ))}
    </div>
  );
};

export default GameGrid;
