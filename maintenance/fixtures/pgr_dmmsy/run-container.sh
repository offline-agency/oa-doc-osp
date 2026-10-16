set -eu
mkdir -p /tmp/oa-pgr-data /tmp/oa-pgr-socket
chown postgres:postgres /tmp/oa-pgr-data /tmp/oa-pgr-socket
runuser -u postgres -- /usr/lib/postgresql/17/bin/initdb -D /tmp/oa-pgr-data -A trust >/tmp/initdb.log
runuser -u postgres -- /usr/lib/postgresql/17/bin/pg_ctl -D /tmp/oa-pgr-data -o '-k /tmp/oa-pgr-socket -c listen_addresses=' -w start >/tmp/server.log
psql -h /tmp/oa-pgr-socket -U postgres -d postgres -f /fixture/verify.sql
runuser -u postgres -- /usr/lib/postgresql/17/bin/pg_ctl -D /tmp/oa-pgr-data -m fast -w stop >/tmp/stop.log
