#!/bin/bash
set -e
export PATH="$HOME/.local/bin:$PATH"
cd "$(dirname "$0")"

if ! gh auth status >/dev/null 2>&1; then
  echo "Сначала войдите в GitHub:"
  gh auth login --hostname github.com --git-protocol https --web
fi

USERNAME=$(gh api user -q .login)
echo "Аккаунт: $USERNAME"

if git remote get-url origin >/dev/null 2>&1; then
  git push -u origin main
else
  gh repo create novatrip --public --source=. --remote=origin --push \
    --description "NovaTrip — лендинг умного подбора туров"
fi

gh api "repos/$USERNAME/novatrip/pages" -X POST \
  -f build_type=legacy -f "source[branch]=main" -f "source[path]=/" 2>/dev/null || \
gh api "repos/$USERNAME/novatrip/pages" -X PUT \
  -f build_type=legacy -f "source[branch]=main" -f "source[path]=/"

sed -i '' "s|USERNAME|$USERNAME|g" README.md
git add README.md
git -c user.name="$USERNAME" -c user.email="$USERNAME@users.noreply.github.com" \
  commit -m "Update README with live demo URL" 2>/dev/null || true
git push origin main

echo ""
echo "Готово!"
echo "Репозиторий: https://github.com/$USERNAME/novatrip"
echo "Демо:        https://$USERNAME.github.io/novatrip/"
