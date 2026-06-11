---
name: redesign-scent-personality-test
description: Upgrades the "AI Scent Personality Test" web app to a premium, minimal, Vietnamese folk-inspired digital experience for the event "CHI CHI CHÀNH CHÀNH 2026: LỤA VÀ TRÀ". Emphasizes tea, silk, memory, and soft curation while stripping away generic SaaS/AI patterns.
---

# Redesign Skill: Cultural & Scent Identity Experience

## How This Works

When applied to the "AI Scent Personality Test" project, follow this sequence:

1. **Scan** — Read the existing Stitch/HTML/CSS codebase. Identify the mobile-first styling method, typography layout, and structure.
2. **Diagnose** — Run through the audit below. Flag any cold, futuristic, overly dark, complex, or generic AI quiz patterns.
3. **Fix** — Apply targeted upgrades working with the existing setup. Transform the app from a sterile tech dashboard or childish game into a soft, poetic, screenshot-ready cultural keepsake.

## Design Audit

### Typography & Cultural Hierarchy

Check for these problems and fix them:

- **Using Inter, Roboto, or system fonts for everything.** Replace display titles, hero text, and scent identity names with **`1FTV VIP Chic Avenue Regular`** for an elegant, premium look. Pair with **`DFVN Les Palmiers Regular`** for subtitles, poetic accent text, and small cultural labels.
- **Unreadable form text or quiz options.** While display headings use expressive brand fonts, ensure that *form labels, inputs, quiz questions, answer options, and final result paragraphs* use clean, highly legible system sans-serif text with a generous `line-height: 1.6` and subtle `letter-spacing: 0.02em` for flawless readability on mobile screens at the booth.
- **Headlines lack intentional weight and presence.** Tighten letter-spacing slightly for large headings using `1FTV VIP Chic Avenue Regular` to create a bold, artistic impression.
- **Orphaned words in Vietnamese.** Vietnamese text often breaks awkwardly. Use `text-wrap: balance` or `text-wrap: pretty` on quiz questions and description paragraphs to keep sentences visually balanced.

### Color, Textures, and Surfaces (Tea & Silk Palette)

- **Pure `#000000` or aggressive, heavy dark backgrounds.** Avoid an overwhelming, neon, or dark cinematic landing page. Instead, establish a calm, earthy base using `Deep Olive Green (#243126)` or `Moss Green (#3A4A39)` mixed with plenty of breathable space.
- **Sterile flat cards or white backgrounds.** Shift to warm, inviting tones for surfaces, containers, and cards. Use `Silk Cream (#F5EEDC)` or `Warm Sand (#E8DFC8)` with `Dark Brown Text (#2E291F)` to simulate premium handcrafted silk-paper.
- **The purple/blue "Futuristic AI Gradient" or flashy gold.** This is the ultimate AI cliche. Eliminate it. Use a single, subtle accent like `Muted Gold (#B89B63)` or `Soft Tea Beige (#DCC9A3)` exclusively for active borders, progress tracking, and key highlights.
- **Flat, lifeless vector graphics.** Infuse the interface with quiet depth. Use a fixed, `pointer-events-none` background containing a very subtle grain or tea-stained texture, paired with soft, organic, blurred shapes mimicking drifting tea steam or flowing silk.

### Layout & Structural Elegance

- **Traditional header navbar with logos, menus, or login loops.** This is a local booth experience with no authentication. **Remove all standard navbars, profile icons, and menus.** Replace the entire top area with a compact, horizontally auto-scrolling logo slider carousel that loops infinitely and elegantly with monochrome ivory or muted gold branding assets.
- **Event title treated as raw, typed text.** Never render `"CHI CHI CHÀNH CHÀNH 2026"` as normal text. It must be implemented as an image logo/brand mark asset (`<EventLogoImage />`). It can be large and prominent on the landing screen, and compact on subsequent screens.
- **Three-column feature sections or rigid grid cards.** This app is strictly mobile-first. Maximize vertical breathing room, use ample whitespace, and center compositions elegantly. 
- **Quiz layout looking like a corporate evaluation or childish trivia game.** Design the quiz screen to feel like a personal conversation with a calm AI scent curator. Use a clean, vertical stack of soft cream answer cards with wide touch targets (`min-height: 48px`), separated by a thin, minimal, folk-inspired divider line.

### Interactivity, States, and Motion

- **Instant, harsh state changes or aggressive, bouncy game animations.** The motion language must be soft, slow, premium, and fluid. Use subtle transitions (300-400ms) for all interactive states.
- **No feedback on answer selection.** When a user selects a quiz option, apply a soft scale-up (`scale(1.02)`) and fade the border into a warm `Muted Gold`. Smoothly slide the next question in after a 400ms delay to keep the journey continuous but calm.
- **Technical or futuristic loading animations.** On the parsing/analyzing screen, avoid spinning technical gear icons, cyber charts, or massive loading text blocks. Use a single, elegant loading indicator: a slowly breathing circle, three soft dots, or a gentle steam-like rising line that gives users a brief moment of quiet pause.
- **Cluttered result screens.** The final result must be highly screenshot-friendly, acting like a beautiful, minimal digital keepsake card. Keep the layout clean, hiding score numbers or backend logic. Render only the essentials: the event logo, the personalized "Scent Identity" name, a short 2-4 line personality description, a clear formula list (e.g., "3 drops of [Tea 1], 2 drops of [Silk Sương]"), and a brief scent note summary.

### Code Quality & Semantic Structure

- **Div soup without semantic meaning.** Maintain clean, accessible HTML structure using `<main>` for screens, `<section>` for the quiz/form fields, and appropriate text tags (`<h1>`, `<p>`, `<label>`).
- **Hardcoded full-screen viewport bugs.** Avoid using rigid `height: 100vh` for layout frames, which breaks on mobile browsers like iOS Safari. Always use `min-height: 100dvh` for full-screen layout wrapper definitions.
- **Missing optical alignment.** Adjust text positions inside buttons or labels by 1-2px manually so they look visually balanced to the eye, rather than depending purely on cold flex/grid math.

## Upgrade Priority for "LỤA VÀ TRÀ"

Apply design modifications in this exact order to secure maximum visual poetry with zero functional breakage:

1. **Font & Typography Realignment** — Hook up `Chic Avenue` and `Les Palmiers` while protecting body text readability.
2. **Color Palette & Texture Overlay** — Clean up all background variables to support the Silk Cream, Moss Green, and Muted Gold system. Add the micro-grain/steam texture layer.
3. **Header Elimination** — Replace traditional nav menus with the infinite `AutoScrollingLogoCarousel`.
4. **Transform Title into Branding Asset** — Ensure the event title uses the unified `<EventLogoImage />` structure.
5. **Form & Quiz Component Polish** — Style large, accessible input containers, soft cream cards, and smooth question transitions.
6. **Keepsake Optimization** — Reorganize the result screen into a beautiful, clean card template optimized for mobile screenshots.
7. **Refine Motion Fluidity** — Infuse slow, staggered fade-ins and natural entry physics across all elements.
