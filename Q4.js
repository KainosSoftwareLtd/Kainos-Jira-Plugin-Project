function showQ4(tab) {
	tab.sort(function(a, b) {
		return b - a
	});
	return tab[0];
}

showQ4(tab);