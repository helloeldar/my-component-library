#!/bin/bash

# Script to copy UI guidelines from intellij-sdk-docs repo

# You should clone this repo first from https://github.com/JetBrains/intellij-sdk-docs
# Then replace this path with intellij-sdk-docs repo path:
DOCS_REPO="/Users/Bulat.Davletov/IdeaProjects/intellij-sdk-docs"

# ---

DOCS_REPO_TOPICS="topics/ui"
DOCS_REPO_IMAGES="images/ui"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TOPICS_DEST="$SCRIPT_DIR"
IMAGES_DEST="$SCRIPT_DIR/images"

if [ ! -d "$DOCS_REPO" ]; then
    echo "Error: intellij-sdk-docs repo not found at $DOCS_REPO"
    echo "Please clone it first: git clone https://github.com/JetBrains/intellij-sdk-docs"
    exit 1
fi

mkdir -p "$IMAGES_DEST"
mkdir -p "$TOPICS_DEST"

echo "Copying images..."
cp -r "$DOCS_REPO/$DOCS_REPO_IMAGES"/* "$IMAGES_DEST"/

echo "Copying topics..."
cp -r "$DOCS_REPO/$DOCS_REPO_TOPICS"/* "$TOPICS_DEST"/

echo "Done copying guidelines"
