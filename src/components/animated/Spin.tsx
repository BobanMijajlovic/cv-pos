import React, {useRef, useEffect} from 'react';
import {Animated, Easing} from 'react-native';

const Spin = ({
  start,
  end,
  children,
  style,
}: {
  start: boolean;
  children: any;
  end?: boolean;
  style?: any;
}) => {
  let spinAnimation = useRef(new Animated.Value(0));
  const animation = useRef(
    Animated.loop(
      Animated.timing(spinAnimation.current, {
        toValue: 1,
        easing: Easing.linear,
        useNativeDriver: true,
        duration: 3000,
      }),
    ),
  );
  const startSpin = () => {
    animation.current.start();
  };

  useEffect(() => {
    if (start) {
      startSpin();
      return;
    }
    if (end) {
      animation.current.stop();
      return;
    }
  }, [start, end]);

  const rotate = spinAnimation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [{rotate}],
        ...style,
      }}>
      {children}
    </Animated.View>
  );
};

export default Spin;
