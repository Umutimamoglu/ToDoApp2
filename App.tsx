
import { ThemeProvider } from '@shopify/restyle';
import theme from './utils/theme';
import Navigation from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { SWRConfig } from 'swr';
import { AppState } from 'react-native';
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SWRConfig
          value={{
            provider: () => new Map(),
            isVisible: () => true,
            initFocus: (callback) => {
              let appState = AppState.currentState;

              const onAppStateChange = (nextAppState: any) => {
                if (appState.match(/inactive|background/) && nextAppState === 'active') {
                  callback();
                }
                appState = nextAppState;
              };

              const subscription = AppState.addEventListener('change', onAppStateChange);

              return () => {
                subscription.remove();
              };
            },
          }}
        >
          <Navigation />
        </SWRConfig>
        <StatusBar translucent />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
