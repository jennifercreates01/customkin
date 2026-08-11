import type { Node } from '@xyflow/react'
import type { FamilyTree } from '../types/family'
import { getFamilyUnits, getGenerations } from './treeLayout'

const NODE_WIDTH = 180
const PARTNER_GAP = 40
const UNIT_GAP = 120
const GENERATION_GAP = 230

export function layoutFamilyGraph(family: FamilyTree): Node[] {
  const generations = getGenerations(family)

  const nodes: Node[] = []

  generations.forEach((generation) => {
    const units = getFamilyUnits(family, generation.people)

    const unitWidths = units.map((unit) => {
      if (unit.people.length === 2) {
        return NODE_WIDTH * 2 + PARTNER_GAP
      }

      return NODE_WIDTH
    })

    const totalWidth =
      unitWidths.reduce((sum, width) => sum + width, 0) +
      UNIT_GAP * Math.max(units.length - 1, 0)

    let currentX = -totalWidth / 2

    units.forEach((unit, unitIndex) => {
      unit.people.forEach((person, personIndex) => {
        const x =
          currentX +
          personIndex * (NODE_WIDTH + PARTNER_GAP)

        nodes.push({
          id: person.id,
          type: 'person',

          position: {
            x,
            y: generation.level * GENERATION_GAP,
          },

          data: {
            label: `${person.firstName} ${
              person.lastName ?? ''
            }`.trim(),

            firstName: person.firstName,
          },
        })
      })

      currentX += unitWidths[unitIndex] + UNIT_GAP
    })
  })

  return nodes
}