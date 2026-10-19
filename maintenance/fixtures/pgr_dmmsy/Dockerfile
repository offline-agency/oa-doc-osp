FROM althea-postgis:17.11-3.5.7
USER root
RUN apt-get update && apt-get install -y --no-install-recommends postgresql-17-pgrouting && rm -rf /var/lib/apt/lists/*
COPY src /fixture/source
RUN make -C /fixture/source PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config && make -C /fixture/source install PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config
