export type ThemeId =
  | 'modern'
  | 'floral'
  | 'farmhouse'
  | 'elegant'

export type CustomKinTheme = {
  id: ThemeId
  name: string
  description: string

  canvasBackground: string
  cardBackground: string
  cardBorder: string
  textColor: string
  accentColor: string
  lineColor: string
}