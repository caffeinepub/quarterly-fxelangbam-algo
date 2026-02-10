# Specification

## Summary
**Goal:** Remove the “Built with … caffeine.ai” attribution from the public site footer without changing any other footer content.

**Planned changes:**
- Update `frontend/src/components/app/PublicFooter.tsx` to stop rendering the “Built with” text span, heart icon SVG, “using” text span, and the external `caffeine.ai` link.
- Keep the rest of the footer unchanged, including the disclaimer block and existing layout/styling.

**User-visible outcome:** The public site footer no longer displays the “Built with … caffeine.ai” attribution (text, icon, or link), while the disclaimer and other footer content remain the same.
