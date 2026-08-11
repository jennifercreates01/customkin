import type { Node } from '@xyflow/react'
import type { FamilyTree } from '../types/family'
import { getGenerations } from './treeLayout'
import { getUnions } from './familyUnits'

const NODE_WIDTH = 180
const NODE_HEIGHT = 120
const PARTNER_GAP = 40
const ROOT_UNIT_GAP = 180
const GENERATION_GAP = 230

export function layoutFamilyGraph(family: FamilyTree): Node[] {
  const generations = getGenerations(family)
  const unions = getUnions(family)

  const generationByPersonId = new Map<string, number>()

  generations.forEach((generation) => {
    generation.people.forEach((person) => {
      generationByPersonId.set(person.id, generation.level)
    })
  })

  const positions = new Map<
    string,
    {
      x: number
      y: number
    }
  >()

  const getPartnerUnion = (personId: string) => {
    return unions.find((union) =>
      union.partners.some((partner) => partner.id === personId)
    )
  }

  const getParentUnion = (personId: string) => {
    return unions.find((union) =>
      union.children.some((child) => child.id === personId)
    )
  }

  const getRootUnions = () => {
    return unions.filter((union) => {
      return union.partners.every(
        (partner) => getParentUnion(partner.id) === undefined
      )
    })
  }

  const placeCouple = (
    leftPersonId: string,
    rightPersonId: string,
    centerX: number,
    generation: number
  ) => {
    const coupleWidth =
      NODE_WIDTH * 2 + PARTNER_GAP

    const leftX =
      centerX - coupleWidth / 2

    positions.set(leftPersonId, {
      x: leftX,
      y: generation * GENERATION_GAP,
    })

    positions.set(rightPersonId, {
      x: leftX + NODE_WIDTH + PARTNER_GAP,
      y: generation * GENERATION_GAP,
    })
  }

  const placeSingle = (
    personId: string,
    centerX: number,
    generation: number
  ) => {
    positions.set(personId, {
      x: centerX - NODE_WIDTH / 2,
      y: generation * GENERATION_GAP,
    })
  }

  const placeDescendants = (
    unionId: string,
    centerX: number
  ) => {
    const union = unions.find(
      (candidate) => candidate.id === unionId
    )

    if (!union) {
      return
    }

    const children = union.children

    if (children.length === 0) {
      return
    }

    const childSpacing = 320

    const totalChildrenWidth =
      (children.length - 1) * childSpacing

    children.forEach((child, index) => {
      const generation =
        generationByPersonId.get(child.id) ?? 0

      const childCenterX =
        centerX -
        totalChildrenWidth / 2 +
        index * childSpacing

      const partnerUnion =
        getPartnerUnion(child.id)

      if (
        partnerUnion &&
        partnerUnion.partners.length === 2
      ) {
        const partner = partnerUnion.partners.find(
          (candidate) => candidate.id !== child.id
        )

        if (partner) {
          placeCouple(
            child.id,
            partner.id,
            childCenterX,
            generation
          )

          placeDescendants(
            partnerUnion.id,
            childCenterX
          )

          return
        }
      }

      placeSingle(
        child.id,
        childCenterX,
        generation
      )
    })
  }

  const rootUnions = getRootUnions()

  const rootWidth = 520

  rootUnions.forEach((union, index) => {
    if (union.partners.length !== 2) {
      return
    }

    const [partnerA, partnerB] =
      union.partners

    const centerX =
      index * (rootWidth + ROOT_UNIT_GAP)

    const generation =
      generationByPersonId.get(partnerA.id) ?? 0

    placeCouple(
      partnerA.id,
      partnerB.id,
      centerX,
      generation
    )

    placeDescendants(
      union.id,
      centerX
    )
  })

  family.people.forEach((person) => {
    if (positions.has(person.id)) {
      return
    }

    const generation =
      generationByPersonId.get(person.id) ?? 0

    const fallbackX =
      positions.size * (NODE_WIDTH + 60)

    positions.set(person.id, {
      x: fallbackX,
      y: generation * GENERATION_GAP,
    })
  })

  return family.people.map((person) => {
    const position =
      positions.get(person.id) ?? {
        x: 0,
        y: 0,
      }

    return {
      id: person.id,
      type: 'person',

      position,

      width: NODE_WIDTH,
      height: NODE_HEIGHT,

      data: {
        label: `${person.firstName} ${
          person.lastName ?? ''
        }`.trim(),

        firstName: person.firstName,
      },
    }
  })
}