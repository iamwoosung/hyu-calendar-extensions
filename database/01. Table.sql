-- =============================================
-- Table: User
-- =============================================
DROP TABLE IF EXISTS "User";

CREATE TABLE "User" (
    "UserNo"           SERIAL       PRIMARY KEY,
    "UserUUID"         UUID         NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    "UserKakaoID"      VARCHAR(255) NOT NULL UNIQUE,
    "UserKakaoName"    VARCHAR(255),
    "UserHYUID"        VARCHAR(255),
    "UserHYUName"      VARCHAR(255),
    "UserHYUEmail"     VARCHAR(255),
    "UserPrivateEmail" VARCHAR(255),
    "SyncStatus"       INTEGER      DEFAULT NULL,  -- 1:요청 / 2:처리중 / 3:완료 / 4:실패
    "SyncUpdateDate"   TIMESTAMP    DEFAULT NULL,
    "UserInsertDate"   TIMESTAMP    DEFAULT NULL,
    "UserUpdateDate"   TIMESTAMP    DEFAULT NULL
);

-- =============================================
-- Table: Subject (사용자 수강 과목)
-- =============================================
DROP TABLE IF EXISTS "Subject";

CREATE TABLE "Subject" (
    "SubjectNo"       SERIAL       PRIMARY KEY,
    "UserNo"          INTEGER      NOT NULL REFERENCES "User"("UserNo") ON DELETE CASCADE,
    "SubjectCode"     VARCHAR(255) NOT NULL,
    "SubjectName"     VARCHAR(255) NOT NULL,
    "Semester"        VARCHAR(255) NOT NULL DEFAULT '',
    "DeleteFlag"      INTEGER      NOT NULL DEFAULT 0,
    "SubjectInsertDate" TIMESTAMP  DEFAULT NULL,
    "SubjectUpdateDate" TIMESTAMP  DEFAULT NULL,
    UNIQUE ("UserNo", "SubjectCode", "Semester")
);

-- =============================================
-- Supabase Realtime Publication 설정
-- User 테이블 변경사항(SyncStatus)을 WAL로 노출
-- Extension은 UserUUID 필터로 본인 row만 구독
-- =============================================
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE "User";

-- Realtime postgres_cdc_rls 모드: JWT role:"anon" 권한 체크용
DO $$ BEGIN
    CREATE ROLE anon NOLOGIN;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
GRANT SELECT ON "User" TO anon;

-- WAL에 전체 열 포함 (UserUUID 필터 및 SyncStatus 값 전달에 필요)
ALTER TABLE "User" REPLICA IDENTITY FULL;
