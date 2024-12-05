#!/bin/sh
set -eux

docker compose up -d
docker compose exec db bash -c "chmod 0775 /init-db.sh"
docker compose exec db bash -c "/init-db.sh"