import { useState } from 'react'
import { Providers } from '@fs/zion-ui'
import { ButtonShowcase } from '../showcases/ButtonShowcase'
import { IconButtonShowcase } from '../showcases/IconButtonShowcase'
import { FullPageOverlayShowcase } from '../showcases/FullPageOverlayShowcase'
import { DialogOverlayShowcase } from '../showcases/DialogOverlayShowcase'
import { QuickGlanceOverlayShowcase } from '../showcases/QuickGlanceOverlayShowcase'
import { MenuOverlayShowcase } from '../showcases/MenuOverlayShowcase'
import { InfoSheetShowcase } from '../showcases/InfoSheetShowcase'
import { TypographyShowcase } from '../showcases/TypographyShowcase'
import { BlocksShowcase } from '../showcases/BlocksShowcase'
import { ListItemShowcase } from '../showcases/ListItemShowcase'
import { BreadcrumbShowcase } from '../showcases/BreadcrumbShowcase'
import { ContentCardShowcase } from '../showcases/ContentCardShowcase'
import { ComboCardShowcase } from '../showcases/ComboCardShowcase'
import { ImageCardShowcase } from '../showcases/ImageCardShowcase'
import { IconShowcase } from '../showcases/IconShowcase'
import { ColorShowcase } from '../showcases/ColorShowcase'
import { SpacingShowcase } from '../showcases/SpacingShowcase'
import { ElevationShowcase } from '../showcases/ElevationShowcase'
import { TextFieldShowcase } from '../showcases/TextFieldShowcase'
import { TextAreaShowcase } from '../showcases/TextAreaShowcase'
import { SelectShowcase } from '../showcases/SelectShowcase'
import { AvatarShowcase } from '../showcases/AvatarShowcase'
import { ChipsShowcase } from '../showcases/ChipsShowcase'
import { CheckboxShowcase } from '../showcases/CheckboxShowcase'
import { RadioShowcase } from '../showcases/RadioShowcase'
import { ToggleShowcase } from '../showcases/ToggleShowcase'
import { ZoomPanControlsShowcase } from '../showcases/ZoomPanControlsShowcase'
import { TabShowcase } from '../showcases/TabShowcase'
import { AlertShowcase } from '../showcases/AlertShowcase'
import { StatusOverlayShowcase } from '../showcases/StatusOverlayShowcase'
import { TooltipOverlayShowcase } from '../showcases/TooltipOverlayShowcase'
import { RibbonViewerShowcase } from '../showcases/RibbonViewerShowcase'
import { ImageViewerShowcase } from '../showcases/ImageViewerShowcase'
import { ImageGridShowcase } from '../showcases/ImageGridShowcase'
import { SliderShowcase } from '../showcases/SliderShowcase'
import { DividerShowcase } from '../showcases/DividerShowcase'
import { AdjustImageShowcase } from '../showcases/AdjustImageShowcase'
import { DataTableShowcase } from '../showcases/DataTableShowcase'

/**
 * Component Showcase
 *
 * A Storybook-like interface for viewing and testing custom components
 */
export const ComponentShowcase = () => {
  const [selectedComponent, setSelectedComponent] = useState('Button')

  // Component sections for sidebar navigation
  const sections = [
    {
      title: 'Design Variables',
      components: [
        { id: 'Colors', name: 'Colors', component: ColorShowcase },
        { id: 'Spacing', name: 'Spacing', component: SpacingShowcase },
        { id: 'Elevation', name: 'Elevation', component: ElevationShowcase },
        { id: 'Typography', name: 'Typography', component: TypographyShowcase }
      ]
    },
    {
      title: 'Controls',
      components: [
        { id: 'Button', name: 'Button', component: ButtonShowcase },
        { id: 'IconButton', name: 'IconButton', component: IconButtonShowcase },
        { id: 'Chips', name: 'Chips', component: ChipsShowcase },
        { id: 'Checkbox', name: 'Checkbox', component: CheckboxShowcase },
        { id: 'Radio', name: 'Radio', component: RadioShowcase },
        { id: 'Toggle', name: 'Toggle', component: ToggleShowcase },
        { id: 'ZoomPanControls', name: 'Zoom/Pan Controls', component: ZoomPanControlsShowcase }
      ]
    },
    {
      title: 'Cards',
      components: [
        { id: 'ContentCard', name: 'Content Card', component: ContentCardShowcase },
        { id: 'ComboCard', name: 'Combo Card', component: ComboCardShowcase },
        { id: 'ImageCard', name: 'Image Card', component: ImageCardShowcase }
      ]
    },
    {
      title: 'Content',
      components: [
        { id: 'Blocks', name: 'Blocks', component: BlocksShowcase },
        { id: 'ListItem', name: 'ListItem', component: ListItemShowcase },
        { id: 'Divider', name: 'Divider', component: DividerShowcase },
        { id: 'DataTable', name: 'Data Table', component: DataTableShowcase }
      ]
    },
    {
      title: 'Visuals',
      components: [
        { id: 'Icons', name: 'Icons', component: IconShowcase },
        { id: 'Avatar', name: 'Avatar', component: AvatarShowcase },
        { id: 'RibbonViewer', name: 'Ribbon Viewer', component: RibbonViewerShowcase },
        { id: 'ImageViewer', name: 'Image Viewer', component: ImageViewerShowcase },
        { id: 'ImageGrid', name: 'Image Grid', component: ImageGridShowcase }
      ]
    },
    {
      title: 'Inputs',
      components: [
        { id: 'TextField', name: 'TextField', component: TextFieldShowcase },
        { id: 'TextArea', name: 'TextArea', component: TextAreaShowcase },
        { id: 'Select', name: 'Select', component: SelectShowcase },
        { id: 'Slider', name: 'Slider', component: SliderShowcase }
      ]
    },
    {
      title: 'Nav and Menu',
      components: [
        { id: 'Breadcrumb', name: 'Breadcrumb', component: BreadcrumbShowcase },
        { id: 'MenuOverlay', name: 'MenuOverlay', component: MenuOverlayShowcase },
        { id: 'Tab', name: 'Tab', component: TabShowcase }
      ]
    },
    {
      title: 'Overlays',
      components: [
        { id: 'Alert', name: 'Alert', component: AlertShowcase },
        { id: 'DialogOverlay', name: 'DialogOverlay', component: DialogOverlayShowcase },
        { id: 'FullPageOverlay', name: 'FullPageOverlay', component: FullPageOverlayShowcase },
        { id: 'InfoSheet', name: 'InfoSheet', component: InfoSheetShowcase },
        { id: 'QuickGlanceOverlay', name: 'QuickGlanceOverlay', component: QuickGlanceOverlayShowcase },
        { id: 'StatusOverlay', name: 'StatusOverlay', component: StatusOverlayShowcase },
        { id: 'TooltipOverlay', name: 'TooltipOverlay', component: TooltipOverlayShowcase }
      ]
    },
    {
      title: 'Composite Components',
      components: [
        { id: 'AdjustImage', name: 'Adjust Image', component: AdjustImageShowcase }
      ]
    }
  ]

  // Find selected component across all sections
  const findComponent = (id) => {
    for (const section of sections) {
      const found = section.components.find(c => c.id === id)
      if (found) return found
    }
    return null
  }

  const selected = findComponent(selectedComponent)
  const ShowcaseComponent = selected?.component

  return (
    <Providers>
      <div style={{
        display: 'flex',
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        {/* Sidebar */}
        <aside style={{
          width: '250px',
          backgroundColor: '#f9fafb',
          borderRight: '1px solid #e5e7eb',
          overflowY: 'auto',
          flexShrink: 0
        }}>
          <div style={{
            padding: '24px 16px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: 700,
              color: '#111827'
            }}>
              Component Library
            </h1>
            <p style={{
              margin: '4px 0 0 0',
              fontSize: '13px',
              color: '#6b7280'
            }}>
              Zion-like Components
            </p>
          </div>

          <nav style={{ padding: '16px 0' }}>
            {sections.map((section, sectionIndex) => (
              <div key={section.title} style={{ marginBottom: sectionIndex < sections.length - 1 ? '24px' : 0 }}>
                <div style={{
                  padding: '0 16px 8px 16px',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: '#6b7280'
                }}>
                  {section.title}
                </div>
                {section.components.map(component => (
                  <button
                    key={component.id}
                    onClick={() => setSelectedComponent(component.id)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      textAlign: 'left',
                      background: selectedComponent === component.id ? '#e0f2fe' : 'transparent',
                      border: 'none',
                      borderLeft: selectedComponent === component.id ? '3px solid #0969da' : '3px solid transparent',
                      color: selectedComponent === component.id ? '#0969da' : '#374151',
                      fontSize: '14px',
                      fontWeight: selectedComponent === component.id ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedComponent !== component.id) {
                        e.currentTarget.style.backgroundColor = '#f3f4f6'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedComponent !== component.id) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    {component.name}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#ffffff'
        }}>
          {ShowcaseComponent && <ShowcaseComponent />}
        </main>
      </div>
    </Providers>
  )
}
