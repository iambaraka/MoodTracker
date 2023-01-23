import { StyleSheet, View } from 'react-native';

import { FunctionComponent } from 'react';
import { useAppContext } from '../providers/App.provider';
import { groupBy } from 'lodash';
import { VictoryPie } from 'victory-native';
import { theme } from '../theme';

export const Analytics: FunctionComponent = () => {
  const { moodList } = useAppContext();

  const data = Object.entries(groupBy(moodList, 'mood.emoji')).map(
    ([key, value]) => ({
      x: key,
      y: value.length,
    })
  );

  return (
    <View style={styles.container}>
      <VictoryPie
        labelRadius={80}
        radius={150}
        innerRadius={50}
        colorScale={[
          theme.colorPurple,
          theme.colorLavender,
          theme.colorBlue,
          theme.colorGray,
          theme.colorWhite,
        ]}
        style={{ labels: { fontSize: 30 } }}
        data={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
