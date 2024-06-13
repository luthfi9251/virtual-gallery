const bcrypt = require("bcryptjs");

export function hashPassword(string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(string, salt);
}

export function comparePassword(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash);
}
