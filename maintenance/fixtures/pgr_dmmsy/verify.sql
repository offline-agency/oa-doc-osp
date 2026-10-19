\set ON_ERROR_STOP on
CREATE EXTENSION postgis;
CREATE EXTENSION pgrouting;
CREATE EXTENSION pgr_dmmsy;
SELECT version();
SELECT extname, extversion FROM pg_extension ORDER BY extname;
BEGIN;
CREATE TEMP TABLE docs_edges (id BIGINT PRIMARY KEY, source BIGINT NOT NULL, target BIGINT NOT NULL, cost FLOAT8 NOT NULL);
INSERT INTO docs_edges VALUES (1,1,2,1.0),(2,2,3,1.0),(3,1,3,5.0);
SELECT seq,path_seq,node,edge,cost,agg_cost FROM pgr_dmmsy('SELECT id::bigint, source::bigint, target::bigint, cost::float8 FROM docs_edges',1::bigint,3::bigint) ORDER BY path_seq;
DO $$
DECLARE q text := 'SELECT id::bigint, source::bigint, target::bigint, cost::float8 FROM docs_edges'; nodes bigint[]; costs float8[]; n bigint;
BEGIN
 SELECT array_agg(node ORDER BY path_seq),array_agg(agg_cost ORDER BY path_seq) INTO nodes,costs FROM pgr_dmmsy(q,1,3);
 IF nodes IS DISTINCT FROM ARRAY[1,2,3]::bigint[] OR costs IS DISTINCT FROM ARRAY[0,1,2]::float8[] THEN RAISE EXCEPTION 'Unexpected quickstart path: %, %',nodes,costs; END IF;
 SELECT count(*) INTO n FROM pgr_dmmsy(q,3,1); IF n<>0 THEN RAISE EXCEPTION 'Directed reverse must be unreachable'; END IF;
 SELECT count(*) INTO n FROM pgr_dmmsy(q,1,99); IF n<>0 THEN RAISE EXCEPTION 'Missing target must be unreachable'; END IF;
 SELECT count(*) INTO n FROM pgr_dmmsy(q,1); IF n<>0 THEN RAISE EXCEPTION 'Omitted target behavior changed'; END IF;
 SELECT count(*) INTO n FROM pgr_dmmsy(q,1,NULL::bigint); IF n<>0 THEN RAISE EXCEPTION 'NULL target behavior changed'; END IF;
 SELECT count(*) INTO n FROM pgr_dmmsy(q,1,3,max_levels=>0); IF n<>0 THEN RAISE EXCEPTION 'Zero phase cap must return no target path'; END IF;
 SELECT array_agg(node ORDER BY path_seq),array_agg(agg_cost ORDER BY path_seq) INTO nodes,costs FROM pgr_dmmsy(q,3,1,directed=>false);
 IF nodes IS DISTINCT FROM ARRAY[3,2,1]::bigint[] OR costs IS DISTINCT FROM ARRAY[0,1,2]::float8[] THEN RAISE EXCEPTION 'Unexpected undirected path: %, %',nodes,costs; END IF;
 RAISE NOTICE 'PASS: quickstart rows, directed/unreachable, undirected reverse, omitted/NULL target and zero-phase cap';
END $$;
ROLLBACK;
