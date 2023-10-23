import React, {useEffect} from 'react';
import {Bar, Circle, CircleSnail, Pie} from 'react-native-progress';
import {
  ProgressType,
  TProgressCircleSnailProps,
} from 'src/components/progress/d';
import {useProgress} from 'src/hooks/progress/useProgress';
import {Colors} from 'src/constants/Colors';
import styles from './style';
import {Text, View} from 'react-native';

export const Progress = ({
  type = ProgressType.circleSnail,
  size = 40,
  indeterminate = true,
  color = Colors.PALETTE.BLUE._700,
  ...rest
}: TProgressCircleSnailProps) => {
  const props = {
    size,
    indeterminate,
    color,
    ...rest,
  };
  switch (type) {
    case ProgressType.circle:
      return <Circle {...props} />;
    case ProgressType.bar:
      return <Bar {...props} />;
    case ProgressType.pie:
      return <Pie {...props} />;
    default:
      return <CircleSnail {...props} />;
  }
};

const ProgressCenter = () => {
  const {isProgress, timer, resetProgress, text} = useProgress();
  useEffect(() => {
    let th = 0;
    if (timer) {
      clearTimeout(th);
      th = setTimeout(() => resetProgress(), timer) as any;
    }
    return () => {
      clearTimeout(th);
    };
  }, [timer, resetProgress]);

  if (!isProgress) {
    return null;
  }

  return (
    <View style={[styles.root]}>
      <Progress
        size={70}
        color={Colors.PALETTE.BLUE._700}
        indeterminate={true}
        type={ProgressType.circleSnail}
      />
      <View style={styles.loadingTextRoot}>
        <Text style={styles.loadingText}>{text}</Text>
      </View>
    </View>
  );
};

export default ProgressCenter;
