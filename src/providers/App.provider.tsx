import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types';

type AppContextType = {
  greeting: string;
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};
const AppContext = createContext<AppContextType>({
  greeting: 'Hello',
  moodList: [],
  handleSelectMood: () => {
    throw new Error('handleSelectMood not implemented');
  },
});

export const AppProvider: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((mood: MoodOptionType) => {
    setMoodList((prevMoodList) => [
      ...prevMoodList,
      {
        mood,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        greeting: 'Hello',
        moodList,
        handleSelectMood,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
