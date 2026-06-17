# API (erste Version)

## Auth

POST /auth/register
POST /auth/login
GET /auth/me

## Server

GET /servers
POST /servers
GET /servers/:id
PATCH /servers/:id
DELETE /servers/:id

## Services

GET /servers/:id/services
POST /servers/:id/services
PATCH /services/:id
DELETE /services/:id
