import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

const Shake = ({start, children}: {start: boolean; children: any}) => {
  let shakeAnimation = useRef(new Animated.Value(0));
  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation.current, {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation.current, {
        toValue: -5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation.current, {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation.current, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    start && startShake();
  }, [start]);
  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [{translateX: shakeAnimation.current}],
      }}>
      {children}
    </Animated.View>
  );
};

export default Shake;
