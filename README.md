# JobLens-AI

> An AI-powered Chrome extension that analyzes LinkedIn jobs against your resume, performs ATS-style skill matching, detects keyword gaps, and provides in-page job compatibility insights through a floating draggable assistant.

---

## Table of Contents

* Overview
* Why This Project Exists
* Key Features
* System Architecture
* Application Flow
* Folder Structure
* Tech Stack
* Chrome Extension Concepts Used
* React Concepts Used
* TypeScript Concepts Used
* ATS Matching Engine
* Resume Parsing Flow
* LinkedIn Scraping Flow
* Engineering Decisions & Tradeoffs
* Technical Challenges Solved
* Bugs Fixed
* Known Limitations
* Future Improvements
* Local Development Setup
* MIT License

---

# Overview

**JobLens-AI** is a Chrome Extension designed to help job seekers understand:

> **How well does my resume match this job before I apply?**

Instead of manually reading job descriptions and mentally comparing them against a resume, JobLens-AI automates the process.

The extension:

```txt
Reads Resume
        ↓
Extracts Resume Skills
        ↓
Scrapes LinkedIn Job
        ↓
Extracts Job Skills
        ↓
Compares Resume vs Job
        ↓
Displays Match Analysis
```

JobLens-AI is built as a **floating in-page assistant**, meaning users can continue browsing LinkedIn jobs while receiving ATS-style analysis in real time.

Unlike traditional resume scanners, JobLens-AI does **not require leaving LinkedIn**.

---

# Why This Project Exists

While applying for frontend and MERN roles, I repeatedly faced the same problem:

### Questions I constantly had:

* Does my resume actually match this role?
* Am I missing important ATS keywords?
* Why does one role feel like a good fit while another doesn't?
* Am I wasting time applying to poorly matched jobs?

Most solutions online were:

❌ Paid SaaS platforms
❌ Generic ATS scanners
❌ Resume upload websites
❌ Not integrated into job browsing

I wanted something:

```txt
Instant
Lightweight
Practical
Integrated into LinkedIn
AI-ready
```

So I built **JobLens-AI**.

---

# Key Features

## 1. Resume Parsing

Upload a resume and automatically extract text.

### Current Support

* PDF resumes

### Planned Support

* DOCX resumes
* Multiple saved resumes
* Resume history

---

## 2. LinkedIn Job Scraping

Automatically extracts:

* Job Title
* Company
* Location
* Job Description

directly from LinkedIn job pages.

---

## 3. ATS Skill Matching

Performs ATS-style keyword comparison between:

```txt
Resume Skills
        VS
Job Description Skills
```

Then calculates:

### Match Score

Example:

```txt
78% Match
```

### Matching Skills

Skills present in both:

```txt
React
TypeScript
JavaScript
REST APIs
```

### Missing Skills

Skills missing from resume:

```txt
AWS
Docker
Kafka
```

---

## 4. Floating Draggable Assistant

Instead of relying on a tiny browser popup:

JobLens injects a **floating assistant panel directly inside LinkedIn job pages**.

Users can:

```txt
Browse Job
      +
Analyze Job
      +
Move Assistant Anywhere
```

without interrupting their workflow.

---

# System Architecture

## High-Level Architecture

```txt
┌─────────────────────┐
│ Chrome Popup        │
│ Resume Upload       │
│ API Key Setup       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ chrome.storage.local│
│ Persist Resume Text │
│ Persist API Key     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ LinkedIn Page       │
│ Content Script      │
│ Injection           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ FloatingPanel.tsx   │
│ In-Page Assistant   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ ATS Matching Engine │
│ Skill Extraction    │
│ Skill Comparison    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Analysis Result UI  │
│ Match Insights      │
└─────────────────────┘
```

---

# Application Flow

## Resume Upload Flow

```txt
User Uploads Resume PDF
            ↓
pdfjs-dist parses PDF
            ↓
Resume text extracted
            ↓
chrome.storage.local
            ↓
Saved for later ATS comparison
```

---

## LinkedIn Job Flow

```txt
User Opens LinkedIn Job
            ↓
Content script injected
            ↓
Floating React panel appears
            ↓
getJobDetails()
extracts job information
            ↓
User clicks "Analyze Job"
            ↓
ATS Engine runs
            ↓
Results rendered
```

---

## ATS Matching Flow

```txt
Resume Text
       ↓
extractSkills()
       ↓
Resume Skills

Job Description
       ↓
extractSkills()
       ↓
Job Skills

Resume Skills
        VS
Job Skills
       ↓
compareSkills()
       ↓
Score + Matching + Missing
```

---

# Folder Structure

```txt
src/
│
├── ats/
│   ├── skillExtractor.ts
│   └── skillMatcher.ts
│
├── constants/
│   └── skills.ts
│
├── content/
│   ├── components/
│   │   └── AnalysisResult.tsx
│   │
│   ├── FloatingPanel.tsx
│   ├── linkedinScraper.tsx
│   └── getJobDetails.ts
│
├── parser/
│   └── pdfParser.ts
│
├── popup/
│   └── pages/
│       └── Setup.tsx
│
├── storage/
│   └── chromeStorage.ts
│
└── types/
    └── job.ts
```

## Folder Explanation

### `ats/`

Contains the ATS logic.

#### `skillExtractor.ts`

Responsible for:

```txt
Job description text
        ↓
Extract technical skills
```

Uses **regex boundary matching** to prevent false positives.

Example problem solved:

```txt
Java
≠
JavaScript
```

---

#### `skillMatcher.ts`

Compares:

```txt
resumeSkills
        VS
jobSkills
```

Returns:

```ts
matching
missing
score
```

---

### `content/`

Contains logic injected into LinkedIn.

#### `linkedinScraper.tsx`

Injects the React application into the LinkedIn page.

Creates:

```html
<div id="joblens-root"></div>
```

then mounts React.

---

#### `FloatingPanel.tsx`

Main UI logic.

Responsible for:

* Rendering panel
* Dragging behavior
* Job detection
* Running ATS analysis
* Managing state

---

#### `AnalysisResult.tsx`

Dedicated UI component for:

```txt
Match Score
Matching Skills
Missing Skills
Detected Job Skills
```

Keeps UI separated from business logic.

---

#### `getJobDetails.ts`

Scrapes LinkedIn DOM using selector fallbacks.

Extracts:

```txt
title
company
location
description
```

Designed with multiple selectors because LinkedIn frequently changes layouts.

---

### `parser/`

#### `pdfParser.ts`

Uses:

```txt
pdfjs-dist
```

to extract resume text from uploaded PDFs.

---

### `storage/`

#### `chromeStorage.ts`

Wrapper around:

```txt
chrome.storage.local
```

for persisting:

* Resume text
* OpenAI API key

---

### `popup/`

Contains Chrome extension popup UI.

Current purpose:

```txt
Upload Resume
Set API Key
```

---

# Tech Stack

## Frontend

* React 19
* TypeScript
* Vite

Why?

```txt
Fast build system
Modern React tooling
Strong type safety
```

---

## Styling

* Tailwind CSS v4

Used for:

```txt
Utility-first styling
Rapid iteration
Cleaner UI system
```

---

## Chrome Extension

* Manifest V3
* CRXJS Vite Plugin

Used for:

```txt
content script injection
extension bundling
manifest integration
```

---

## Resume Parsing

* pdfjs-dist

Used to:

```txt
Extract raw text from PDF resumes
```

---

## Storage

* chrome.storage.local

Used for:

```txt
persisting resume text
persisting API key
```

---

## Planned AI Layer

* OpenAI API

Planned usage:

```txt
Resume recommendations
Missing skill prioritization
Job fit explanation
Interview preparation
Resume tailoring suggestions
```


---

# Chrome Extension Concepts Used

This project heavily uses **Chrome Extension Manifest V3 architecture**.

Instead of building a traditional web application, JobLens-AI operates inside the browser and interacts directly with LinkedIn pages.

Understanding these concepts was essential.

---

## 1. Manifest V3

JobLens-AI is built using:

```txt id="mv3a"
Chrome Extension Manifest V3
```

Manifest V3 is Chrome’s latest extension architecture.

It defines:

* Permissions
* Content scripts
* Extension metadata
* Script injection behavior

### Why Manifest V3?

Because:

```txt id="mv3b"
Google now requires MV3
Better security
Modern extension architecture
```

---

### Example Responsibilities

The manifest handles:

```txt id="mv3c"
Which websites extension can run on
What scripts can be injected
Popup configuration
Permissions
```

Example:

```txt id="mv3d"
LinkedIn
        ↓
Inject content script
        ↓
Render floating assistant
```

---

## 2. Content Scripts

One of the most important concepts in this project.

### What is a Content Script?

A content script allows an extension to:

> **inject JavaScript into a website**

In JobLens-AI:

```txt id="mv3e"
LinkedIn Job Page
        ↓
linkedinScraper.tsx
        ↓
FloatingPanel injected
```

Without content scripts:

❌ No LinkedIn scraping
❌ No floating assistant
❌ No in-page ATS analysis

---

### Why Content Scripts Were Necessary

Initially, the extension was designed around a popup.

Problem:

```txt id="mv3f"
Popup UI
       ↓
User opens popup
       ↓
Popup closes immediately
```

This created poor UX because users constantly had to:

```txt id="mv3g"
switch between popup
and LinkedIn page
```

Instead:

JobLens-AI injects itself directly into LinkedIn.

Result:

```txt id="mv3h"
Job browsing uninterrupted
```

Much better experience.

---

## 3. chrome.storage.local

Chrome extensions cannot rely on traditional browser localStorage in the same way normal applications do.

Instead:

JobLens-AI uses:

```txt id="mv3i"
chrome.storage.local
```

for persistent storage.

### Used For

```txt id="mv3j"
Resume text
OpenAI API key
Future analysis history
```

---

### Storage Flow

```txt id="mv3k"
Resume Upload
       ↓
Extracted Text
       ↓
chrome.storage.local
       ↓
Retrieved during ATS comparison
```

This prevents:

```txt id="mv3l"
re-uploading resume every session
```

---

## 4. Extension Injection Strategy

JobLens-AI dynamically injects:

```html id="mv3m"
<div id="joblens-root"></div>
```

into LinkedIn.

Then React mounts:

```txt id="mv3n"
FloatingPanel.tsx
```

inside that DOM node.

Flow:

```txt id="mv3o"
LinkedIn Page
      ↓
Content Script Runs
      ↓
Create Root Div
      ↓
ReactDOM.createRoot()
      ↓
FloatingPanel Mounted
```

This approach allows JobLens-AI to behave like a native LinkedIn feature.

---

# React Concepts Used

JobLens-AI is built with **React 19** and follows a component-driven architecture.

---

## 1. Component-Based Architecture

Instead of putting everything into one file, the UI is separated into reusable components.

Example:

```txt id="react1"
FloatingPanel.tsx
        ↓
AnalysisResult.tsx
```

### Why?

This improves:

```txt id="react2"
Maintainability
Readability
Scalability
```

Benefits:

```txt id="react3"
UI logic separated
Business logic separated
Reusable components
```

---

## 2. State Management with useState

The extension uses:

```txt id="react4"
useState()
```

to manage dynamic UI.

Example:

```txt id="react5"
jobData
analysis result
loading state
dragging position
```

Example flow:

```txt id="react6"
Analyze Job Clicked
          ↓
Loading State = true
          ↓
ATS Analysis Runs
          ↓
Results stored in state
          ↓
UI re-renders
```

---

## 3. useEffect

Used for:

```txt id="react7"
LinkedIn job detection
content updates
initial setup
```

### Why useEffect?

LinkedIn behaves like a:

```txt id="react8"
Single Page Application (SPA)
```

Meaning:

```txt id="react9"
URL changes
but page doesn't reload
```

This created a challenge.

---

### Problem

Sometimes:

```txt id="react10"
New Job Title
       +
Old Description
```

caused incorrect ATS analysis.

Example:

Frontend role displaying:

```txt id="react11"
Kafka
Java
AWS
```

from previous job.

---

### Solution

A polling-based strategy was used:

```txt id="react12"
setInterval()
       ↓
check LinkedIn DOM
       ↓
update job data
```

This keeps panel data synchronized with LinkedIn navigation.

---

## 4. Conditional Rendering

React conditional rendering is used extensively.

Example:

Before scraping:

```txt id="react13"
Detecting Job...
```

After scraping:

```txt id="react14"
Frontend Developer
```

Example:

```txt id="react15"
Analyze button disabled
until job detected
```

Prevents invalid ATS runs.

---

## 5. Props

Props are used for component communication.

Example:

```txt id="react16"
FloatingPanel
        ↓
AnalysisResult
```

Passing:

```txt id="react17"
score
matching skills
missing skills
job skills
```

This keeps components modular.

---

# TypeScript Concepts Used

JobLens-AI uses **strict TypeScript configuration**.

This dramatically reduced runtime bugs.

---

## 1. Interfaces

Interfaces are used to define object structure.

Example:

```ts id="ts1"
interface JobDetails {
  title: string;
  company: string;
  location: string;
  description: string;
}
```

Benefits:

```txt id="ts2"
Autocomplete
Type safety
Better developer experience
```

---

## 2. Strict Type Safety

TypeScript prevented bugs like:

```txt id="ts3"
unknown type from chrome.storage
```

Example problem:

```ts id="ts4"
extractSkills(resumeText)
```

error because:

```txt id="ts5"
resumeText
=
unknown
```

Solution:

Explicit narrowing:

```ts id="ts6"
typeof value === "string"
```

---

## 3. Optional Chaining

Used heavily while scraping LinkedIn DOM.

Example:

```ts id="ts7"
element?.textContent?.trim()
```

Prevents:

```txt id="ts8"
Cannot read property
of undefined
```

when selectors fail.

---

## 4. Utility Types

Used for safer state handling.

Example:

```txt id="ts9"
nullable analysis state
```

before ATS results exist.

---

# ATS Matching Engine

One of the core systems of JobLens-AI.

The ATS engine compares:

```txt id="ats1"
Resume Skills
        VS
Job Skills
```

and calculates:

```txt id="ats2"
match score
matching skills
missing skills
```

---

## Step 1 — Skill Extraction

Text:

```txt id="ats3"
resume/job description
```

gets processed by:

```txt id="ats4"
extractSkills()
```

Example:

Input:

```txt id="ats5"
We need React, TypeScript,
REST APIs and Node.js
```

Output:

```txt id="ats6"
[
 React,
 TypeScript,
 REST API,
 Node.js
]
```

---

## Step 2 — Regex Boundary Matching

A major bug was discovered.

### Problem

This logic:

```txt id="ats7"
includes()
```

caused false positives.

Example:

```txt id="ats8"
Java
```

matched:

```txt id="ats9"
JavaScript ❌
```

Also:

```txt id="ats10"
Go
```

matched:

```txt id="ats11"
MongoDB ❌
GitHub ❌
```

Result:

Completely inaccurate ATS scores.

---

### Fix

Regex word boundaries:

```txt id="ats12"
\bskill\b
```

Now:

```txt id="ats13"
Java
≠
JavaScript
```

Correct ATS behavior achieved.

---

## Step 3 — Skill Comparison

Comparison logic:

```txt id="ats14"
Resume Skills
        VS
Job Skills
```

Produces:

### Matching Skills

Present in both.

### Missing Skills

Missing from resume.

### Match Score

Calculated based on:

```txt id="ats15"
matching /
total job skills
```

Used for ATS-style percentage scoring.

---

# Engineering Decisions & Tradeoffs

This section explains **why certain decisions were made**.

---

## Why Popup Was Abandoned

Initial idea:

```txt id="eng1"
Popup-only extension
```

Problem:

Poor UX.

Flow became:

```txt id="eng2"
Open popup
      ↓
View job
      ↓
Popup closes
      ↓
Repeat
```

Very frustrating.

---

### Final Decision

Move to:

```txt id="eng3"
Floating in-page assistant
```

Benefits:

```txt id="eng4"
Always visible
Better UX
Feels integrated
No context switching
```

Much closer to a real product experience.

---

## Why Manual Drag Instead of react-draggable

Initially attempted:

```txt id="eng5"
react-draggable
```

Problem:

Chrome content-script mounting issues caused:

```txt id="eng6"
DraggableCore not mounted
```

errors.

### Final Decision

Manual drag implementation.

Benefits:

```txt id="eng7"
lighter
more control
fewer dependencies
extension-safe
```

---

## Why Polling Over MutationObserver

Two options considered:

### MutationObserver

More efficient.

### Polling

Simpler for MVP.

Chosen:

```txt id="eng8"
setInterval()
```

Reason:

```txt id="eng9"
faster implementation
easier debugging
reliable enough for MVP
```

May be upgraded later.


---

# Technical Challenges Solved

Building JobLens-AI involved several engineering challenges.

This section documents the problems encountered and how they were solved.

---

## 1. LinkedIn is a Single Page Application (SPA)

### Problem

LinkedIn does not fully reload pages.

Instead:

```txt id="bug1"
URL changes
        ↓
DOM updates dynamically
        ↓
Content loads later
```

This caused issues where:

```txt id="bug2"
New Job Title
      +
Old Job Description
```

would be analyzed together.

Example:

Frontend role showing:

```txt id="bug3"
Java
Kafka
AWS
```

from a previous role.

---

### Solution

A polling strategy was introduced.

Flow:

```txt id="bug4"
setInterval()
        ↓
Check LinkedIn page
        ↓
Re-scrape job content
        ↓
Update panel state
```

This keeps the floating panel synchronized with LinkedIn.

---

## 2. LinkedIn Selector Instability

### Problem

LinkedIn frequently changes DOM structure.

Example:

Company information may appear under:

```txt id="bug5"
.company-name
```

on one page but:

```txt id="bug6"
.primary-description a
```

on another.

Result:

```txt id="bug7"
Unknown Company
Unknown Role
```

---

### Solution

Implemented selector fallback strategy.

Example:

```txt id="bug8"
Try Selector A
        ↓
Fail?
        ↓
Try Selector B
        ↓
Fail?
        ↓
Try Selector C
```

This significantly improved scraping reliability.

---

## 3. PDF Parsing Worker Errors

### Problem

`pdfjs-dist` caused:

```txt id="bug9"
No GlobalWorkerOptions.workerSrc specified
```

inside Chrome extension context.

Another issue:

```txt id="bug10"
Failed to fetch worker
```

because extension assets resolve differently than traditional web apps.

---

### Solution

Configured PDF parsing to work inside a Chrome extension environment.

This enabled:

```txt id="bug11"
Reliable resume text extraction
```

without backend processing.

---

## 4. chrome.storage Undefined Error

### Problem

Attempting:

```ts id="bug12"
chrome.storage.local
```

inside normal browser DevTools caused:

```txt id="bug13"
Cannot read properties of undefined
```

---

### Root Cause

Chrome APIs only exist inside:

```txt id="bug14"
extension context
```

not regular webpages.

---

### Solution

Used:

```txt id="bug15"
Extension DevTools
```

for debugging storage APIs.

---

## 5. Extension Context Invalidated Error

### Problem

After rebuilding extension:

```bash id="bug16"
npm run build
```

content scripts from previous versions remained active.

This caused:

```txt id="bug17"
Extension context invalidated
```

errors.

---

### Solution

Development workflow established:

```txt id="bug18"
Build
      ↓
Reload extension
      ↓
Hard refresh LinkedIn
```

This ensured latest content scripts were loaded.

---

## 6. False ATS Skill Matching

### Problem

Skill extraction originally used:

```ts id="bug19"
includes()
```

Example:

```txt id="bug20"
Java
```

matched:

```txt id="bug21"
JavaScript ❌
```

Also:

```txt id="bug22"
Go
```

matched:

```txt id="bug23"
MongoDB ❌
GitHub ❌
```

Result:

```txt id="bug24"
fake 100% ATS scores
```

---

### Solution

Regex word boundaries introduced.

Example:

```txt id="bug25"
\bjava\b
```

Now:

```txt id="bug26"
Java
≠
JavaScript
```

Accurate matching restored.

---

## 7. Case Sensitivity Bug

### Problem

Stored:

```txt id="bug27"
resumetext
```

but attempted to read:

```txt id="bug28"
resumeText
```

Result:

```txt id="bug29"
Resume not found
0% match
```

---

### Solution

Standardized naming conventions.

---

## 8. File Casing Issue (Windows + TypeScript)

### Problem

TypeScript detected:

```txt id="bug30"
GetJobDetails.ts
```

and:

```txt id="bug31"
getJobDetails.ts
```

as separate files.

Error:

```txt id="bug32"
differs only in casing
```

---

### Solution

Renamed files consistently and restarted TypeScript server.

---

# Bugs Fixed During Development

### Fixed

✅ Manifest JSON trailing comma issue
✅ Chrome storage API undefined
✅ PDF worker configuration issues
✅ Extension invalidation bug
✅ False ATS skill matches
✅ LinkedIn stale description issue
✅ Draggable panel issues
✅ React mounting issues
✅ TypeScript unknown type errors
✅ Case-sensitive storage mismatch
✅ Selector instability issues

---

# Known Limitations

Although functional, JobLens-AI is still evolving.

### Current Limitations

---

## 1. LinkedIn DOM Instability

LinkedIn frequently changes HTML structure.

This means:

```txt id="lim1"
selectors may occasionally fail
```

requiring updates.

---

## 2. Dictionary-Based ATS Matching

Current skill detection uses:

```txt id="lim2"
predefined skill dictionary
```

instead of semantic AI understanding.

Meaning:

```txt id="lim3"
similar technologies
may not be recognized
```

Example:

```txt id="lim4"
ExpressJS
vs
Express
```

---

## 3. Polling-Based Detection

Current LinkedIn updates use:

```txt id="lim5"
setInterval()
```

instead of:

```txt id="lim6"
MutationObserver
```

This is sufficient for MVP but not ideal for scale.

---

## 4. Limited File Support

Current support:

```txt id="lim7"
PDF only
```

Planned:

```txt id="lim8"
DOCX support
```

---

## 5. AI Recommendations Not Yet Implemented

Currently:

```txt id="lim9"
ATS matching only
```

Planned:

```txt id="lim10"
OpenAI insights
resume improvement suggestions
interview recommendations
job fit explanations
```

---

# Future Improvements

## AI Layer

Planned OpenAI integration:

```txt id="future1"
Resume-job fit explanation
Missing skill prioritization
Interview preparation suggestions
Resume tailoring recommendations
```

---

## Job Tracking

Save analyzed jobs.

Example:

```txt id="future2"
Applied
Interviewing
Rejected
Saved
```

---

## Multi-Job Comparison

Compare:

```txt id="future3"
multiple jobs
against same resume
```

to prioritize applications.

---

## Better ATS Engine

Upgrade from:

```txt id="future4"
dictionary-based
```

to:

```txt id="future5"
semantic AI understanding
```

---

## More Platforms

Future scraping support:

```txt id="future6"
Indeed
Naukri
Wellfound
Glassdoor
```

---

## Smarter Skill Detection

Detect:

```txt id="future7"
equivalent technologies
```

Example:

```txt id="future8"
REST API
REST APIs
RESTful API
```

---

# Local Development Setup

## Clone Repository

```bash id="setup1"
git clone https://github.com/YOUR_USERNAME/JobLens-AI.git
```

---

## Install Dependencies

```bash id="setup2"
npm install
```

---

## Run Development

```bash id="setup3"
npm run dev
```

---

## Build Extension

```bash id="setup4"
npm run build
```

---

## Load Into Chrome

Open:

```txt id="setup5"
chrome://extensions
```

Enable:

```txt id="setup6"
Developer Mode
```

Click:

```txt id="setup7"
Load unpacked
```

Select:

```txt id="setup8"
dist/
```

---

## Development Workflow

Recommended workflow:

```txt id="setup9"
Make changes
      ↓
npm run build
      ↓
Reload extension
      ↓
Hard refresh LinkedIn
```

---

# Lessons Learned

Building JobLens-AI reinforced several engineering lessons.

### Technical Lessons

* Browser extensions behave differently from traditional React apps
* Chrome APIs require extension context
* LinkedIn scraping is unreliable without fallbacks
* Regex matching matters for ATS accuracy
* Strong TypeScript catches expensive bugs early
* MVP tradeoffs are sometimes more important than perfect architecture

### Product Lessons

* UX matters more than technical elegance
* Floating in-page UI beats popup friction
* Real-world debugging teaches more than tutorials
* Small engineering decisions compound into better products

---

# Contributing

Contributions, suggestions, and ideas are welcome.

If you'd like to contribute:

```bash id="contrib1"
Fork repository
       ↓
Create feature branch
       ↓
Submit pull request
```

---

# License

This project is licensed under the **MIT License**.

Feel free to use, modify, and improve it.

---

# Author

Built by **Nikhil Pillai**

Focused on:

```txt id="author1"
Frontend Development
MERN Stack
TypeScript
AI-integrated products
Browser Extensions
```
