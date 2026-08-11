import FamilyTree from './components/FamilyTree'
import TreeCanvas from './components/TreeCanvas'
import { sampleFamily } from './data/sampleFamily'

function App() {
  return (
    <main>
      <h1>CustomKin</h1>
      <p>Build your family. Make it yours.</p>

      <FamilyTree family={sampleFamily} />

      <TreeCanvas family={sampleFamily} />
    </main>
  )
}

export default App