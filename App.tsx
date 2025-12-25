/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Routes from './src/routes';
import LoadingModal from './src/components/loading-modal';
import { spinnerRef } from './utils/spinnerRef';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView edges={[]} style={{ flex: 1 }}>
        <LoadingModal ref={spinnerRef} />
        <Routes />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
