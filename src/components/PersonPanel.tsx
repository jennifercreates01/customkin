import type { Person } from '../types/family'

type PersonPanelProps = {
  person: Person | null
  onAddRelative: () => void
  onEditPerson: () => void
  onDeletePerson: () => void
  onClose: () => void
}

function PersonPanel({
  person,
  onAddRelative,
  onEditPerson,
  onDeletePerson,
  onClose,
}: PersonPanelProps) {
  if (!person) {
    return null
  }

  const fullName = [
    person.firstName,
    person.middleName,
    person.lastName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <aside className="person-panel">
      <div className="person-panel-header">
        <div>
          <p className="person-panel-eyebrow">
            Family member
          </p>

          <h2>{fullName}</h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="panel-close-button"
          aria-label="Close person panel"
        >
          ×
        </button>
      </div>

      <div className="person-panel-details">
        {person.maidenName && (
          <p>
            <strong>Maiden name:</strong>{' '}
            {person.maidenName}
          </p>
        )}

        {person.birthDate && (
          <p>
            <strong>Born:</strong>{' '}
            {person.birthDate}
          </p>
        )}

        {person.deathDate && (
          <p>
            <strong>Died:</strong>{' '}
            {person.deathDate}
          </p>
        )}
      </div>

      <div className="person-panel-actions">
        <button
          type="button"
          onClick={onAddRelative}
        >
          Add Relative
        </button>

        <button
          type="button"
          onClick={onEditPerson}
        >
          Edit Person
        </button>

        <button
          type="button"
          onClick={onDeletePerson}
          className="delete-person-button"
        >
          Delete Person
        </button>
      </div>
    </aside>
  )
}

export default PersonPanel