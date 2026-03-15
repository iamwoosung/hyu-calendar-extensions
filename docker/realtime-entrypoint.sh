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
  Postgrex.query!(pid, "CREATE SCHEMA IF NOT EXISTS realtime", [])
  Postgrex.query!(pid, "CREATE TABLE IF NOT EXISTS _realtime.tenants (id uuid NOT NULL DEFAULT gen_random_uuid(), name varchar(255), external_id varchar(255), jwt_secret varchar(500), max_concurrent_users integer NOT NULL DEFAULT 200, max_events_per_second integer NOT NULL DEFAULT 100, max_bytes_per_second integer NOT NULL DEFAULT 100000, max_channels_per_client integer NOT NULL DEFAULT 100, max_joins_per_second integer NOT NULL DEFAULT 500, postgres_cdc_default varchar(255), suspend boolean DEFAULT false, inserted_at timestamp NOT NULL, updated_at timestamp NOT NULL, CONSTRAINT tenants_pkey PRIMARY KEY (id))", [])
  Postgrex.query(pid, "ALTER TABLE _realtime.tenants ADD COLUMN IF NOT EXISTS suspend boolean DEFAULT false", [])
  Postgrex.query(pid, "CREATE UNIQUE INDEX IF NOT EXISTS tenants_external_id_index ON _realtime.tenants (external_id)", [])
  Postgrex.query!(pid, "CREATE TABLE IF NOT EXISTS _realtime.extensions (id uuid NOT NULL DEFAULT gen_random_uuid(), type varchar(255), settings jsonb, tenant_external_id varchar(255) REFERENCES _realtime.tenants(external_id) ON DELETE CASCADE, inserted_at timestamp NOT NULL, updated_at timestamp NOT NULL, CONSTRAINT extensions_pkey PRIMARY KEY (id))", [])
  Postgrex.query(pid, "CREATE UNIQUE INDEX IF NOT EXISTS extensions_tenant_external_id_type_index ON _realtime.extensions (tenant_external_id, type)", [])
  jwt = System.get_env("JWT_SECRET")
  db_enc_key = System.get_env("DB_ENC_KEY")  # 정확히 16바이트여야 함 (AES-128)
  key = db_enc_key
  block_size = 16
  pad_len = block_size - rem(byte_size(jwt), block_size)
  padded_jwt = jwt <> :binary.copy(<<pad_len>>, pad_len)
  encrypted_jwt = :crypto.crypto_one_time(:aes_128_ecb, key, padded_jwt, true) |> Base.encode64()
  Postgrex.query!(pid, "INSERT INTO _realtime.tenants (name, external_id, jwt_secret, max_concurrent_users, max_events_per_second, max_bytes_per_second, max_channels_per_client, max_joins_per_second, postgres_cdc_default, inserted_at, updated_at) SELECT $1, $2, $3, 200, 100, 100000, 100, 500, $4, NOW(), NOW() WHERE NOT EXISTS (SELECT 1 FROM _realtime.tenants WHERE external_id = $5)", ["localhost", "localhost", encrypted_jwt, "postgres_cdc_rls", "localhost"])
  Postgrex.query!(pid, "UPDATE _realtime.tenants SET jwt_secret = $1, updated_at = NOW() WHERE external_id = $2", [encrypted_jwt, "localhost"])
  IO.puts("[Realtime] tenant 등록 완료")
  db_host = System.get_env("DB_HOST", "postgres")
  db_user = System.get_env("DB_USER", "postgres")
  db_password = System.get_env("DB_PASSWORD", "")
  db_port_str = System.get_env("DB_PORT", "5432")
  db_name2 = System.get_env("DB_NAME", "postgres")
  encrypt_val = fn val ->
    bs = 16
    pl = bs - rem(byte_size(val), bs)
    padded = val <> :binary.copy(<<pl>>, pl)
    :crypto.crypto_one_time(:aes_128_ecb, key, padded, true) |> Base.encode64()
  end
  enc_host = encrypt_val.(db_host)
  enc_name = encrypt_val.(db_name2)
  enc_user = encrypt_val.(db_user)
  enc_pass = encrypt_val.(db_password)
  enc_port = encrypt_val.(db_port_str)
  Postgrex.query!(pid, "INSERT INTO _realtime.extensions (type, settings, tenant_external_id, inserted_at, updated_at) SELECT $1::text, jsonb_build_object($2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::text,$9::text,$10::text,$11::text,$12::text,$13::text,$14::text,$15::int,$16::text,$17::int,$18::text,$19::int,$20::text,$21::text,$22::text,$23::text,$24::text,$25::boolean), $26::text, NOW(), NOW() WHERE NOT EXISTS (SELECT 1 FROM _realtime.extensions WHERE tenant_external_id = $27::text AND type = $28::text)", ["postgres_cdc_rls", "db_host", enc_host, "db_name", enc_name, "db_user", enc_user, "db_password", enc_pass, "db_port", enc_port, "region", "us-east-1", "poll_interval_ms", 100, "poll_max_changes", 100, "poll_max_record_bytes", 1048576, "publication", "supabase_realtime", "slot_name", "supabase_realtime_rls", "ssl_enforced", false, "localhost", "localhost", "postgres_cdc_rls"])
  Postgrex.query!(pid, "UPDATE _realtime.extensions SET settings = jsonb_build_object($1::text,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::text,$9::text,$10::text,$11::text,$12::text,$13::text,$14::int,$15::text,$16::int,$17::text,$18::int,$19::text,$20::text,$21::text,$22::text,$23::text,$24::boolean), updated_at = NOW() WHERE tenant_external_id = $25::text AND type = $26::text", ["db_host", enc_host, "db_name", enc_name, "db_user", enc_user, "db_password", enc_pass, "db_port", enc_port, "region", "us-east-1", "poll_interval_ms", 100, "poll_max_changes", 100, "poll_max_record_bytes", 1048576, "publication", "supabase_realtime", "slot_name", "supabase_realtime_rls", "ssl_enforced", false, "localhost", "postgres_cdc_rls"])
  IO.puts("[Realtime] postgres_cdc_rls extension 등록 완료")
  Postgrex.query(pid, "DO $$ BEGIN CREATE ROLE anon NOLOGIN; EXCEPTION WHEN duplicate_object THEN NULL; END $$", [])
  Postgrex.query(pid, "DO $$ BEGIN CREATE ROLE authenticated NOLOGIN; EXCEPTION WHEN duplicate_object THEN NULL; END $$", [])
  Postgrex.query(pid, "DO $$ BEGIN CREATE ROLE service_role NOLOGIN BYPASSRLS; EXCEPTION WHEN duplicate_object THEN NULL; END $$", [])
  Postgrex.query!(pid, "GRANT SELECT ON \"User\" TO anon", [])
  Postgrex.query!(pid, "ALTER TABLE \"User\" REPLICA IDENTITY FULL", [])
  Postgrex.query(pid, "DO $$ BEGIN CREATE PUBLICATION supabase_realtime FOR TABLE \"User\"; EXCEPTION WHEN duplicate_object THEN NULL; END $$", [])
  IO.puts("[Realtime] anon 역할, REPLICA IDENTITY, publication 설정 완료")
  GenServer.stop(pid)
'

echo "[Realtime] 서버 시작..."
exec /app/bin/realtime start
