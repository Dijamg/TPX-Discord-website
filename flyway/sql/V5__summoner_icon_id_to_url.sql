ALTER TABLE lol_basic_info ADD COLUMN summoner_icon_url TEXT;

UPDATE lol_basic_info 
SET summoner_icon_url = 'https://ddragon.leagueoflegends.com/cdn/15.17.1/img/profileicon/' || summoner_icon_id || '.png'
WHERE summoner_icon_id IS NOT NULL;

ALTER TABLE lol_basic_info ALTER COLUMN summoner_icon_url SET NOT NULL;

ALTER TABLE lol_basic_info DROP COLUMN summoner_icon_id;
