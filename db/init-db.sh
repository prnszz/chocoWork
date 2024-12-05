#!/bin/sh
set -eux

mysql -uroot --password=${MYSQL_ROOT_PASSWORD} -e "
  CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};
  DROP TABLE IF EXISTS ${MYSQL_DATABASE}.\`tasks\`;
  CREATE TABLE ${MYSQL_DATABASE}.\`tasks\` (
    \`id\` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    \`title\` varchar(100) NOT NULL,
    \`date\` date NOT NULL,
    \`coins\` int(3) NOT NULL,
    \`duration\` int(3) NOT NULL
  );
  "