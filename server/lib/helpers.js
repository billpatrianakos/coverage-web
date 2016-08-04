module.exports = {
  loadScripts: function(scripts) {
    var tags = '';
    if (!scripts) {
      return '';
    } else {
      scripts.forEach(function(script) {
        tags += '<script src="' + script + '"></script>\n';
      });

      return tags;
    }
  }
};
