import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

// função async tem que passar Promise
export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("/users", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: new Date(user.createdAt).toLocaleDateString("pt-BT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    users,
    totalCount,
  };
}

export function useUsers(
  page: number,
  options?: UseQueryOptions<GetUsersResponse, unknown, GetUsersResponse, ["users", number]>
) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10min
    ...options,
  });
}
