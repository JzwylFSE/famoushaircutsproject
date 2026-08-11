# MASTER DESIGN SYSTEM: UI/UX PRO MAX - LUXURY BARBERSHOP

## 1. Brand Identity & Vibe
**Industry:** High-End Grooming / Luxury Barbershop
**Vibe:** Sophisticated, timeless, masculine, and premium. The design must evoke the feeling of stepping into an exclusive gentleman's club—rich textures, sharp contrasts, and flawless precision.
**Keywords:** Precision, Luxury, Gold, Dark Navy, Minimalist, Glassmorphism.

## 2. Color Palette
- **Primary (Gold/Brass):** `#B8860B` (Rich, elegant, used for primary actions, accents, and highlights).
- **Secondary (Light Gold):** `#DFB15B` (Used for hover states and subtle gradients).
- **Background (Main):** `#FFFFFF` (Clean, crisp white for day mode or classic look). *Wait, the footer is dark navy! Let's leverage dark navy throughout or as a stark contrast.* 
- **Dark Accent / Text Main:** `#0B192C` (Deep Navy Blue - incredibly rich, much better than standard black. Used for primary text and footer backgrounds).
- **Surface (Cards/Sections):** `#FAFAFA` (Slightly off-white to distinguish from pure background).
- **Text Muted:** `#334155` (Slate gray for secondary text and descriptions).

## 3. Typography
- **Headings (Serif):** `Playfair Display` - Used for all `h1`-`h6` tags. Evokes classic luxury, editorial magazines, and tradition.
  - *Rule:* Headings should often have tight tracking (negative letter-spacing) for a modern editorial look, or wide tracking for small uppercase sub-headers.
- **Body (Sans-Serif):** `Inter` - Highly legible, clean, modern.
  - *Rule:* Keep body text light (`font-light` or `font-regular`) with generous line-height (`leading-relaxed`) to let the content breathe.

## 4. UI/UX Loopholes Detected (The "Sharpening")
The current codebase has good bones but lacks the "Pro Max" polish. Here are the loopholes to fix:

1. **Inconsistent Button Styling:** 
   - Buttons on the homepage lack a unified premium feel. Some are raw Tailwind, others use custom components.
   - *Fix:* Standardize all buttons to have sharp corners (`rounded-sm` or `rounded-none`), subtle gold borders, and smooth hover animations.
2. **Hero Section Contrast:** 
   - The hero image overlay on `page.js` is a basic gradient. 
   - *Fix:* Enhance the cinematic gradient, make the text typography sharper with better spacing, and use an elegant entrance animation for the hero buttons.
3. **Card Hover States (Services & Gallery):** 
   - The service cards on `page.js` and `services/page.js` are a bit standard.
   - *Fix:* Introduce a "Pro Max" hover state—slight upward translation, a soft gold glow (`shadow-primary/20`), and an image scale effect that feels expensive.
4. **Typography Hierarchy:** 
   - Some subheadings lack the "luxury editorial" feel. 
   - *Fix:* Convert small section headers to uppercase, wide-tracked (`tracking-[0.2em]`), gold or muted navy text.
5. **Section Transitions:** 
   - Hard lines between sections.
   - *Fix:* Add subtle dividers (e.g., a centered gold line) and ensure padding is extremely generous (`py-24` to `py-32`) to create a sense of space and exclusivity.

## 5. Animation Guidelines
- **Micro-interactions:** Buttons should scale down slightly on click (`whileTap={{ scale: 0.95 }}`) and have a smooth color transition.
- **Scroll Reveals:** Sections should fade and slide up gently when scrolling into view (`initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}`). Keep durations around `0.6s` to `0.8s` with an ease-out curve.

## 6. Execution Mandate
All Tailwind classes applied moving forward MUST adhere to this system. Avoid generic grays where possible; use the Slate/Navy palette for depth. Emphasize the Gold (`text-primary`, `bg-primary`) sparingly but impactfully.
