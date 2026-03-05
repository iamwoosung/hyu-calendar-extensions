-- =============================================
-- SP: USER_SET (카카오 최초 로그인 시 회원가입)
-- =============================================
DROP PROCEDURE IF EXISTS "USER_SET"(VARCHAR, VARCHAR);

CREATE OR REPLACE PROCEDURE "USER_SET"(
    IN p_UserKakaoID   VARCHAR(255),
    IN p_UserKakaoName VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO "User" (
        "UserKakaoID",
        "UserKakaoName",
        "UserInsertDate"
    ) VALUES (
        p_UserKakaoID,
        p_UserKakaoName,
        NOW()
    )
    ON CONFLICT ("UserKakaoID") DO NOTHING;
END;
$$;
