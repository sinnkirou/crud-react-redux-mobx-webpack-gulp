function WebpackPugManifestPlugin(options) {
  this.filter = options.filter;
  this.sort = options.sort;
  this.filename = options.filename;
}

// eslint-disable-next-line func-names
WebpackPugManifestPlugin.prototype.apply = function(compiler) {
  const { filter, sort, filename } = this;

  compiler.plugin('emit', (compilation, callback) => {
    let assets = [];

    Object.keys(compilation.assets).forEach(key => {
      assets.push(key);
    });

    if (typeof filter === 'function') {
      assets = assets.filter(filter);
    }

    if (typeof sort === 'function') {
      assets.sort(sort);
    }

    // eslint-disable-next-line no-param-reassign
    compilation.assets[filename || 'pug-manifest.pug'] = {
      source() {
        return assets.reduce(
          (accumulation, asset) => `${accumulation}script(src='${asset}')\n`,
          ''
        );
      },
      size() {
        return assets.length;
      }
    };

    callback();
  });
};

module.exports = WebpackPugManifestPlugin;
