#!/bin/bash

# If seed-dump.sql exists in the same directory, then load if

cd "$(dirname "$0")"/..

if [ -f prisma/seed-dump.sql ]; then
  echo "Using existing seed-dump.sql"
  npx prisma db execute --file prisma/seed-dump.sql
else
  echo "seed-dump.sql not found, using seed.ts"
  npx ts-node prisma/seed.ts
fi