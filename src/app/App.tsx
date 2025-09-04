import { AppProviders } from '../providers/AppProviders'
import { AppRouter } from './AppRouter'

function App(): JSX.Element {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}

export default App