#!/usr/bin/bash
echo '********** SETUP CI ****************'
mkdir -p .circleci
chmod +x .circleci
cd .circleci/
touch config.yml
cat ../script/ci/template.yml > config.yml
echo '********* END SETUP ****************'

