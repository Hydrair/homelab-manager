# Entitities

## User

- id
- email
- passwordHash
- role

## Server

- id
- name
- ipAddress
- description
- userId
- user

## Service

- id
- name
- url
- port
- serverId

# Relations

User has 0:n Server
Server has 0:n Services
