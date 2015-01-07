function showMin(tab) {
	tab.sort(function(a, b) {
		return a - b
	});
	return tab[0];
}

showMin(tab);