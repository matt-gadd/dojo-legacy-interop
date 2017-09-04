var dojoConfig = {
	async: true,
	baseUrl: './',
	packages: [
		{
			name: 'app',
			location: './app'
		},
		{
			name: 'dojo',
			location: './node_modules/dojo'
		},
		{
			name: '@dojo',
			location: './node_modules/@dojo',
			resourceTags: {
				miniExclude: function (filename, mid) {
					return [
						'@dojo/core/request/providers/node'
					].indexOf(mid) > -1;
				}
			}
		},
		{
			name: 'globalize',
			location: './node_modules/globalize',
			main: 'dist/globalize',
			resourceTags: {
				miniExclude: function (filename, mid) {
					return mid.indexOf('examples') > -1;
				}
			}
		},
		{
			name: 'cldrjs',
			location: './node_modules/cldrjs',
			main: 'dist/cldrjs'
		}
	],
	map: {
		globalize: {
			'cldr': 'cldrjs/dist/cldr',
			'cldr/event': 'cldrjs/dist/cldr/event',
			'cldr/supplemental': 'cldrjs/dist/cldr/supplemental',
			'cldr/unresolved': 'cldrjs/dist/cldr/unresolved'
		}
	},
	deps: [ 'app/main' ]
};

dojoConfig.build = {
	basePath: './',
	releaseDir: './dist',
	layerOptimize: 'uglify',
	optimize: 'uglify',
	userConfig: {
		baseUrl: './dist',
		async: dojoConfig.async,
		packages: dojoConfig.packages.map(function (pkg) {
			return { name: pkg.name, main: pkg.main || 'main' };
		}),
		map: dojoConfig.map,
		deps: dojoConfig.deps
	},
	layers: {
		'dojo/dojo': {
			include: [ 'dojo/dojo', 'app/main' ],
			boot: true,
			customBase: true
		}
	}
}

