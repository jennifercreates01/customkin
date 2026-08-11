import type { FamilyTree as FamilyTreeType } from '../types/family'
import { getGenerations } from '../utils/treeLayout'
import PersonCard from './PersonCard'

type FamilyTreeProps = {
  family: FamilyTreeType
}

function FamilyTree({ family }: FamilyTreeProps) {
  const generations = getGenerations(family)

  return (
    <section>
      <h2>{family.title}</h2>

      {generations.map((generation) => (
        <div key={generation.level}>
          <h3>Generation {generation.level}</h3>

          {generation.people.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      ))}
    </section>
  )
}

export default FamilyTree