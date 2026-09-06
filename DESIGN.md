---
name: Franco Sanchez
description: Workshop-notebook portfolio for an AI and software engineer.
colors:
  paper: "#F3EEE4"
  ink: "#171412"
  mid: "#5C564E"
  violet: "#6D28D9"
  marker: "#E2C44D"
  clay-navy: "#1C2740"
  clay-blue: "#3D6FBF"
  clay-orange: "#D4743A"
  tape: "rgb(164 206 222 / 0.62)"
typography:
  display:
    fontFamily: "Silkscreen, General Sans, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 6.6vw, 5.6rem)"
    fontWeight: 400
    lineHeight: "1.05"
    letterSpacing: "0.02em"
  body:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.5"
    letterSpacing: "normal"
  meta:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "1.4"
    letterSpacing: "0.08em"
rounded:
  sm: "8px"
  md: "12px"
  pill: "999px"
spacing:
  sm: "8px"
  md: "16px"
  gutter: "clamp(1.25rem, 3vw, 3rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 1.35rem"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.35rem"
    height: "48px"
---

# Design

Recorded from the built world on 2026-09-06.

## Overview

A workshop notebook. Lined paper, a pixel name stamp, taped production screenshots, and clay folder tabs. Violet is the working accent. Marker yellow and clay tones are material. One light appearance. No dark mode. No red.

## Colors

Paper `#F3EEE4` is the sheet. Ink `#171412` is text and filled buttons. Mid `#5C564E` is secondary copy. Violet `#6D28D9` is the stamp, focus ring, and Sanchez. Marker `#E2C44D` is Home, sticky contact, and one project folder. Clay navy, blue, and orange color the remaining folders.

## Typography

Silkscreen stamps the name only. General Sans does everything else, four steps: display, head, sub, meta. Body caps at 62ch.

## Layout

1320px sheet. 900px breakpoint. Hero, Projects, About, Competencies, Experience, Education, Contact. Projects are five clay panels, not record rows. Competencies are wavy tags. Experience and education stay as rows on paper.

## Elevation & Depth

Polaroids and shots sit on paper with a short tinted shadow and a strip of tape. Panels use a deeper clay shadow. No glass. No neon glow.

## Shapes

Pills for nav, CTAs, and annotation. Folder panels 10px/22px. Fields 12px. Wavy clip on competency tags.

## Components

`.act` is the filled pill. `.act-ghost` is the outline. `.anno` is a fact chip. `.panel` is a project folder. `.polaroid` and `.shot` are taped captures. Errors double the ink border and tint the field.

## Do's and Don'ts

Do keep copy in the DOM at full opacity. Do honor `prefers-reduced-motion`. Do not hide project detail. Do not introduce dark mode, red, or a UI framework. Do not animate content in from `opacity: 0`.
