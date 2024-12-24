declare module 'react-native-switch-selector' {
  import { Component } from 'react';
  import { ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';

  export interface SwitchSelectorProps {
    options: { label: string; value: any; testID?: string }[];
    initial?: number;
    onPress: (value: any) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    selectedTextStyle?: TextStyle;
    buttonColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    height?: number;
    fontSize?: number;
    disabled?: boolean;
    testID?: string;
  }

  export default class SwitchSelector extends Component<SwitchSelectorProps> {}
}
