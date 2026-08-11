import type { Person } from '../types/family'

type PersonCardProps = {
  person: Person
}

function PersonCard({ person }: PersonCardProps) {
  return (
    <article className="person-card">
      <div className="person-avatar">
        {person.firstName.charAt(0)}
      </div>

      <h3>
        {person.firstName} {person.lastName}
      </h3>
    </article>
  )
}

export default PersonCard