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

function useUserData(): [UserData | null, (data: any) => void] {
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const saveData = (newData: any) => {
    localStorage.setItem("userData", JSON.stringify(newData));
    setData(newData);
  };

  return [data, saveData];
}

export default useUserData;
