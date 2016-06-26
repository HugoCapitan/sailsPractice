module.exports = function emmailAddressInUse () {
  var res = this.res;

  return res.send(409, 'Email address is already taken by another user.');
}
