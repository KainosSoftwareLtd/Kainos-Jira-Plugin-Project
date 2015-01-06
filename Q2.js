function showQ2(tab) {
	var q2 = 0;
	var positionq2;
	var n = tab.length;

	tab.sort(function(a, b) {
		return a - b
	});

	if (n % 2 == 0) {
		positionq2 = (n + 1) * 0.5;
		var positionq2int = parseInt(positionq2);
		var leftover = ((positionq2 * 100) % 100) / 100;

		q2 = (tab[positionq2int - 1] + (leftover * (tab[positionq2int] - tab[positionq2int - 1])));

		return q2;

	} else {
		positionq2 = n * 0.5;
		var positionq2int = parseInt(positionq2);
		var leftover = ((positionq2 * 100) % 100) / 100;

		q2 = (tab[positionq2int - 1] + (leftover * (tab[positionq2int] - tab[positionq2int - 1])));

		return q2;
	}

}

showQ2(tab);