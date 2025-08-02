UPDATE lol_match_history
SET champion_icon_url = 
    'https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/' || champion_name || '.png'
WHERE champion_icon_url IS NULL;