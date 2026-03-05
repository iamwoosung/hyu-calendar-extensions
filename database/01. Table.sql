-- =============================================
-- Table: User
-- =============================================
DROP TABLE IF EXISTS "User";

CREATE TABLE "User" (
    "UserNo"           SERIAL       PRIMARY KEY,
    "UserKakaoID"      VARCHAR(255) NOT NULL UNIQUE,
    "UserKakaoName"    VARCHAR(255),
    "UserHYUID"        VARCHAR(255),
    "UserHYUName"      VARCHAR(255),
    "UserHYUEmail"     VARCHAR(255),
    "UserPrivateEmail" VARCHAR(255),
    "UserInsertDate"   TIMESTAMP    DEFAULT NULL,
    "UserUpdateDate"   TIMESTAMP    DEFAULT NULL
);
