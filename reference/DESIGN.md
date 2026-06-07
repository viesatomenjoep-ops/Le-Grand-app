---
name: "Sauna Cloud Grand"
theme: "light"

colors:
  neutral:
    shade-0: "#FFFFFF"
    shade-1: "#F2F2F2"
    shade-2: "#D9D9D8"
    shade-3: "#B4B3B2"
    shade-4: "#82817F"
    shade-5: "#504F4C"
    shade-6: "#1E1D19"
    shade-7: "#050400"
    white: "#FFFFFF"
  salem:
    shade-1: "#E6F0ED"
    shade-2: "#CEE2DB"
    shade-3: "#549983"
    shade-4: "#0B6E4F"
    shade-5: "#08583F"
    shade-6: "#042C1F"
    shade-7: "#032117"
  pizazz:
    shade-1: "#FFF3E5"
    shade-2: "#FFE7CC"
    shade-3: "#FFAD4C"
    shade-4: "#FF8A00"
    shade-5: "#CC6E00"
    shade-6: "#663700"
    shade-7: "#4C2900"
  endeavour:
    shade-1: "#E5EEF7"
    shade-2: "#CCDDF0"
    shade-3: "#4C89CD"
    shade-4: "#0057B8"
    shade-5: "#004593"
    shade-6: "#002249"
    shade-7: "#001A37"
  claret:
    shade-1: "#F3E8EB"
    shade-2: "#E8D1D8"
    shade-3: "#AE6079"
    shade-4: "#8C1D40"
    shade-5: "#701733"
    shade-6: "#380B19"
    shade-7: "#2A0813"
  antique-bronze:
    shade-1: "#EFEDE6"
    shade-2: "#E0DCCD"
    shade-3: "#938551"
    shade-4: "#655107"
    shade-5: "#504005"
    shade-6: "#282002"
    shade-7: "#1E1802"

typography:
  heading:
    fontFamily: "Sora"
    fontWeight: 700
  body:
    fontFamily: "Inter"
    fontWeight: 400
  sizes:
    desktop:
      h1: 84px
      h2: 60px
      h3: 48px
      h4: 40px
      h5: 32px
      h6: 26px
      text-large: 26px
      text-medium: 20px
      text-regular: 18px
      text-small: 16px
      text-tiny: 12px
    mobile:
      h1: 48px
      h2: 44px
      h3: 32px
      h4: 24px
      h5: 20px
      h6: 18px
      text-large: 18px
      text-medium: 16px
      text-regular: 14px
      text-small: 12px
      text-tiny: 10px

ui:
  style: "elevate"
  buttonRadius: 100px
  tagRadius: 100px
  inputRadius: 12px

cards:
  style: "outlined"
  borderWidth: 1px
  dividerWidth: 1px
  radiusLarge: 8px
  radiusMedium: 8px
  radiusSmall: 8px

schemes:
  - name: "Scheme 1"
    background: "neutral-shade-0"
    backgroundHex: "#FFFFFF"
    foregroundHex: "#FFFFFF"
    textHex: "#050400"
    accentHex: "#0B6E4F"
    borderValue: "#05040026"
    useLogoVariant: light
    cssClass: "scheme-1"
  - name: "Scheme 2"
    background: "neutral-shade-1"
    backgroundHex: "#F2F2F2"
    foregroundHex: "#F2F2F2"
    textHex: "#050400"
    accentHex: "#0B6E4F"
    borderValue: "#05040026"
    useLogoVariant: light
    cssClass: "scheme-2"
  - name: "Scheme 3"
    background: "chromatic1-shade-1"
    backgroundHex: "#E6F0ED"
    foregroundHex: "#E6F0ED"
    textHex: "#050400"
    accentHex: "#0B6E4F"
    borderValue: "#05040026"
    useLogoVariant: light
    cssClass: "scheme-3"
---

# Sauna Cloud Grand — Design Specification

This file contains machine-readable design tokens in the YAML frontmatter above, and human-readable guidance below.

## Colors

The design uses a **light** theme with a neutral palette and 5 chromatic palettes.

- **Neutral shades** range from shade-0 (darkest) to shade-7 (lightest), plus white
- **Salem** — primary shade: `#0B6E4F`
- **Pizazz** — primary shade: `#FF8A00`
- **Endeavour** — primary shade: `#0057B8`
- **Claret** — primary shade: `#8C1D40`
- **Antique Bronze** — primary shade: `#655107`

Use the CSS custom properties from `react/globals.css` for all colors (e.g. `--color-neutral-darkest`, `--color-blue-ribbon`).

## Typography

Headings use **Sora** at weight 700. Body text uses **Inter** at weight 400.

The type scale has desktop and mobile sizes. Apply mobile sizes at smaller breakpoints. All values are in `react/globals.css`.

## UI Elements

UI style is **elevate** with button radius 100px. Cards use the **outlined** style with border-width 1px.

## Color Schemes

Sections use color schemes to control their visual appearance. Each scheme is derived from a single background color — all other colors (text, foreground, accent, border) are automatically computed for optimal contrast.

| Scheme | Background | Text | Accent | Logo | CSS class |
|--------|-----------|------|--------|------|-----------|
| Scheme 1 | Neutral White (#FFFFFF) | #050400 | #0B6E4F | light | `.scheme-1` |
| Scheme 2 | Neutral Lightest (#F2F2F2) | #050400 | #0B6E4F | light | `.scheme-2` |
| Scheme 3 | Salem Lightest (#E6F0ED) | #050400 | #0B6E4F | light | `.scheme-3` |

Apply a scheme by adding its CSS class to the section element. See `sitemap.md` for which scheme each section uses.

### Tweaking Schemes

To create visual variation, you can change which scheme a section uses. When switching schemes:

- Swap the CSS class (e.g. change `.scheme-1` to `.scheme-2`)
- All child elements automatically inherit the correct text, accent, and border colors
- Use the matching logo variant (`logo-light.svg` or `logo-dark.svg`) based on the scheme's `useLogoVariant`
- Alternate between light and dark schemes to create visual rhythm
