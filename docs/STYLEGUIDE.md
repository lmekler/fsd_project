# Community Event Management Platform Style Guide

## Colour Scheme

The colour scheme for the application:

- #FF6666 (Vibrant Coral) will be the primary colour
- #FFFBF1 (Floral White) for the background colour
- #D3D3D3 (Dust Grey) as the accent colour

## Font Styles

The font styles used:

- Lato (Bold) will be used for main page headings
- Roboto (Regular) will be used for regular body text and paragraphs
- Open Sans (Regular) will be used for profile settings and chats

## Expanded Styleguide (version 1.0.0)

The following styles below was generated from the starting styles above
by GPT-5.6 Luna for the purposes of implementing early Tailwind CSS components. 
It can be solidified in future sprints. (Patrick)

### Brand Colours

Main brand colours used for important interactive elements

- Primary: #FF6666
  - Usage: Primary buttons, links, active navigation, important actions
- Primary Hover: #E85555
  - Usage: Hover state for primary elements
- Primary Light: #FFE5E5
  - Usage: Subtle backgrounds, selected states, highlights
- Background: #FFFBF1
  - Usage: Main application/page background
- Accent: #D3D3D3
  - Usage: Secondary UI elements, borders, dividers

### Neutral Colours

- Background: #FFFBF1
- Surface (Cards, panels, forms): #FFFFFF
- Border: #E5E5E5
- Accent: #D3D3D3
- Text: #222222
- Text Muted (Secondary/supporting text): #6B6B6B
- Text Inverse (on dark/primary backgrounds): #FFFFFF

### Feedback Colours

Colours for communicating application states rather than branding.

- Success: #2E7D32
- Warning: #ED6C02
- Error: #D32F2F
- Info: #1976D2

### Typography

Weight is in parenthesis.

- Main headings: Lato (700)
- General body context: Roboto (400)
- Emphasized body context: Roboto (500)
- Strong/emphasized context: Roboto (700)
- Profile settings and chat: Open Sans (400)
- Emphasized profile/chat content: Open Sans (500)

### Type Scale

#### Page Heading - H1

font: Lato
weight: 700
size: 36px
line-height: 1.2

Tailwind: `text-4x1 font-heading font-bold`

#### Section Heading - H2

font: Lato
weight: 700
size: 30px
line-height: 1.25

Tailwind: `text-3x1 font-heading font-bold`

#### Section Heading - H3

font: Lato
weight: 700
size: 24px
line-height: 1.3

Tailwind: `text-2x1 font-heading font-bold`

#### Small Heading - H4

font: Lato
weight: 700
size: 20px
line-height: 1.4

Tailwind: `text-xl font-heading font-bold`

#### Body

font: Roboto
weight: 400
size: 16px
line-height: 1.5

Tailwind: `text-base font-body`

#### Small Text

font: Roboto
weight: 400
size: 14px
line-height: 1.5

Tailwind: `text-sm font-body`

#### Caption

font: Roboto
weight: 400
size: 12px
line-height: 1.4

Tailwind: `text-xs font-body`

### Typography Guidelines

Use Lato for headings.
Use Roboto for general application content.
Use Open Sans for profile settings and chat interfaces.
Avoid introducing additional font families.
Avoid arbitrary font sizes unless there is a specific design requirement.
Maintain readable line heights for paragraphs.
Use font weight to establish hierarchy rather than excessive font-size variation.
