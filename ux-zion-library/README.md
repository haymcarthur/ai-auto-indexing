# UX Zion Library

Custom UX component library built for user testing and design workflows. This library provides a comprehensive set of React components designed for rapid prototyping and user testing.

## Overview

The UX Zion Library contains 45+ custom React components with live showcases, built to support designers and developers in creating consistent, accessible user interfaces for testing and production.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd ux-zion-library

# Install dependencies
npm install
```

### Running the Development Server

```bash
npm run dev
```

This will start the Vite development server and open the component showcase in your browser.

## Available Components

The library includes a wide variety of components organized in `/src/components`:

### Form Components
- Button, IconButton, BillboardButton
- TextField, TextArea, Select
- Checkbox, Radio, Toggle, Slider
- Chips (Action, Choice, Input, Filter, Billboard)

### Layout & Structure
- Header, Breadcrumb
- Card, ImageCard
- DataTable, ListItem
- Row, DataBlock
- Divider

### Overlays & Dialogs
- DialogOverlay
- FullPageOverlay
- MenuOverlay
- TooltipOverlay
- QuickGlanceOverlay
- StatusOverlay

### Media & Images
- ImageViewer
- ImageGrid
- RibbonViewer
- AdjustImage
- ZoomControl
- CustomControl
- PageControl

### Typography & Content
- HeadingBlock, Subheading
- Paragraph
- InfoSheet

### Navigation
- TabGroup, Tab

### Feedback
- Alert
- Avatar

## Component Showcases

Each component has a dedicated showcase file in `/src/showcases` that demonstrates:
- Component variants
- Different states and configurations
- Usage examples
- Interactive demos

## Project Structure

```
ux-zion-library/
├── src/
│   ├── components/       # All component implementations
│   ├── showcases/        # Component demonstration pages
│   ├── assets/          # Images and static assets
│   ├── icons/           # Icon resources
│   ├── pages/           # Application pages
│   └── tokens/          # Design tokens
├── coalesced-locales/   # Internationalization files
├── scripts/             # Build and utility scripts
└── package.json
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

## Dependencies

The library is built with:
- React 18
- Vite (build tool)
- FamilySearch Zion components (@fs/zion-ui, @fs/zion-icon, @fs/zion-image-viewer)
- i18next (internationalization)

## Contributing

This library is designed for internal user testing and design workflows. When adding new components:

1. Create the component in `/src/components`
2. Add a showcase in `/src/showcases`
3. Document component props and usage
4. Test across different states and variants

## License

Private - Internal use only
