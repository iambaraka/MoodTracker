import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types';

import AsyncStorage from '@react-native-async-storage/async-storage';

type AppData = {
  moodList: MoodOptionWithTimestamp[];
};

const APP_DATA_KEY = 'Mood-TRACKER-APP-DATA';

const setAppData = async (appData: AppData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(appData);
    await AsyncStorage.setItem(APP_DATA_KEY, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getAppData = async (): Promise<AppData> => {
  try {
    const jsonValue = await AsyncStorage.getItem(APP_DATA_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : { moodList: [] };
  } catch (e) {
    // error reading value
    return { moodList: [] };
  }
};

type AppContextType = {
  greeting: string;
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
  handleDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};
const AppContext = createContext<AppContextType>({
  greeting: 'Hello',
  moodList: [],
  handleSelectMood: () => {
    throw new Error('handleSelectMood not implemented');
  },
  handleDeleteMood: () => {
    throw new Error('handleDeleteMood not implemented');
  },
});

export const AppProvider: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((mood: MoodOptionType) => {
    setMoodList((prevMoodList) => {
      const newMoodList = [
        {
          mood,
          timestamp: Date.now(),
        },
        ...prevMoodList,
      ];

      setAppData({ moodList: newMoodList });

      return newMoodList;
    });
  }, []);

  const handleDeleteMood = useCallback((mood: MoodOptionWithTimestamp) => {
    setMoodList((prevMoodList) => {
      const newMoodList = prevMoodList.filter(
        (item) => item.timestamp !== mood.timestamp
      );
      setAppData({ moodList: newMoodList });
      return newMoodList;
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const appData = await getAppData();
      setMoodList(appData.moodList);
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        greeting: 'Hello',
        moodList,
        handleSelectMood,
        handleDeleteMood,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
