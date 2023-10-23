import React from 'react'
import {
  View,
  Text
} from "react-native";
import { TSimulationState } from "./d";
import { useMemo } from "react";
import { formatQuantity } from "src/util/utils";
import style from "./style";

const DisplaySimulation = (props: TSimulationState) => {


  const [line1, line2, isError] = useMemo(()=> {

    if(props.error) {
      return [
        'ERROR',
         props.error,
         true,
      ]
    }

    const _line1 = props.quantity ? `${formatQuantity(props.quantity as number, 0)} x`: `\u2000`;
    const _line2 = props.value || `0`


    return [_line1, _line2, false]

  },[props])


  return (
    <View style={[style.displayRoot]}>
      <Text style={[style.displayLine, style.displayFirstLine]}>{line1}</Text>
      <Text style={[
        style.displayLine,
        isError && style.displayError
      ]}>{line2}</Text>
    </View>
  )
}


export default DisplaySimulation
