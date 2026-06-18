# StudentOS Design System

This document outlines the core principles and specifications for the StudentOS design language. The design is heavily inspired by minimalist interfaces like Linear, Vercel, and Notion.

## Philosophy
- **Accessibility First**: Semantic HTML and sufficient contrast.
- **Simplicity**: No glassmorphism, no heavy shadows, no unnecessary borders.
- **Maintainability**: Utilize a strict subset of Tailwind CSS utility classes.
- **Neutrality**: Rely on neutral grays (slate scale) to make content stand out.

## Typography
We use default system sans-serif fonts to ensure maximum performance and native feel across devices.
- **H1 (Page Header)**: `text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50`
- **H2 (Section Header)**: `text-lg font-medium tracking-tight text-slate-900 dark:text-slate-50`
- **Body**: `text-sm text-slate-700 dark:text-slate-300`
- **Muted**: `text-sm text-slate-500 dark:text-slate-400`

## Spacing & Sizing
Consistent spacing creates rhythm and reduces visual clutter.
- **Page Layout Padding**: `p-4` (mobile) to `md:p-8` (desktop)
- **Container Max-Width**: `max-w-5xl` for most content pages.
- **Component Gap**: `gap-4` or `gap-6` between standard elements.
- **Micro-spacing**: `gap-2` for tight elements (like icon + text).

## Borders & Radius
- **Border Radius**: `rounded-lg` for standard cards/buttons. `rounded-full` for badges/avatars.
- **Borders**: 1px solid borders using `border-slate-200 dark:border-slate-800`.
- **Shadows**: `shadow-sm` for standard cards. No heavy drop shadows.

## Colors
We strictly use the Tailwind `slate` palette for neutrality. Theme switching is disabled for Phase 0.
- **Background (App)**: `bg-slate-50 dark:bg-slate-950`
- **Background (Card/Surface)**: `bg-white dark:bg-slate-900`
- **Borders**: `border-slate-200 dark:border-slate-800`
- **Primary Action**: `bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900`

## Animation Rules
Framer Motion is used *exclusively* for micro-interactions to provide immediate tactile feedback.
- **Buttons/Interactive Elements**: `<motion.button whileTap={{ scale: 0.98 }}>`
- **No Page Transitions**: Page transitions introduce unnecessary delay and complexity.
- **No Entrance Animations**: Content should appear immediately.
