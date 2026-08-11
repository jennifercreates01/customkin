import { useEffect, useState } from 'react'
import type { Person } from '../types/family'

type EditPersonPanelProps = {
  person: Person | null
  onSave: (updatedPerson: Person) => void
  onClose: () => void
}

function EditPersonPanel({
  person,
  onSave,
  onClose,
}: EditPersonPanelProps) {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [maidenName, setMaidenName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [deathDate, setDeathDate] = useState('')

  useEffect(() => {
    if (!person) {
      return
    }

    setFirstName(person.firstName)
    setMiddleName(person.middleName ?? '')
    setLastName(person.lastName ?? '')
    setMaidenName(person.maidenName ?? '')
    setBirthDate(person.birthDate ?? '')
    setDeathDate(person.deathDate ?? '')
  }, [person])

  if (!person) {
    return null
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!firstName.trim()) {
      return
    }

    onSave({
      ...person,
      firstName: firstName.trim(),
      middleName: middleName.trim() || undefined,
      lastName: lastName.trim() || undefined,
      maidenName: maidenName.trim() || undefined,
      birthDate: birthDate || undefined,
      deathDate: deathDate || undefined,
    })
  }

  return (
    <aside className="edit-person-panel">
      <div className="person-panel-header">
        <div>
          <p className="person-panel-eyebrow">
            Edit family member
          </p>

          <h2>
            {person.firstName} {person.lastName}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="panel-close-button"
          aria-label="Close edit person panel"
        >
          ×
        </button>
      </div>

      <form
        className="edit-person-form"
        onSubmit={handleSubmit}
      >
        <label>
          First name
          <input
            type="text"
            value={firstName}
            onChange={(event) =>
              setFirstName(event.target.value)
            }
            required
          />
        </label>

        <label>
          Middle name
          <input
            type="text"
            value={middleName}
            onChange={(event) =>
              setMiddleName(event.target.value)
            }
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
          />
        </label>

        <label>
          Maiden name
          <input
            type="text"
            value={maidenName}
            onChange={(event) =>
              setMaidenName(event.target.value)
            }
          />
        </label>

        <label>
          Birth date
          <input
            type="date"
            value={birthDate}
            onChange={(event) =>
              setBirthDate(event.target.value)
            }
          />
        </label>

        <label>
          Death date
          <input
            type="date"
            value={deathDate}
            onChange={(event) =>
              setDeathDate(event.target.value)
            }
          />
        </label>

        <button type="submit">
          Save Changes
        </button>
      </form>
    </aside>
  )
}

export default EditPersonPanel