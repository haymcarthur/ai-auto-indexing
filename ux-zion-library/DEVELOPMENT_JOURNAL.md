# Zion UI Component Library - Development Journal

## Overview

This journal documents the collaborative process of building a comprehensive component library based on the Zion design system. This library was created specifically for designers to use with AI tools (like Claude) to build working prototypes for user testing.

**Why This Library Exists:**
The official Zion UI library has too many dependencies to build anything locally with it. We needed a lightweight, standalone version that designers could use with AI to create functional prototypes that look exactly like real Zion UI - without needing to know code or worry about styling details.

**Target Users:**
Designers who want to create working prototypes by talking to AI the same way they'd talk to developers: "Create an overlay with this text and a button" or "Add an image viewer here." The AI will use the correct Zion components automatically.

---

## Development Process

### Phase 1: Foundation - Design Tokens

**What We Built:**
- Color tokens (base colors, transparent colors, button-specific colors)
- Typography tokens (body, bold, display, paragraph, uppercase)
- Spacing tokens (consistent spacing scale)
- Elevation tokens (shadow definitions)

**Key Learning:**
Starting with design tokens was crucial. Rather than hardcoding values in components, we established a single source of truth that matches the actual Zion design system. This ensures everything looks correct by default.

### Phase 2: Core Components

**What We Built:**
- Button (with variants: high, medium, low emphasis)
- IconButton
- TextField, TextArea, Select
- Checkbox, Radio, Toggle
- Chips, Avatar
- Card variants (Content Card, Combo Card, Image Card)

**Iteration Example - Button Component:**
The button component went through several iterations to match Zion UI exactly:
1. Initial version with basic variants
2. Added inline prop for buttons in tight spaces (matches Zion's inline buttons)
3. Added moreLess prop for compact buttons
4. Implemented proper forwardRef for anchoring overlays (needed for QuickGlanceOverlay positioning)
5. Adjusted letter spacing to 0 at the design token level to match Zion's button text

Each adjustment was to align with how the actual Zion UI components work.

### Phase 3: Layout & Navigation

**What We Built:**
- Blocks (Heading Block, Data Block, List Item)
- Breadcrumb navigation
- Tab component
- Divider (with optional labels)

**Key Iteration - Divider Component:**
The Divider component needed adjustment to match Zion UI exactly. Initial version showed labels centered within the divider line, but Zion's pattern has labels appear *below* the divider with 6px spacing. This was corrected to match the design system.

### Phase 4: Overlays & Complex Interactions

**What We Built:**
- FullPageOverlay
- DialogOverlay
- QuickGlanceOverlay (with positioning system)
- MenuOverlay
- InfoSheet
- StatusOverlay
- TooltipOverlay
- Alert

**Key Learning:**
Overlay positioning was the most complex challenge. We built a flexible positioning system for QuickGlanceOverlay that:
- Anchors to any element using refs
- Supports multiple positions (top, bottom, left, right, bottom-right)
- Keeps overlays within viewport bounds
- Handles resize and scroll events

This matches how Zion's overlay system works in production.

**Critical Discovery:**
We needed to implement `React.forwardRef` on any component that might be used as an anchor (like CustomControl). This technical requirement ensures overlays position correctly relative to trigger buttons.

### Phase 5: Image Viewers & Media

**What We Built:**
- RibbonViewer (horizontal thumbnail strip)
- ImageGrid (responsive grid with zoom controls)
- ImageViewer (comprehensive viewer with zoom, pan, navigation)
- ZoomControl, PageControl, CustomControl
- Slider component

**Key Iterations to Match Zion UI:**

1. **Grid Scrolling:** Zion UI has scrolling without visible scrollbars. Implemented with CSS.

2. **Zoom Controls in Grid Mode:** The zoom controls work differently in grid view (adjusting columns) vs. single image view (adjusting scale), matching Zion's pattern.

3. **Active Item Borders:** Started with 2px border, increased to 7px to match Zion's visual weight. Changed from 'cover' to 'contain' for thumbnails so full images are visible, matching Zion's image handling.

### Phase 6: Composite Components

**What We Built:**
- AdjustImage (overlay for image adjustments)
- DataTable (flexible table with component support)

**Multiple Iterations - AdjustImage Component:**

This component went through the most iterations to align with Zion UI:

**Iteration 1:** Fixed overlay positioning
- Adjusted anchorRef implementation to match Zion's overlay system

**Iteration 2:** Button integration
- Integrated proper Button component with iconStart prop (Zion's pattern for buttons with icons)

**Iteration 3:** Button styling
- Removed inline style overrides that conflicted with Button component styles
- Used wrapper divs for layout instead, matching how Zion composes components

**Iteration 4:** Letter spacing
- Updated the uppercase typography token at the source to have 0 letter spacing, matching Zion's button text style

**Iteration 5:** Divider labels
- Restructured Divider component to show label below with 6px spacing, matching Zion's divider pattern

**Learning:**
When matching a design system, it's better to adjust layout containers or update design tokens rather than forcing styles on individual component instances.

---

## Setting Up the Component Library

### Step 1: Clone the Repository

Your team lead will provide you with the GitHub repository URL. To get started:

```bash
# Open Terminal (Mac) or Command Prompt (Windows)
# Navigate to where you want to store the project
cd ~/Documents

# Clone the repository (replace with actual repo URL)
git clone https://github.com/YOUR_ORG/zion-ui-components.git

# Navigate into the project folder
cd zion-ui-components
```

### Step 2: Install Dependencies

You only need to do this once after cloning:

```bash
npm install
```

This downloads all the necessary files to run the component library locally.

### Step 3: Start the Development Server

Every time you want to work on a prototype:

```bash
npm run dev
```

This starts a local server. You'll see a message like:
```
Local: http://localhost:5173
```

Open that URL in your browser to see the component showcase.

### Step 4: Open Project in Your AI Tool

When working with AI (like Claude Code or GitHub Copilot):

1. Open the entire `zion-ui-components` folder in your code editor
2. Start your AI conversation
3. The AI will have access to all the component code and can use the exact Zion components

---

## Working with AI: Best Practices

### Understanding the Setup

When you open this project in your AI tool, it can see:
- All component definitions in `src/components/`
- All design tokens in `src/tokens/`
- Example showcases in `src/showcases/`

This means you can describe what you want in plain language, and the AI will use the actual Zion components.

### Effective Prompting Strategies

#### ✅ DO: Reference Components by Name

```
"Create a DialogOverlay with a heading that says 'Confirm Action'
and two buttons: a high emphasis blue button that says 'Confirm'
and a low emphasis gray button that says 'Cancel'"
```

The AI knows what DialogOverlay is, what button emphasis levels exist, and will use the exact Zion components.

#### ✅ DO: Describe Layout Using Zion Patterns

```
"Create a Card with a Heading Block, followed by a Data Block showing
the user's name, and a Button at the bottom"
```

#### ✅ DO: Trust the Components

```
"Add an ImageViewer with these three images"
```

You don't need to specify how zoom controls should look or work - the ImageViewer component already matches Zion UI exactly.

#### ❌ DON'T: Ask AI to Create Custom Styled Components

```
"Create a button with a blue background and white text"
```

This might cause the AI to create a custom button instead of using the Button component.

Instead say:
```
"Add a high emphasis blue Button"
```

#### ❌ DON'T: Specify Design Details That Are Already in the Components

```
"Create a dialog with a gray background, rounded corners,
elevation shadow, and..."
```

Instead say:
```
"Create a DialogOverlay"
```

The DialogOverlay already has all the correct Zion styling built in.

### Prompting Patterns That Work Well

#### Pattern 1: Component + Content

```
"Create a QuickGlanceOverlay that shows when clicking the settings button.
Include a Toggle for 'Enable notifications' and a Button that says 'Save'"
```

#### Pattern 2: Layout + Components

```
"Create a page with:
- A Breadcrumb at the top showing Home > Projects > Details
- A Card containing a Heading Block with the project name
- A DataTable showing the project members with columns for Name, Role, and Actions"
```

#### Pattern 3: Interactions

```
"When the user clicks the 'Add Image' button, open a DialogOverlay
with a TextField for the image URL and two buttons: Cancel and Add"
```

#### Pattern 4: Using Composite Components

```
"Add an AdjustImage overlay that opens when clicking the settings icon"
```

The AI knows this is a composite component with sliders for brightness/contrast, rotation buttons, etc.

### Tips for Better Results

**1. Use Component Names from the Showcase**

Browse the component showcase at http://localhost:5173 to see all available components. Use those exact names in your prompts:
- Button (not "button" or "click button")
- DialogOverlay (not "modal" or "popup")
- TextField (not "input" or "text box")

**2. Specify Variants When They Exist**

Many components have variants:
- Button: `high`, `medium`, or `low` emphasis + `blue`, `gray`, or `danger` variant
- Card: `elevated`, `outlined`, or `flat` variant
- IconButton: `sm`, `md`, or `lg` size

Example:
```
"Add a medium emphasis blue Button"
```

**3. Let the AI Handle State Management**

You can describe behavior without worrying about the code:
```
"Create a Toggle that when enabled, shows additional options below it"
```

The AI will handle the useState and conditional rendering.

**4. Reference the Showcase for Complex Examples**

If you're unsure how to describe something:
1. Look at the showcase for that component
2. See the interactive example
3. Describe what you see

Example: "Create an ImageViewer like the one in the showcase, but with these 5 images instead"

**5. Start Simple, Then Iterate**

Build your prototype in steps:

```
First prompt: "Create a Card with a heading and a button"
Second prompt: "Add a TextField above the button for entering an email"
Third prompt: "When the button is clicked, show an Alert confirming the email was saved"
```

This is clearer than one massive prompt with everything at once.

### Common Scenarios

#### Creating a Form

```
"Create a Card containing:
- A Heading Block that says 'User Registration'
- A TextField for email
- A TextField for password (type password)
- A Checkbox for 'I agree to terms'
- A high emphasis blue Button that says 'Register'"
```

#### Creating a Data Display

```
"Create a DataTable with columns for Project Name, Status, and Actions.
Add 3 rows of sample data.
For the Status column, use Chips (green for Active, yellow for Pending).
For the Actions column, add a low emphasis blue Button that says 'View'"
```

#### Creating an Image Gallery

```
"Create an ImageViewer with 8 sample images.
It should have the thumbnail ribbon at the bottom and zoom controls"
```

#### Creating a Multi-Step Flow

```
"Create a tab interface with 3 tabs: Details, Images, and Review.
The Details tab should have a Heading Block and some TextFields.
The Images tab should have an ImageGrid.
The Review tab should show a summary with a Button to submit"
```

---

## Understanding Component Relationships

### Overlays and Their Triggers

Overlays need a trigger element:

```
"Create a Button that when clicked, opens a QuickGlanceOverlay"
```

The AI will:
1. Create a Button with a ref
2. Set up state for isOpen
3. Connect the Button to the overlay with the ref
4. Handle opening/closing

### Composite Components

Some components are built from other components:

- **AdjustImage**: Uses QuickGlanceOverlay + Slider + Toggle + Button
- **ImageViewer**: Uses RibbonViewer + ImageGrid + ZoomControl + CustomControl
- **InfoSheet**: Uses FullPageOverlay + Blocks + Buttons

When you ask for these, you get the whole package:

```
"Add an AdjustImage overlay"
```

Gets you all the adjustment controls automatically.

### Cards and Content

Cards are containers. You typically put other components inside:

```
"Create a Card with a ListItem, a Divider, and another ListItem"
```

---

## Troubleshooting

### Issue: AI Creates Custom Components Instead of Using Library

**Solution:** Be more specific about component names. Say "Add a Button component" not "Add a button"

### Issue: Styling Doesn't Look Like Zion

**Solution:** You probably asked AI to customize styles. Let it use the components as-is:
- ❌ "Make the button bigger and change the color"
- ✅ "Use a high emphasis button instead of low emphasis"

### Issue: Components Not Showing Correctly

**Solution:** Make sure dev server is running (`npm run dev`) and refresh your browser

### Issue: Need to See How a Component Works

**Solution:** Check the showcase at http://localhost:5173 - every component has interactive examples

---

## Quick Reference: Available Components

### Controls
- Button, IconButton, Chips, Checkbox, Radio, Toggle, ZoomControl, PageControl, CustomControl

### Cards
- ContentCard, ComboCard, ImageCard

### Content
- Blocks (HeadingBlock, DataBlock, ListItem), Divider, DataTable

### Visuals
- Icons, Avatar, RibbonViewer, ImageViewer, ImageGrid

### Inputs
- TextField, TextArea, Select, Slider

### Navigation
- Breadcrumb, MenuOverlay, Tab

### Overlays
- Alert, DialogOverlay, FullPageOverlay, InfoSheet, QuickGlanceOverlay, StatusOverlay, TooltipOverlay

### Composite
- AdjustImage

---

## Example: Complete Prototype in One Prompt

Here's an example of creating a complete prototype feature:

```
"Create a user profile page with:

1. A Breadcrumb at the top: Home > Users > Profile

2. A Card containing:
   - A HeadingBlock with 'User Profile' as the heading and 'Manage your account details' as subheading
   - An Avatar (size lg)
   - A TextField for 'Full Name'
   - A TextField for 'Email' (type email)
   - A TextField for 'Phone Number'
   - A Toggle for 'Email notifications'
   - A Divider
   - Two buttons: a high emphasis blue Button 'Save Changes' and a low emphasis gray Button 'Cancel'

3. When Save Changes is clicked, show an Alert with type 'success' and message 'Profile updated successfully'"
```

The AI will create this entire interface using only the Zion components, and it will look exactly like real Zion UI.

---

## Keeping Your Local Copy Updated

When updates are made to the component library:

```bash
# Pull the latest changes
git pull origin main

# Install any new dependencies
npm install

# Restart your dev server
npm run dev
```

---

## Getting Help

### Check the Showcase First
Browse http://localhost:5173 to see all components with examples

### Ask Your AI Tool
Your AI can explain how components work:
```
"How does the ImageViewer component work?"
"What props does the Button component accept?"
"Show me an example of using QuickGlanceOverlay"
```

### Component Not Working as Expected?
Describe what you're trying to do and what's happening:
```
"I'm trying to create a dialog that opens when clicking a button,
but the dialog isn't appearing"
```

The AI can help debug by checking your setup.

---

## Key Takeaways

1. **You don't need to know code** - Describe what you want in plain language
2. **Use component names** - "Add a Button" not "add a button"
3. **Trust the components** - They already match Zion UI exactly
4. **Start simple** - Build prototypes iteratively
5. **Check the showcase** - It's your visual reference for all components
6. **Let the AI handle the details** - Focus on what you want, not how to build it

**Ready to build prototypes?** Start your dev server (`npm run dev`), open the showcase, and start describing your prototype to your AI tool!
