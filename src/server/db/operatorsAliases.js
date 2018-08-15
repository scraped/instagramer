const {Op} = require('sequelize');


module.exports = {
    $and: Op.and,
    $or: Op.or,
    $gt: Op.gt,
    $gte: Op.gte,
    $lt: Op.lt,
    $lte: Op.lte,
    $ne: Op.ne,
    $eq: Op.eq,
    $not: Op.not,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $in: Op.in,
    $notIn: Op.notIn,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $any: Op.any,
    $col: Op.col,
};


