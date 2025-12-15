import { TestSessionProvider } from './contexts/TestSessionContext';
import { StartingScreen } from './components/StartingScreen';

function App() {
  return (
    <TestSessionProvider>
      <StartingScreen />
    </TestSessionProvider>
  );
}

export default App;
