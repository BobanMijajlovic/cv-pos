import React from 'react';
import style from 'src/components/scrollView/style';
import {Dimensions, ScrollView} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {iconReceipt} from 'src/icon';
import {TScrollViewProps} from 'src/components/scrollView/d';

const ScrollViewContainer = ({children, icon, rootStyle}: TScrollViewProps) => {


  return (
    <ScrollView contentContainerStyle={[style.root, rootStyle]}>
      <FontAwesome5Icon
        name={icon ? icon : iconReceipt}
        style={style.scrollViewBackgroundIcon}
      />
      {children}
    </ScrollView>
  );
};

export default ScrollViewContainer;
