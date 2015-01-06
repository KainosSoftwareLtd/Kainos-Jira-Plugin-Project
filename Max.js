function showMax(tab) {
	tab.sort(function(a, b) {
		return b - a
	});
	return tab[0];
}

showMax(tab);