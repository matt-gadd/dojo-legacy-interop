define([
	'@dojo/i18n/i18n',
	'./i18n/main',
], function(i18nModule, bundle){
	var i18n = i18nModule.default;
	var observeLocale = i18nModule.observeLocale;
	var switchLocale = i18nModule.switchLocale;

	observeLocale({
		next: function (locale) {
			i18n(bundle, locale).then(function (messages) {
				var div = document.createElement('div');
				div.innerHTML = locale + ': ' + JSON.stringify(messages);
				document.body.appendChild(div);
			})
		}
	});

	switchLocale('en');

	setTimeout(function() {
		switchLocale('en-PR');
	}, 500);
});
