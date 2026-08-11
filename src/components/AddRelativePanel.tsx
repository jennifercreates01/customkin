import { useState } from 'react'
import type {
  BuilderRelationshipType,
  Person,
} from '../types/family'

type AddRelativePanelProps = {
  selectedPerson: Person | null
  onAddRelative: (relative: {
    firstName: string
    lastName: string
    relationshipType: BuilderRelationshipType
  }) => void
  onClose: () => void
}

function AddRelativePanel({
  selectedPerson,
  onAddRelative,
  onClose,
}: AddRelativePanelProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [relationshipType, setRelationshipType] =
    useState<BuilderRelationshipType>('parent')

  if (!selectedPerson) {
    return null
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!firstName.trim()) {
      return
    }

    onAddRelative({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      relationshipType,
    })

    setFirstName('')
    setLastName('')
    setRelationshipType('parent')
  }

  return (
    <aside className="add-relative-panel">
      <div className="add-relative-header">
        <div>
          <p className="add-relative-eyebrow">
            Add a relative to
          </p>

          <h2>
            {selectedPerson.firstName}{' '}
            {selectedPerson.lastName}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="panel-close-button"
          aria-label="Close add relative panel"
        >
          ×
        </button>
      </div>

      <form
        className="add-relative-form"
        onSubmit={handleSubmit}
      >
        <label>
          Relationship
          <select
            value={relationshipType}
            onChange={(event) =>
              setRelationshipType(
                event.target.value as BuilderRelationshipType
              )
            }
          >
         <option value="parent">Parent</option>
<option value="partner">Partner</option>
<option value="child">Child</option>
<option value="sibling">Sibling</option>
          </select>
        </label>

        <label>
          First name
          <input
            type="text"
            value={firstName}
            onChange={(event) =>
              setFirstName(event.target.value)
            }
            placeholder="First name"
            required
          />
        </label>

        <label>
          Last name
          <input
            type="text"
            value={lastName}
            onChange={(event) =>
              setLastName(event.target.value)
            }
            placeholder="Last name"
          />
        </label>

        <button type="submit">
          Add Relative
        </button>
      </form>
    </aside>
  )
}

export default AddRelativePanel