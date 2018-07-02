#!/bin/sh

git log --reverse --format='* %aN [%aE](%aE)' | perl -wnE '
BEGIN {
  say "# Ui-Cataloging Module";
  say "## Authors"
}
print $seen{$_} = $_ unless $seen{$_}
' > AUTHORS.md
