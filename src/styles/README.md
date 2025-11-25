# CSS Architecture

This project uses a modular CSS architecture for better maintainability and organization.

## File Structure

```
extimer/
├── style.css                    # Main entry point (imports all modules)
└── src/
    └── styles/
        ├── variables.css        # Theme variables and color tokens
        ├── base.css            # Base styles, resets, and typography
        ├── layout.css          # Layout components (sidebar, header, content)
        ├── components.css      # Reusable UI components (buttons, cards, forms)
        ├── animations.css      # Keyframes and animation utilities
        └── responsive.css      # Media queries and responsive styles
```

## Module Descriptions

### 1. `variables.css`
- CSS custom properties (variables)
- Light and dark theme configurations
- Color tokens
- Spacing and sizing constants

**Edit this when**: Changing colors, themes, or global design tokens

### 2. `base.css`
- CSS resets
- Base HTML element styles
- Typography defaults
- App container setup

**Edit this when**: Changing fonts, base typography, or global resets

### 3. `layout.css`
- Main layout structure
- Sidebar, header, content area
- Overlay components
- Z-index management

**Edit this when**: Modifying the app's main layout structure

### 4. `components.css`
- Buttons (primary, outline)
- Cards
- Form inputs and labels
- Profile icon
- Mobile menu toggle

**Edit this when**: Adding new components or modifying existing UI elements

### 5. `animations.css`
- Keyframe animations
- Transition utilities
- Animation classes

**Edit this when**: Adding new animations or transitions

### 6. `responsive.css`
- All media queries
- Mobile styles (< 768px)
- Tablet styles (769px - 1024px)
- Small mobile (< 480px)

**Edit this when**: Adjusting responsive behavior or breakpoints

## Benefits of This Structure

1. **Easy to Navigate**: Find styles quickly by category
2. **Better Collaboration**: Multiple developers can work on different files
3. **Easier Maintenance**: Changes are isolated to specific files
4. **Clear Separation**: Each file has a single responsibility
5. **Faster Debugging**: Know exactly where to look for specific styles
6. **Scalable**: Easy to add new modules as the project grows

## How to Edit

1. **To change colors/theme**: Edit `variables.css`
2. **To modify a button**: Edit `components.css`
3. **To adjust mobile layout**: Edit `responsive.css`
4. **To add new animation**: Edit `animations.css`

## Import Order

The order of imports in `style.css` matters:

1. Variables first (used by all other files)
2. Base styles (foundation)
3. Layout (structure)
4. Components (UI elements)
5. Animations (enhancements)
6. Responsive (overrides)

## Deployment

Vite automatically bundles all CSS files into a single optimized file during build, so there's no performance penalty for using multiple files during development.
