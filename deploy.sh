#!/bin/bash
# treat unset variables as an error when substituting.
set -u
# exit immediately if a command exits with a nonzero exit status.
set -e
# deploy
make html
rsync -av --delete --force --size-only ./build/html/ web@kbsoftware.co.uk:/home/web/repo/project/www.kbsoftware.co.uk/docs/
