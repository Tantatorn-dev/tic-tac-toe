import type { FormEvent } from "react";
import { api } from "../../utils/api";

const NewRoom: React.FC<{ refetch: () => void }> = ({ refetch }) => {
  const createNew = api.room.createNew.useMutation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
    };
    createNew.mutate({ name: target.name.value });
    refetch();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col rounded-md gap-4 bg-[var(--purple-one)] h-44 w-56 p-8 pt-6">
      <h1 className="text-lg font-semibold text-center">Create New Room</h1>
      <input
        type="text"
        name="name"
        placeholder="name"
        className="border border-slate-400 text-center p-1 rounded-md text-black"
      />
      <button type="submit" className="bg-purple-400 rounded-md p-1 hover:bg-purple-300">Create</button>
    </form>
  );
};

export default NewRoom;
