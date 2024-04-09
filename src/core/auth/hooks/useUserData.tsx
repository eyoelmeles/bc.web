import { useState, useEffect } from "react";

interface UserModel {
  email: string;
  fullName: string;
  id: string;
  phoneNumber: string;
  profileImage: string;
  roleId: string;
  userName: string;
}

interface UserData {
  token: string;
  user: UserModel;
}

// Custom hook to manage user data in localStorage
function useUserData(): [UserData | null, (data: any) => void] {
  const [data, setData] = useState<UserData | null>(null);

  // Load data from localStorage when the hook is used
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  // Save data to localStorage
  const saveData = (newData: any) => {
    localStorage.setItem("userData", JSON.stringify(newData));
    setData(newData);
  };

  return [data, saveData];
}

export default useUserData;
