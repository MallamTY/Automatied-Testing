exports.sum = (a,b) => {
    return a + b
}


exports.deleteUserById = (users, userId) => {
    return users.filter((user) => user.id !== userId);
}

exports.findUserById = (users, userId) => {
    return users.find(user => user.id == userId)
}