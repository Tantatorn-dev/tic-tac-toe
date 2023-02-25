import { signIn, signOut, useSession } from "next-auth/react";

const Auth: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <p className="text-center text-xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-purple-500 px-10 py-3 font-semibold text-white no-underline transition hover:bg-purple-400"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Auth;
