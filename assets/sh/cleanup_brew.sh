#!/bin/bash

echo "🔍 Nettoyage en cours…"

# Liste tous les casks installés
casks=$(brew list --cask)

# Boucle sur chaque cask pour détecter ceux cassés
for cask in $casks; do
  app_path="/Applications/$(brew info --cask $cask | grep -oE '[^/]+\.app' | head -1)"
  if [ ! -e "$app_path" ]; then
    echo "⚠ ️ App manquante : $cask ($app_path)"
    echo "⛔ Suppression forcée…"
    brew uninstall --cask --force "$cask"
    rm -rf "/usr/local/Caskroom/$cask"
  fi
done

# Nettoyage général
echo "🧼 brew cleanup"
brew cleanup

echo "🔧 brew doctor"
brew doctor

echo "✅ Terminé."

