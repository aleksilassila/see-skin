import { useQuery } from "react-query";

export default function ManageIrritants() {
  const query = useQuery("user-irritants", fetchIrritants);
  return (
    <div className="m-auto max-w-2xl">
      <h1>Mange Your Irritants</h1>
      <div></div>
    </div>
  );
}
