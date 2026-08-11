import type { FamilyTree as FamilyTreeType } from '../types/family'
import {
  getFamilyUnits,
  getGenerations,
} from '../utils/treeLayout'
import PersonCard from './PersonCard'

type FamilyTreeProps = {
  family: FamilyTreeType
}

function FamilyTree({ family }: FamilyTreeProps) {
  const generations = getGenerations(family)

  const getChildrenForUnit = (personIds: string[]) => {
    const childIds = new Set(
      family.relationships
        .filter(
          (relationship) =>
            relationship.type === 'parent' &&
            personIds.includes(relationship.personAId)
        )
        .map((relationship) => relationship.personBId)
    )

    return family.people.filter((person) => childIds.has(person.id))
  }

  return (
    <section className="family-tree">
      <h2>{family.title}</h2>

      <div className="tree-canvas">
        {generations.map((generation) => (
          <div className="generation" key={generation.level}>
            <span className="generation-label">
              Generation {generation.level}
            </span>

            <div className="generation-people">
              {getFamilyUnits(family, generation.people).map(
                (unit, index) => {
                  const personIds = unit.people.map(
                    (person) => person.id
                  )

                  const children = getChildrenForUnit(personIds)

                  return (
                    <div className="family-branch" key={index}>
                      <div className="family-unit">
                        {unit.people.map((person, personIndex) => (
                          <div
                            className="partner-wrapper"
                            key={person.id}
                          >
                            <PersonCard person={person} />

                            {personIndex <
                              unit.people.length - 1 && (
                              <div className="partner-line" />
                            )}
                          </div>
                        ))}
                      </div>

                      {children.length > 0 && (
                        <div className="child-connector">
                          <div className="vertical-line" />
                        </div>
                      )}
                    </div>
                  )
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FamilyTree