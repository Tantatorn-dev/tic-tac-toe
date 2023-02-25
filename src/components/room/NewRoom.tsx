import { api } from "../../utils/api";

const NewRoom: React.FC<{ refetch: () => void }> = ({ refetch }) => {
  const createNew = api.room.createNew.useMutation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          name: { value: string };
        };
        createNew.mutate({ name: target.name.value });
	refetch();
      }}
      className="flex flex-col gap-4"
    >
      <h1 className="text-xl font-semibold">Create new room</h1>
      <input
        type="text"
        name="name"
        placeholder="name"
        className="border border-slate-400 text-center"
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default NewRoom;
