import type { Node } from '@xyflow/react'
import type { FamilyTree } from '../types/family'
import { getGenerations } from './treeLayout'
import { getUnions } from './familyUnits'

type LayoutOptions = {
  nodeWidth?: number
  nodeHeight?: number
  partnerGap?: number
  rootUnitGap?: number
  generationGap?: number
  childSpacing?: number
  rootWidth?: number
}

const DEFAULT_LAYOUT = {
  nodeWidth: 180,
  nodeHeight: 120,
  partnerGap: 40,
  rootUnitGap: 180,
  generationGap: 230,
  childSpacing: 320,
  rootWidth: 520,
}

export function layoutFamilyGraph(
  family: FamilyTree,
  options: LayoutOptions = {}
): Node[] {
  const layout = {
    ...DEFAULT_LAYOUT,
    ...options,
  }

  const generations = getGenerations(family)
  const unions = getUnions(family)

  const generationByPersonId = new Map<string, number>()

  generations.forEach((generation) => {
    generation.people.forEach((person) => {
      generationByPersonId.set(
        person.id,
        generation.level
      )
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
      union.partners.some(
        (partner) => partner.id === personId
      )
    )
  }

  const getParentUnion = (personId: string) => {
    return unions.find((union) =>
      union.children.some(
        (child) => child.id === personId
      )
    )
  }

  const getRootUnions = () => {
    return unions.filter((union) => {
      return union.partners.every(
        (partner) =>
          getParentUnion(partner.id) === undefined
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
      layout.nodeWidth * 2 + layout.partnerGap

    const leftX =
      centerX - coupleWidth / 2

    positions.set(leftPersonId, {
      x: leftX,
      y: generation * layout.generationGap,
    })

    positions.set(rightPersonId, {
      x:
        leftX +
        layout.nodeWidth +
        layout.partnerGap,
      y: generation * layout.generationGap,
    })
  }

  const placeSingle = (
    personId: string,
    centerX: number,
    generation: number
  ) => {
    positions.set(personId, {
      x: centerX - layout.nodeWidth / 2,
      y: generation * layout.generationGap,
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

    const totalChildrenWidth =
      (children.length - 1) *
      layout.childSpacing

    children.forEach((child, index) => {
      const generation =
        generationByPersonId.get(child.id) ?? 0

      const childCenterX =
        centerX -
        totalChildrenWidth / 2 +
        index * layout.childSpacing

      const partnerUnion =
        getPartnerUnion(child.id)

      if (
        partnerUnion &&
        partnerUnion.partners.length === 2
      ) {
        const partner =
          partnerUnion.partners.find(
            (candidate) =>
              candidate.id !== child.id
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

  rootUnions.forEach((union, index) => {
    if (union.partners.length !== 2) {
      return
    }

    const [partnerA, partnerB] =
      union.partners

    const centerX =
      index *
      (layout.rootWidth + layout.rootUnitGap)

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
      positions.size * (layout.nodeWidth + 60)

    positions.set(person.id, {
      x: fallbackX,
      y: generation * layout.generationGap,
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

      width: layout.nodeWidth,
      height: layout.nodeHeight,

      data: {
        label: `${person.firstName} ${
          person.lastName ?? ''
        }`.trim(),

        firstName: person.firstName,
      },
    }
  })
}