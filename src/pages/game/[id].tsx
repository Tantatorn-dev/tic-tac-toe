import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import GameGrid from "../../components/game/GameGrid";

const Game = () => {
  const session = useSession();
  const router = useRouter();

  if(!session){
    router.push("/room");
  }

  return (
    <div className="mt-8 flex flex-col items-center">
      <GameGrid />
    </div>
  );
};

export default Game;
