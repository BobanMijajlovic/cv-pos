import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, Text, Animated} from 'react-native';
import style from 'src/components/collapsible/style';

export type TCollapsibleProps = {
  collapsed?: boolean;
  children?: any;
  collapsedHeight?: number;
};

const Collapsible = ({
  collapsed,
  children,
  collapsedHeight = 0,
}: TCollapsibleProps) => {
  const ref = useRef(null);
  const height = useRef(new Animated.Value(collapsedHeight));
  const [state, setState] = useState({
    animating: false,
    contentHeight: 0,
  });

  const {animating} = state;
  let contentStyle = {};

  const setRef = useCallback(
    (_ref: any) => {
      ref.current = _ref;
    },
    [ref],
  );


  if (!collapsed) {
    return <></>;
  }

  return <View style={style.absolute}>{children}</View>;
};

export default Collapsible;
