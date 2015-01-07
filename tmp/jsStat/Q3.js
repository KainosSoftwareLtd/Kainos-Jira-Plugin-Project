function showQ3(tab) {
	var q3 = 0;
	var positionq3;
	var n = tab.length;

	tab.sort(function(a, b) {
		return a - b
	});

	if (n % 2 == 0) {
		positionq3 = (n + 1) * 0.75;
		var positionq3int = parseInt(positionq3);
		var leftover = ((positionq3 * 100) % 100) / 100;

		q3 = (tab[positionq3int - 1] + (leftover * (tab[positionq3int] - tab[positionq3int - 1])));

		return q3;

	} else {
		positionq3 = n * 0.75;
		var positionq3int = parseInt(positionq3);
		var leftover = ((positionq3 * 100) % 100) / 100;

		q3 = (tab[positionq3int - 1] + (leftover * (tab[positionq3int] - tab[positionq3int - 1])));

		return q3;
	}

}

showQ3(tab);