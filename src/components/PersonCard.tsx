import type { Person } from '../types/family'

type PersonCardProps = {
  person: Person
}

function PersonCard({ person }: PersonCardProps) {
  return (
    <article>
      <h2>
        {person.firstName} {person.lastName}
      </h2>
    </article>
  )
}

export default PersonCard