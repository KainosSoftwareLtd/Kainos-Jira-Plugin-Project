function showQ1 (tab) {
	var q1 = 0;
	var positionq1;
	var n = tab.length;

	tab.sort(function(a, b){return a-b});
	
	
	if (n % 2 == 0) {
		positionq1 = (n + 1) * 0.25;
		var positionq1int = parseInt(positionq1);
		var leftover = ((positionq1 * 100) % 100) / 100;

		q1 = (tab[positionq1int - 1] + (leftover * (tab[positionq1int] - tab[positionq1int - 1])));

		return q1;

	} else {
		positionq1 = n * 0.25;
		var positionq1int = parseInt(positionq1);
		var leftover = ((positionq1 * 100) % 100) / 100;

		q1 = (tab[positionq1int - 1] + (leftover * (tab[positionq1int] - tab[positionq1int - 1])));

		return q1;
	}
	
	
	
}

showQ1(tab);