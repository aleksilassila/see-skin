import Api from "../api";

interface UserInfo {
  id: string;
  googleId: string;
  name: string;
}

export function fetchUser() {
  return Api.fetch<UserInfo>("/user").then((res) => res.data);
}
