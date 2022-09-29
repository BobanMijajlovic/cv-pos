import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from 'src/navigation';
import store from 'src//store';
import {Provider} from 'react-redux';
import ProgressCenter from 'src/components/progress';
import {initDataBase} from 'src/database';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import KeyboardInternContainer from 'src/components/keyboard/context';
import {NativeModules} from 'react-native';
import {DEVICE_NEXGO} from 'src/config';
import Errors from 'src/components/error';
import useLPFRMonitor from 'src/hooks/useLPFR/useLPFRMonitor';

const _App = () => {
  useEffect(() => {
    initDataBase();
    if (DEVICE_NEXGO) {
      const {PrinterModule, LEDModule} = NativeModules;
      PrinterModule.HwtInitPrinter();
      PrinterModule.initFont('fonts/JetBrainsMono-Medium.ttf');
      LEDModule.initLED();
    }
  }, []);

  useLPFRMonitor();

  return (
    <SafeAreaProvider>
      <ProgressCenter />
      <Errors />
      <Navigation />
    </SafeAreaProvider>
  );
};

export const App = () => {
  return (
    <Provider store={store}>
      <KeyboardInternContainer>
        <ActionSheetProvider>
          <_App />
        </ActionSheetProvider>
      </KeyboardInternContainer>
    </Provider>
  );
};

export default App;
