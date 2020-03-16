var crypto = require('crypto');

// larger numbers mean better security, less
var config = {
    // size of the generated hash
    hashBytes: 32,
    // larger salt means hashed passwords are more resistant to rainbow table, but
    // you get diminishing returns pretty fast
    saltBytes: 16,
    // more iterations means an attacker has to take longer to brute force an
    // individual password, so larger is better. however, larger also means longer
    // to hash the password. tune so that hashing the password takes about a
    // second
    iterations: 872791
};
/**
 * Hash a password using Node's asynchronous pbkdf2 (key derivation) function.
 *
 * Returns a self-contained buffer which can be arbitrarily encoded for storage
 * that contains all the data needed to verify a password.
 *
 * @param {!String} password
 * @param {!function(?Error, ?Buffer=)} callback
 */
function hashPassword(password, salt, callback) {
    if (salt === null)
        // generate a salt for pbkdf2
        crypto.randomBytes(config.saltBytes, function (err, salt) {
            if (err) { return callback(err); }
            crypto.pbkdf2(password, salt, config.iterations, config.hashBytes,
                function (err, hash) {
                    if (err) { return callback(err); }
                    var combined = new Buffer(hash.length + salt.length + 8); //alocate buffer
                    combined.writeUInt32BE(salt.length, 0, true);  // include the size of the salt so that we can, during verification,figure out how much of the hash is salt
                    combined.writeUInt32BE(config.iterations, 4, true);  // similarly, include the iteration count
                    salt.copy(combined, 8);
                    hash.copy(combined, salt.length + 8);
                    callback(null, combined);
                });
        });
    else {
        crypto.pbkdf2(password, salt, config.iterations, config.hashBytes,
            function (err, hash) {
                if (err) { return callback(err); }

                var combined = new Buffer(hash.length + salt.length + 8); //alocate buffer
                combined.writeUInt32BE(salt.length, 0, true);  // include the size of the salt so that we can, during verification,figure out how much of the hash is salt              
                combined.writeUInt32BE(config.iterations, 4, true);  // similarly, include the iteration count
                salt.copy(combined, 8);
                hash.copy(combined, salt.length + 8);
                callback(null, combined);
            });
    }
}
/**
 * Verify a password using Node's asynchronous pbkdf2 (key derivation) function.
 *
 * Accepts a hash and salt generated by hashPassword, and returns whether the
 * hash matched the password (as a boolean).
 *
 * @param {!String} password
 * @param {!Buffer} combined Buffer containing hash and salt as generated by
 *   hashPassword.
 * @param {!function(?Error, !boolean)}
 */
function verifyPassword(password, combined, callback) {
    // extract the salt and hash from the combined buffer
    var saltBytes = combined.readUInt32BE(0);
    var hashBytes = combined.length - saltBytes - 8;
    var iterations = combined.readUInt32BE(4);
    var salt = combined.slice(8, saltBytes + 8);
    var hash = combined.toString('binary', saltBytes + 8);
    // verify the salt and hash against the password
    crypto.pbkdf2(password, salt, iterations, hashBytes, function (err, verify) {
        if (err) { return callback(err, false); }
        console.log('Backend provided password shape: ' + verify.toString('binary'));
        console.log('Backend stored password shape: ' + hash.toString('binary'));
        callback(null, verify.toString('binary') === hash);
    });
}
///extend
function comparePasswords(password, salt, storedString, callback) {
    hashPassword(password, salt, (err, combined) => {


        var saltBytes = combined.readUInt32BE(0);
        var hashBytes = combined.length - saltBytes - 8;
        var hash = combined.toString('binary', saltBytes + 8);

        var iterations = combined.readUInt32BE(4);

        crypto.pbkdf2(password, salt, iterations, hashBytes, function (err, verify) {
            if (err) { return callback(err, false); }

            console.log('Backend provided comparePassword shape: ' + verify.toString('utf-8'))
            console.log('Backend stored comparePassword shape: ' + hash.toString('utf-8'))
            callback(null, verify.toString('binary') === storedString);
        });
    });


}
function verifCombined(password, salt, storedString, iterations, hashBytes, callback) {
    crypto.pbkdf2(password, salt, iterations, hashBytes, function (err, verify) {
        if (err) { return callback(err, false); }

        console.log('Backend provided comparePassword shape: ' + verify.toString('utf-8'))
        console.log('Backend stored comparePassword shape: ' + storedString.toString('utf-8'))
        callback(null, verify.toString('binary') === storedString);
    });

}

function splitCombined(combined) {
    // extract the salt and hash from the combined buffer
    var saltBytes = combined.readUInt32BE(0);
    //  var hashBytes = combined.length - saltBytes - 8;
    //  var iterations = combined.readUInt32BE(4);  
    var salt = combined.slice(8, saltBytes + 8);
    var hash = combined.toString('binary', saltBytes + 8);
    hash = combined.slice(saltBytes + 8);
    return { salt: salt, hash: hash }
}
function modifyCombined(combined) {

    const { salt, hash } = splitCombined(combined);// split salt from hash
    var modified = new Buffer(hash.length + salt.length + 8); //create new buffer

    modified.writeUInt32BE(salt.length, 0, true);  // include the size of the salt so that we can, during verification,figure out how much of the hash is salt  
    modified.writeUInt32BE(config.iterations, 4, true);  // similarly, include the iteration count

    var hashed = new Buffer(hash/*.toString('binary')/* .substring(0 , hash.length-1 ) + '.' */); //modify hash value 
    salt.copy(modified, 8);
    hashed.copy(modified, salt.length + 8);//write into buffer modified value
    return modified;
}
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.splitCombined = splitCombined;
exports.modifyCombined = modifyCombined;
exports.comparePasswords = comparePasswords;
exports.verifCombined = verifCombined;