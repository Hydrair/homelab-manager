# Home Lab Manager

## Ziel des Projekts

Dieses Projekt dient als Lern- und Portfolio-Projekt, um den Übergang von Frontend-Entwicklung zu Fullstack-Entwicklung zu unterstützen.

Der Fokus liegt auf:

* Backend-Entwicklung mit Node.js
* API-Design
* Authentifizierung & Autorisierung
* Datenmodellierung
* MySQL
* Docker
* Monitoring
* CI/CD
* Betrieb einer produktionsnahen Anwendung

Das Projekt soll bewusst typische Anforderungen moderner Fullstack-Stellen abdecken.

---

# Projektidee

Home Lab Manager ist eine Anwendung zur Verwaltung von Servern und Services im eigenen Homelab.

Ein Nutzer kann:

* Server verwalten
* Services verwalten
* Statusinformationen einsehen
* Verfügbarkeiten überwachen

Der Fokus liegt nicht auf Infrastruktur-Automatisierung, sondern auf einer sauberen Fullstack-Architektur.

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* React Router
* TanStack Query

## Backend

* Node.js
* TypeScript
* Fastify

## Datenbank

* MySQL
* Prisma ORM

## Infrastruktur

* Docker
* Docker Compose

## Monitoring

* Prometheus
* Grafana

## Qualität

* ESLint
* Prettier
* Husky
* lint-staged

## Testing

* Vitest
* Playwright

## CI/CD

* GitHub Actions

---

# Warum kein Next.js?

Ziel des Projekts ist das Erlernen und Demonstrieren von Fullstack-Kompetenzen.

Da bereits Erfahrung mit React vorhanden ist, soll der Fokus auf folgenden Bereichen liegen:

* API-Design
* Backend-Architektur
* Authentifizierung
* Datenmodellierung
* Betrieb von Services

Daher wird ein separates Frontend- und Backend-System verwendet.

Architektur:

React → Fastify API → Prisma → MySQL

---

# Warum Prisma?

Prisma wird verwendet für:

* Typsichere Datenbankzugriffe
* Datenbank-Migrationen
* TypeScript-Integration
* Schnelle Entwicklung

Trotz Prisma sollen weiterhin folgende Datenbankthemen aktiv gelernt werden:

* Relationen
* Foreign Keys
* Indizes
* Datenmodellierung
* Query-Optimierung

---

# Architektur (MVP)

## Entitäten

### User

* id
* email
* passwordHash
* role

### Server

* id
* name
* ipAddress
* description
* userId

### Service

* id
* name
* url
* port
* serverId

## Beziehungen

User
└── Server
└── Service

---

# Authentifizierung

Die Authentifizierung wird selbst implementiert.

Ziele:

* Registrierung
* Login
* JWT Authentication
* Rollenmodell
* Geschützte API-Routen

Geplante Rollen:

* USER
* ADMIN

---

# API (erste Version)

## Auth

POST /auth/register

POST /auth/login

GET /auth/me

---

## Server

GET /servers

POST /servers

GET /servers/:id

PATCH /servers/:id

DELETE /servers/:id

---

## Services

GET /servers/:id/services

POST /servers/:id/services

PATCH /services/:id

DELETE /services/:id

---

# Entwicklungsstrategie

Wichtige Erkenntnis aus früheren Projekten:

Frontend, Backend und Auth werden nicht parallel entwickelt.

Stattdessen erfolgt die Entwicklung in Schichten.

Reihenfolge:

1. Datenbank
2. Backend
3. Auth
4. API
5. Monitoring
6. Frontend
7. Tests
8. Deployment

Dadurch werden gegenseitige Abhängigkeiten reduziert.

---

# Version Roadmap

## v0.1 – Backend Foundation

Ziel:

Grundlegende Infrastruktur schaffen.

### Aufgaben

* Fastify Setup
* Prisma Setup
* MySQL Setup
* Docker Compose
* User Modell
* Server Modell
* Service Modell

Erfolgskriterium:

API kann Daten speichern und abrufen.

---

## v0.2 – Authentifizierung

### Aufgaben

* Registrierung
* Login
* Passwort Hashing
* JWT
* Rollenmodell
* Protected Routes

Erfolgskriterium:

Authentifizierter Zugriff auf API-Endpunkte.

---

## v0.3 – Server Management

### Aufgaben

* Server anlegen
* Server bearbeiten
* Server löschen
* Server anzeigen

Erfolgskriterium:

Vollständiges CRUD für Server.

---

## v0.4 – Service Management

### Aufgaben

* Services anlegen
* Services bearbeiten
* Services löschen
* Services anzeigen

Erfolgskriterium:

Vollständiges CRUD für Services.

---

## v0.5 – Monitoring

### Aufgaben

* Health Checks
* Erreichbarkeit prüfen
* Status speichern
* Historisierung

Beispiele:

* Online
* Offline
* Letzte erfolgreiche Prüfung

Erfolgskriterium:

System erkennt Server- und Service-Ausfälle.

---

## v0.6 – Frontend

### Aufgaben

* Login
* Dashboard
* Serververwaltung
* Serviceverwaltung

Erfolgskriterium:

Alle Funktionen über React nutzbar.

---

## v0.7 – Monitoring Dashboard

### Aufgaben

* Grafana
* Prometheus
* API Metrics
* Fehlerquoten
* Antwortzeiten

Erfolgskriterium:

Metriken sichtbar und auswertbar.

---

## v0.8 – Tests

### Backend

* Unit Tests
* API Tests

### Frontend

* Component Tests

### E2E

* Playwright

Erfolgskriterium:

Kernfunktionen automatisch getestet.

---

## v0.9 – CI/CD

### Aufgaben

* GitHub Actions
* Linting
* Tests
* Docker Build

Erfolgskriterium:

Automatisierte Pipeline vorhanden.

---

## v1.0 – Deployment

### Aufgaben

* Deployment
* HTTPS
* Domain
* Monitoring produktiv

Erfolgskriterium:

Anwendung öffentlich erreichbar.

---

# Mögliche spätere Erweiterungen

Nicht Bestandteil des MVP.

## Infrastruktur

* SSH Integration
* Docker Integration
* Kubernetes Integration
* Terraform Integration

## Sicherheit

* Rate Limiting
* Audit Log
* Passwort Reset
* E-Mail Verifizierung

## Performance

* Redis Caching

## Produktfunktionen

* Service Tags
* Benachrichtigungen
* Wartungsfenster
* Verfügbarkeitsstatistiken

---

# Lernziele

Nach Abschluss des Projekts sollen folgende Fähigkeiten praktisch nachgewiesen werden können:

* Fullstack-Entwicklung
* API-Design
* Datenmodellierung
* Authentifizierung
* Docker
* Monitoring
* CI/CD
* Deployment
* Betrieb einer Webanwendung

Das Projekt soll als Referenzprojekt für Fullstack-Developer-Stellen dienen.
