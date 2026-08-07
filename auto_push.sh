#!/bin/bash
# Auto‑push and PR creation script for ganesh22takwale.github.io

BRANCH="grt/upgrade/full-stack"
COMMIT_MSG="grt/upgrade/full-stack scaffold"

# Create and switch to new branch
git checkout -b $BRANCH

# Stage and commit all changes
git add .
git commit -m "$COMMIT_MSG"

# Push branch to origin
git push origin $BRANCH

# Create PR automatically (requires GitHub CLI)
gh pr create --title "$COMMIT_MSG" --body "Full scaffold: CI/CD, Firestore wiring, and Notion sync base."
