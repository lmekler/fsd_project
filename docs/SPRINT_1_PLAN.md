# Project Plan - Sprint 1

## Author

Patrick Arevalo (Documentation Lead)

## Key Features

- Browsing Events
- Saved Events
- Organizer Events

### User Stories

- *"As a User, I want to be able to browse community events happening in my area, so that I know which events to go to."*
- *"As a User, I want to be able to see all the events I saved in a separate page so that I know which events I'm going to."*
- *"As a User, I want to be able to see events hosted by an organizer I support so that I can be more involved in their programming."*

## Feature Owners

- Browsing Events (Leann)
- Saved Events (Patrick)
- Organizer Events (Chan)

## Directory Structure

fsd_project/
├── documentation
├── public
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── header // shared Header component
│   │   │   └── footer // shared Footer component
│   │   └── pages/
│   │       ├── BrowseEvents // Leann's Page
│   │       ├── SavedEvents // Patrick's Page
│   │       └── OrganizerEvents // Chan's Page
│   ├── assets
│   ├── data.json
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts

## Leann To-Dos
- Build Repo
- Deploy Repo
- Work on Shared Header

## Patrick To-Dos
- Create Docs
- Work on Shared Data

## Chan To-Dos
- Create Styleguide
- Work on Shared Footer