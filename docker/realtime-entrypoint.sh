#!/bin/sh
set -e

echo "[Realtime] _realtime 스키마 및 테이블 생성/확인..."
/app/bin/realtime eval '
  Application.ensure_all_started(:postgrex)
  {:ok, pid} = Postgrex.start_link(
    hostname: System.get_env("DB_HOST", "postgres"),
    port: String.to_integer(System.get_env("DB_PORT", "5432")),
    database: System.get_env("DB_NAME", "postgres"),
    username: System.get_env("DB_USER", "postgres"),
    password: System.get_env("DB_PASSWORD", ""),
    ssl: false
  )
  Postgrex.query!(pid, "CREATE SCHEMA IF NOT EXISTS _realtime", [])
  Postgrex.query!(pid, "CREATE TABLE IF NOT EXISTS _realtime.tenants (id uuid NOT NULL DEFAULT gen_random_uuid(), name varchar(255), external_id varchar(255), jwt_secret varchar(500), max_concurrent_users integer NOT NULL DEFAULT 200, max_events_per_second integer NOT NULL DEFAULT 100, max_bytes_per_second integer NOT NULL DEFAULT 100000, max_channels_per_client integer NOT NULL DEFAULT 100, max_joins_per_second integer NOT NULL DEFAULT 500, postgres_cdc_default varchar(255), suspend boolean DEFAULT false, inserted_at timestamp NOT NULL, updated_at timestamp NOT NULL, CONSTRAINT tenants_pkey PRIMARY KEY (id))", [])
  Postgrex.query(pid, "ALTER TABLE _realtime.tenants ADD COLUMN IF NOT EXISTS suspend boolean DEFAULT false", [])
  Postgrex.query(pid, "CREATE UNIQUE INDEX IF NOT EXISTS tenants_external_id_index ON _realtime.tenants (external_id)", [])
  Postgrex.query!(pid, "CREATE TABLE IF NOT EXISTS _realtime.extensions (id uuid NOT NULL DEFAULT gen_random_uuid(), type varchar(255), settings jsonb, tenant_external_id varchar(255) REFERENCES _realtime.tenants(external_id) ON DELETE CASCADE, inserted_at timestamp NOT NULL, updated_at timestamp NOT NULL, CONSTRAINT extensions_pkey PRIMARY KEY (id))", [])
  Postgrex.query(pid, "CREATE UNIQUE INDEX IF NOT EXISTS extensions_tenant_external_id_type_index ON _realtime.extensions (tenant_external_id, type)", [])
  jwt = System.get_env("JWT_SECRET")
  secret_key_base = System.get_env("SECRET_KEY_BASE")
  key = :binary.part(secret_key_base, 0, 16)
  block_size = 16
  pad_len = block_size - rem(byte_size(jwt), block_size)
  padded_jwt = jwt <> :binary.copy(<<pad_len>>, pad_len)
  encrypted_jwt = :crypto.crypto_one_time(:aes_128_ecb, key, padded_jwt, true) |> Base.encode64()
  Postgrex.query!(pid, "INSERT INTO _realtime.tenants (name, external_id, jwt_secret, max_concurrent_users, max_events_per_second, max_bytes_per_second, max_channels_per_client, max_joins_per_second, postgres_cdc_default, inserted_at, updated_at) SELECT $1, $2, $3, 200, 100, 100000, 100, 500, $4, NOW(), NOW() WHERE NOT EXISTS (SELECT 1 FROM _realtime.tenants WHERE external_id = $5)", ["localhost", "localhost", encrypted_jwt, "postgres_cdc_rls", "localhost"])
  Postgrex.query!(pid, "UPDATE _realtime.tenants SET jwt_secret = $1, updated_at = NOW() WHERE external_id = $2", [encrypted_jwt, "localhost"])
  IO.puts("[Realtime] tenant 등록 완료")
  db_name = System.get_env("DB_NAME", "postgres")
  Postgrex.query!(pid, "ALTER DATABASE " <> db_name <> " SET search_path = _realtime, public", [])
  IO.puts("[Realtime] search_path 설정 완료")
  Postgrex.query(pid, "DO $$ BEGIN CREATE ROLE anon NOLOGIN; EXCEPTION WHEN duplicate_object THEN NULL; END $$", [])
  Postgrex.query!(pid, "GRANT SELECT ON \"User\" TO anon", [])
  Postgrex.query!(pid, "ALTER TABLE \"User\" REPLICA IDENTITY FULL", [])
  IO.puts("[Realtime] anon 역할 및 REPLICA IDENTITY 설정 완료")
  GenServer.stop(pid)
'

echo "[Realtime] 서버 시작..."
exec /app/bin/realtime start
