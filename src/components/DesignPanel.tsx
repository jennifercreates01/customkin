import type { ThemeId } from '../types/theme'
import { themes } from '../data/themes'

type DesignPanelProps = {
  selectedTheme: ThemeId
  onSelectTheme: (themeId: ThemeId) => void
}

function DesignPanel({
  selectedTheme,
  onSelectTheme,
}: DesignPanelProps) {
  return (
    <div className="design-panel">
      <div className="design-panel-header">
        <p className="person-panel-eyebrow">
          Design
        </p>

        <h2>Choose a theme</h2>

        <p>
          Change the look of your family tree without changing
          any family information.
        </p>
      </div>

      <div className="theme-options">
        {themes.map((theme) => {
          const isSelected =
            selectedTheme === theme.id

          return (
            <button
              key={theme.id}
              type="button"
              className={`theme-option ${
                isSelected ? 'selected' : ''
              }`}
              onClick={() =>
                onSelectTheme(theme.id)
              }
            >
              <div
                className="theme-preview"
                style={{
                  background: theme.canvasBackground,
                  borderColor: theme.cardBorder,
                }}
              >
                <div
                  className="theme-preview-card"
                  style={{
                    background: theme.cardBackground,
                    borderColor: theme.cardBorder,
                    color: theme.textColor,
                  }}
                >
                  <span
                    className="theme-preview-dot"
                    style={{
                      background: theme.accentColor,
                    }}
                  />

                  <span>Family</span>
                </div>

                <div
                  className="theme-preview-line"
                  style={{
                    background: theme.lineColor,
                  }}
                />
              </div>

              <div className="theme-option-copy">
                <strong>{theme.name}</strong>
                <span>{theme.description}</span>
              </div>

              {isSelected && (
                <span className="theme-selected-mark">
                  ✓
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DesignPanel