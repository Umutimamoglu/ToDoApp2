
import { ThemeProvider } from '@shopify/restyle';
import theme from './utils/theme';
import Navigation from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar
          translucent
        />
      </SafeAreaProvider>

    </ThemeProvider>

  )
}

