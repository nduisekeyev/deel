import { useEffect, useState } from "react";
import CONST from "../CONST";
import User from "../types/User";

/**
 * Custom React hook to fetch users from an API.
 * @returns An object containing users data, loading state, and error message.
 */

type UserResponse = {
  users: User[];
  loading: boolean;
  error: Error | null;
};

export const useFetchUsers = (init: boolean): UserResponse => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<User[]> => {
    try {
      const response = await fetch(`${CONST.BASE_API_URL}/users`);
      if (!response.ok) {
        throw new Error(`Network Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Use effect hook to fetch users data when the component mounts
  useEffect(() => {
    if (!init) return;

    if (init) {
      fetchData()
        .then((data) => {
          // Set the users state with the fetched data
          setUsers(data);
          // Reset the error state on successful fetch
          setError(null);
        })
        // Set the error state if an error occurs during fetch
        .catch((error) => setError(error));
    }
  }, [init]); //  Dependency array includes init to trigger effect when it changes

  return { users, loading, error };
};
