"use client";
import { useUser } from "../user";
import { useQuery } from "react-query";
import { fetchUser } from "../(api)/user/fetch-user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export default function Account() {
  const user = useUser();

  const { data: userInfo, isFetching } = useQuery(
    "user-info",
    () => fetchUser(),
    {
      enabled: !!user.user,
    }
  );

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Account</h1>
      <div>
        <div>Username: {userInfo?.name}</div>
        <EditButton onClick={() => {}} />
      </div>
    </div>
  );
}

function EditButton(props: { onClick: () => void }) {
  return (
    <FontAwesomeIcon
      icon={faPencil}
      className="p-1 h-4 opacity-0 hover:opacity-100 text-zinc-600"
      onClick={props.onClick}
    />
  );
}
