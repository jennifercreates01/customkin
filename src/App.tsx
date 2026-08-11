import FamilyTree from './components/FamilyTree'
import { sampleFamily } from './data/sampleFamily'

function App() {
  return (
    <main>
      <h1>CustomKin</h1>
      <p>Build your family. Make it yours.</p>

      <FamilyTree family={sampleFamily} />
    </main>
  )
}

export default App