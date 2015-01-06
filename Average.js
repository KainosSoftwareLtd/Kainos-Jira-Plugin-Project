function showAvg(tab) {
	var avg;
	var n = tab.length;
	var suma = 0;
	var i;

	tab.sort(function(a, b) {
		return a - b
	});

	for (i = 0; i < n; i++) {
		suma = suma + tab[i];

	}

	avg = suma / n;

	return avg;
}

showAvg(tab);