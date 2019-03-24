#!/bin/bash

# https://gist.github.com/lauraturk/93742fd34101a0f15b988f3d3b27104d

ssh-keyscan -H heroku.com >> ~/.ssh/known_hosts

cat >> ~/.ssh/config << EOF
VerifyHostKeyDNS yes
StrictHostKeyChecking no
EOF
