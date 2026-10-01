import { useEffect, useState } from 'react'
import AddRelativePanel from '../components/AddRelativePanel'
import EditPersonPanel from '../components/EditPersonPanel'
import PersonPanel from '../components/PersonPanel'
import TreeCanvas from '../components/TreeCanvas'
import DesignPanel from '../components/DesignPanel'
import PreviewCanvas from '../components/PreviewCanvas'

import { sampleFamily } from '../data/sampleFamily'

import type { ThemeId } from '../types/theme'
import type { BuilderMode } from '../types/builder'
import type {
  BuilderRelationshipType,
  FamilyTree as FamilyTreeType,
  Person,
  Relationship,
} from '../types/family'

function BuilderPage() {
  const [family, setFamily] = useState<FamilyTreeType>(() => {
    const savedFamily = localStorage.getItem('customkin-family')
   
    if (savedFamily) {
      try {
        return JSON.parse(savedFamily) as FamilyTreeType
      } catch {
        localStorage.removeItem('customkin-family')
      }
    }

    return sampleFamily
  })

  const [builderMode, setBuilderMode] =
    useState<BuilderMode>('tree')

  const [selectedPerson, setSelectedPerson] =
    useState<Person | null>(null)

  const [isAddingRelative, setIsAddingRelative] =
    useState(false)

  const [isEditingPerson, setIsEditingPerson] =
    useState(false)
     const handleSelectTheme = (themeId: ThemeId) => {
    setFamily((currentFamily) => ({
      ...currentFamily,
      theme: themeId,
    }))
  }
 

  useEffect(() => {
    localStorage.setItem(
      'customkin-family',
      JSON.stringify(family)
    )
  }, [family])

  const handleSelectPerson = (person: Person) => {
    setSelectedPerson(person)
    setIsAddingRelative(false)
    setIsEditingPerson(false)
    setBuilderMode('tree')
  }

  const handleAddRelative = (relative: {
    firstName: string
    lastName: string
    relationshipType: BuilderRelationshipType
  }) => {
    if (!selectedPerson) {
      return
    }

    const newPersonId = `person-${crypto.randomUUID()}`

    const newPerson: Person = {
      id: newPersonId,
      firstName: relative.firstName,
      lastName: relative.lastName || undefined,
    }

    setFamily((currentFamily) => {
      const newRelationships: Relationship[] = []

      if (relative.relationshipType === 'parent') {
        newRelationships.push({
          id: `relationship-${crypto.randomUUID()}`,
          personAId: newPersonId,
          personBId: selectedPerson.id,
          type: 'parent',
        })
      }

      if (relative.relationshipType === 'child') {
        newRelationships.push({
          id: `relationship-${crypto.randomUUID()}`,
          personAId: selectedPerson.id,
          personBId: newPersonId,
          type: 'parent',
        })
      }

      if (relative.relationshipType === 'partner') {
        newRelationships.push({
          id: `relationship-${crypto.randomUUID()}`,
          personAId: selectedPerson.id,
          personBId: newPersonId,
          type: 'partner',
        })
      }

      if (relative.relationshipType === 'sibling') {
        const selectedPersonParents =
          currentFamily.relationships.filter(
            (relationship) =>
              relationship.type === 'parent' &&
              relationship.personBId === selectedPerson.id
          )

        selectedPersonParents.forEach((parentRelationship) => {
          newRelationships.push({
            id: `relationship-${crypto.randomUUID()}`,
            personAId: parentRelationship.personAId,
            personBId: newPersonId,
            type: 'parent',
          })
        })
      }

      return {
        ...currentFamily,
        people: [...currentFamily.people, newPerson],
        relationships: [
          ...currentFamily.relationships,
          ...newRelationships,
        ],
      }
    })

    setIsAddingRelative(false)
  }

  const handleSavePerson = (updatedPerson: Person) => {
    setFamily((currentFamily) => ({
      ...currentFamily,
      people: currentFamily.people.map((person) =>
        person.id === updatedPerson.id
          ? updatedPerson
          : person
      ),
    }))

    setSelectedPerson(updatedPerson)
    setIsEditingPerson(false)
  }

  const handleDeletePerson = () => {
    if (!selectedPerson) {
      return
    }

    const shouldDelete = window.confirm(
      `Delete ${selectedPerson.firstName} ${
        selectedPerson.lastName ?? ''
      } from this family tree?`
    )

    if (!shouldDelete) {
      return
    }

    setFamily((currentFamily) => ({
      ...currentFamily,

      people: currentFamily.people.filter(
        (person) => person.id !== selectedPerson.id
      ),

      relationships: currentFamily.relationships.filter(
        (relationship) =>
          relationship.personAId !== selectedPerson.id &&
          relationship.personBId !== selectedPerson.id
      ),
    }))

    setSelectedPerson(null)
    setIsAddingRelative(false)
    setIsEditingPerson(false)
  }

  const handleResetFamily = () => {
    const shouldReset = window.confirm(
      'Reset the family tree back to the sample family?'
    )

    if (!shouldReset) {
      return
    }

    localStorage.removeItem('customkin-family')

    setFamily(sampleFamily)
    setSelectedPerson(null)
    setIsAddingRelative(false)
    setIsEditingPerson(false)
    setBuilderMode('tree')
  }

  const handleClosePanels = () => {
    setSelectedPerson(null)
    setIsAddingRelative(false)
    setIsEditingPerson(false)
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <h1>
            CustomKin<span className="brand-dot">.</span>
          </h1>
          <p>Build your family. Make it yours.</p>
        </div>

        <button
          type="button"
          onClick={handleResetFamily}
        >
          Reset Sample Family
        </button>
      </header>

      <nav
        className="builder-mode-nav"
        aria-label="Builder modes"
      >
        <button
          type="button"
          className={
            builderMode === 'tree' ? 'active' : ''
          }
          onClick={() => setBuilderMode('tree')}
        >
          Tree
        </button>

        <button
          type="button"
          className={
            builderMode === 'design' ? 'active' : ''
          }
          onClick={() => setBuilderMode('design')}
        >
          Design
        </button>

        <button
          type="button"
          className={
            builderMode === 'preview' ? 'active' : ''
          }
          onClick={() => setBuilderMode('preview')}
        >
          Preview
        </button>
      </nav>

      <section className="builder-workspace">
       <div className="builder-canvas">
  {builderMode === 'preview' ? (
    <PreviewCanvas
      family={family}
      themeId={family.theme as ThemeId}
    />
  ) : (
    <TreeCanvas
      family={family}
      onSelectPerson={handleSelectPerson}
      themeId={family.theme as ThemeId}
    />
  )}
</div>

        <aside className="builder-sidebar">
          {builderMode === 'tree' && (
            <>
              {!selectedPerson && (
                <div className="sidebar-empty-state">
                  <h2>Select a family member</h2>
                  <p>
                    Choose someone on the tree to edit them
                    or add a relative.
                  </p>
                </div>
              )}

              {selectedPerson &&
                !isAddingRelative &&
                !isEditingPerson && (
                  <PersonPanel
                    person={selectedPerson}
                    onAddRelative={() =>
                      setIsAddingRelative(true)
                    }
                    onEditPerson={() =>
                      setIsEditingPerson(true)
                    }
                    onDeletePerson={handleDeletePerson}
                    onClose={handleClosePanels}
                  />
                )}

              {selectedPerson && isAddingRelative && (
                <AddRelativePanel
                  selectedPerson={selectedPerson}
                  onAddRelative={handleAddRelative}
                  onClose={() =>
                    setIsAddingRelative(false)
                  }
                />
              )}

              {selectedPerson && isEditingPerson && (
                <EditPersonPanel
                  person={selectedPerson}
                  onSave={handleSavePerson}
                  onClose={() =>
                    setIsEditingPerson(false)
                  }
                />
              )}
            </>
          )}

         {builderMode === 'design' && (
  <DesignPanel
    selectedTheme={family.theme as ThemeId}
    onSelectTheme={handleSelectTheme}
  />
)}

          {builderMode === 'preview' && (
  <div className="sidebar-empty-state">
    <h2>Preview your design</h2>
    <p>
      Your finished family tree is shown in the
      preview area.
    </p>
  </div>
)}
        </aside>
      </section>

      <footer className="app-footer">
        CustomKin — built by <span>Jennifer.</span>
      </footer>
    </main>
  )
}

export default BuilderPage
