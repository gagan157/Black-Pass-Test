// UserContext.tsx
import { DEFAULT_QUEST_LIMIT } from "constants/config";
import React, { createContext, useContext, ReactNode, useState } from "react";


export interface User {
  username: string;
  user_name?: string;
  email: string;
  image: string;
  is_minted?: boolean;
  Factions?: any;
  avatar?: string;
  TinyUrl?: any;
  DailySpinActivity?: any;
  id?: string;
  referal_code ?: string;
  // Add other user details as needed
}

interface QuestPagination {
  ongoingQuests: {
    offset: number;
    limit: number;
  };
  oneTimeQuests: {
    offset: number;
    limit: number;
  };
  credited: {
    offset: number;
    limit: number;
  };
}

interface UserContextProps {
  user: User | null;
  updateUser: (userData: User) => void;
  dashboardMetrics?: any;
  setDashboardMetrics?: any;
  showProfile?: any;
  setShowProfile?: any;
  autoScroll?: any;
  setAutoScroll?: any;
  questPagination: QuestPagination;
  setQuestPagination?: any;
  showHowToPlay?: boolean;
  setShowHowToPlay?: React.Dispatch<React.SetStateAction<boolean>>;
  referral3X?:boolean
  setReferral3X?:React.Dispatch<boolean>;
  data3X?:Referral3XInterface;
  setData3X?:React.Dispatch<Referral3XInterface>;
}
interface Referral3XInterface {
  startTime: number;
  endTime: number;
} 

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [questPagination, setQuestPagination] = useState<QuestPagination>({
    oneTimeQuests: {
      limit: DEFAULT_QUEST_LIMIT,
      offset: 0,
    },
    ongoingQuests: {
      limit: DEFAULT_QUEST_LIMIT,
      offset: 0,
    },
    credited: {
      limit: DEFAULT_QUEST_LIMIT,
      offset: 0,
    },
  });
  const [user, setUser] = useState<User | null>(null);
  const [dashboardMetrics, setDashboardMetrics] = useState();
  const [showProfile, setShowProfile] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [referral3X,setReferral3X] = useState<boolean>(false);
  const [data3X, setData3X] = useState<Referral3XInterface>()


  const updateUser = (userData: User) => {
    setUser(userData);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        dashboardMetrics,
        setDashboardMetrics,
        showProfile,
        setShowProfile,
        autoScroll,
        setAutoScroll,
        questPagination,
        setQuestPagination,
        showHowToPlay,
        setShowHowToPlay,
        referral3X,
        setReferral3X,
        data3X, 
        setData3X
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
