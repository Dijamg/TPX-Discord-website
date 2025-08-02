ALTER TABLE lol_match_history
ADD COLUMN champion_icon_url VARCHAR(255) NOT NULL;

ALTER TABLE lol_mastery_info
ADD COLUMN champion_icon_url VARCHAR(255) NOT NULL;

CREATE INDEX idx_lol_account_member_id ON lol_account_info(member_id);
CREATE INDEX idx_lol_match_match_id ON lol_match_history(match_id);
CREATE INDEX idx_lol_match_date ON lol_match_history(match_date);