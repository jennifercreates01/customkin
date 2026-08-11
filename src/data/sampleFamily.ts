import type { FamilyTree } from '../types/family'

export const sampleFamily: FamilyTree = {
  id: 'family-1',
  title: 'Sample Family',
  theme: 'modern',

  people: [
    {
      id: 'person-1',
      firstName: 'James',
      lastName: 'Carter',
    },
    {
      id: 'person-2',
      firstName: 'Elizabeth',
      lastName: 'Carter',
    },
    {
      id: 'person-3',
      firstName: 'Michael',
      lastName: 'Carter',
    },
    {
      id: 'person-4',
      firstName: 'Sarah',
      lastName: 'Carter',
    },
    {
      id: 'person-5',
      firstName: 'Emma',
      lastName: 'Carter',
    },
    {
      id: 'person-6',
      firstName: 'Noah',
      lastName: 'Carter',
    },
    {
      id: 'person-7',
      firstName: 'Robert',
      lastName: 'Carter',
    },
    {
      id: 'person-8',
      firstName: 'Margaret',
      lastName: 'Carter',
    },
    {
      id: 'person-9',
      firstName: 'Daniel',
      lastName: 'Carter',
    },
    {
      id: 'person-10',
      firstName: 'Olivia',
      lastName: 'Carter',
    },
  ],

  relationships: [
    {
      id: 'relationship-1',
      personAId: 'person-1',
      personBId: 'person-2',
      type: 'partner',
    },
    {
      id: 'relationship-2',
      personAId: 'person-1',
      personBId: 'person-3',
      type: 'parent',
    },
    {
      id: 'relationship-3',
      personAId: 'person-2',
      personBId: 'person-3',
      type: 'parent',
    },
    {
      id: 'relationship-4',
      personAId: 'person-3',
      personBId: 'person-4',
      type: 'partner',
    },
    {
      id: 'relationship-5',
      personAId: 'person-3',
      personBId: 'person-5',
      type: 'parent',
    },
    {
      id: 'relationship-6',
      personAId: 'person-4',
      personBId: 'person-5',
      type: 'parent',
    },
    {
      id: 'relationship-7',
      personAId: 'person-3',
      personBId: 'person-6',
      type: 'parent',
    },
    {
      id: 'relationship-8',
      personAId: 'person-4',
      personBId: 'person-6',
      type: 'parent',
    },
    {
      id: 'relationship-9',
      personAId: 'person-7',
      personBId: 'person-8',
      type: 'partner',
    },
    {
      id: 'relationship-10',
      personAId: 'person-7',
      personBId: 'person-1',
      type: 'parent',
    },
    {
      id: 'relationship-11',
      personAId: 'person-8',
      personBId: 'person-1',
      type: 'parent',
    },
    {
      id: 'relationship-12',
      personAId: 'person-9',
      personBId: 'person-10',
      type: 'partner',
    },
    {
      id: 'relationship-13',
      personAId: 'person-9',
      personBId: 'person-4',
      type: 'parent',
    },
    {
      id: 'relationship-14',
      personAId: 'person-10',
      personBId: 'person-4',
      type: 'parent',
    },
  ],
}