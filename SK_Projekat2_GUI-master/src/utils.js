var TEMP_JWT = "Basic eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwZXJhQHAuY29tIiwiZXhwIjoxNjEwMjk3ODMzfQ.HjFRIufq2svOZ9q0smJ0cydfjQG4FYtnG9ulOE3LVIp_mKPqF_eHqUdgcQqxYOMkzC9rTaPhUOu4gmEB-YQmbw"

var TOKEN_PREFIX = "Basic "

function parseJwt(jwt){
    var fullJwt = jwt.substring(TOKEN_PREFIX.length);
    var jwtParts = fullJwt.split(".");

    // Dekodujemo srednji deo koji sadrzi claim
    var claims = atob(jwtParts[1]);
    
    // parsiramo ga kao JSON
    return JSON.parse(claims);
}

function getUserType(jwt) {
    var claims = parseJwt(jwt);
    return claims.role;
}

export default {
    parseJwt,
    getUserType,
    TEMP_JWT
}