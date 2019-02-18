#!/bin/bash
sed -i '' "s~database.*~database\: \'mongodb:\/\/root\:3fiDQCbPYe\@10\.27\.243\.66\:27017\'\,~" ./config/database.js; \
docker build -t gcr.io/joule-development-218113/cmaj/legend:$1 .