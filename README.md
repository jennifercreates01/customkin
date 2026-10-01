# CustomKin

**Your family, beautifully connected. Crafted to treasure.**

CustomKin is a customizable family tree builder designed to help families create beautiful, meaningful, and print-ready family keepsakes.

Unlike traditional genealogy tools that focus primarily on records and ancestry research, CustomKin focuses on the visual experience of building and designing a family tree that can become a finished piece worth displaying.

> > **Project Status:** Deployed MVP — actively developed

## Live Demo

[View CustomKin Live](https://customkin.vercel.app/)

CustomKin is currently deployed as a working MVP. Development is continuing with additional design, account, persistence, export, and purchasing features planned.

---

## Overview

CustomKin allows users to build a visual family tree by adding and connecting family members through relationships such as parents, partners, and siblings.

The application combines structured family data with an interactive tree interface and customizable design system. Users can move between dedicated Tree, Design, and Preview modes while building and styling their family tree.

CustomKin is being developed as a full product rather than a single-page demonstration. The current deployed MVP establishes the core family-tree architecture and user experience, while future development will add accounts, cloud persistence, expanded customization, print-ready exports, and purchasing functionality.

CustomKin is being developed as a full product rather than a single-page demonstration, with separate tree-building, design, and preview experiences planned as the application grows.

---

## Current Features

- Interactive family tree builder
- Add parent, partner, and sibling relationships
- Edit and delete family members
- Multi-generation family structures
- Automatic family graph layout
- Partner and union relationship handling
- Parent-to-child connection generation
- Custom person nodes
- Custom family connection paths
- Theme-based node styling
- Tree, Design, and Preview modes
- LocalStorage persistence
- Sample family reset functionality
- Responsive React interface
- Public branded landing page
- Application navigation
- Reusable TypeScript components and data structures
- Production deployment through Vercel

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- CSS
- React Router

### Deployment

- Vercel

### Visualization

- React Flow (`@xyflow/react`)

### Development

- Git
- GitHub
- VS Code
- ESLint

---

## Family Tree Architecture

One of the central challenges in CustomKin is translating family relationships into a visual graph that remains understandable as the tree grows.

The application uses custom layout utilities to organize family members into generations and family units.

Current layout logic includes:

- `getGenerations`
- `getFamilyUnits`
- `getUnions`
- `layoutFamilyGraph`
- `buildFamilyConnections`

Custom node and edge types are used to represent people, unions, and family relationships while maintaining control over how the tree is rendered.

This architecture allows the visual tree to be generated from structured family data rather than manually positioning every person.

---

## Design System

CustomKin includes a theme system that separates family data from presentation.

Themes can control visual properties such as:

- Card backgrounds
- Card borders
- Text colors
- Accent colors
- Overall visual style

This creates the foundation for allowing users to personalize the appearance of their family tree without changing the underlying family structure.

---

## Challenges & Solutions

### Representing Complex Family Relationships

Family trees are not simple hierarchical structures. Partners, siblings, multiple generations, and shared parent-child relationships require more than basic parent-to-child connections.

CustomKin uses union points and custom connection logic to represent these relationships while keeping the visual structure readable.

### Automatic Tree Layout

Manually positioning family members would not scale as users add relatives.

Custom layout utilities calculate generations, family units, unions, and node positions so the tree can reorganize itself as the family structure changes.

### Separating Structure From Design

Family relationships and visual styling need to remain independent.

CustomKin separates family data from its theme system so users can eventually redesign their tree without rebuilding their family relationships.

---

## What I'm Learning

Building CustomKin has required working beyond standard page-based React interfaces and thinking about application architecture, graph relationships, and dynamic visualization.

The project has strengthened my experience with:

- Modeling interconnected data
- React component architecture
- TypeScript data structures
- Graph-based UI development
- Custom node and edge rendering
- Dynamic layout algorithms
- Reusable design systems
- Managing increasingly complex application state
- Designing software around real user workflows

---

## Roadmap

CustomKin has reached its first deployed MVP and remains under active development.

Planned development includes:

- Continue refining the family tree builder
- Expand support for increasingly complex family structures
- Expand theme and design customization
- Add font and card-style controls
- Continue improving responsive behavior
- Add user authentication
- Build an account dashboard
- Add cloud-saved family trees
- Expand the Preview experience
- Create print-ready PNG/PDF/SVG export options
- Add checkout and purchasing functionality
- Optimize production assets and performance

---

## Project Philosophy

Families come in many different forms.

CustomKin is being designed around the idea that a family tree should be flexible enough to represent those relationships while still producing something personal, beautiful, and meaningful.

The goal is not simply to visualize family data.

The goal is to turn those connections into something worth keeping.

---

## Author

Built and designed by **Jennifer**.

Portfolio: https://jennifercreates.dev  
GitHub: https://github.com/jennifercreates01
