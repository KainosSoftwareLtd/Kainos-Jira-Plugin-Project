package com.jiradev.jira.plugins.statistic;

import java.util.Arrays;

class Statistic {

	private static double avg = 0;
	private static double max = 0;
	private static double min = 0;
	private static double q1 = 0;
	private static double q2 = 0;
	private static double q3 = 0;
	private static double q4 = 0;

	public static double showavg(double[] tab) {
		int n = tab.length;
		double suma = 0;
		Arrays.sort(tab);

		for (int i = 0; i < n; i++) {
			suma += tab[i];
		}
		avg = suma / (n - 1);
		return avg;
	}

	public static double showmax(double[] tab) {
		int n = tab.length;
		Arrays.sort(tab);
		max = tab[n - 1];
		return max;

	}

	public static double showmin(double[] tab) {
		Arrays.sort(tab);
		min = tab[0];
		return min;
	}
	
	public static double Q1(double[] tab) {
		
		double positionq1;
		int n = tab.length;

		Arrays.sort(tab);
		if (tab == null || n == 0) {
			throw new IllegalArgumentException(
					"The data array is null or does not contain any data.");
		} else {
			if (n % 2 == 0) {
				positionq1 = (n + 1) * 0.25;
				int positionq1int = (int) positionq1;
				double leftover = ((positionq1 * 100) % 100) / 100;
				q1 = (tab[positionq1int - 1] + (leftover * (tab[positionq1int] - tab[positionq1int - 1])));
				return q1;

			} else {
				positionq1 = n * 0.25;
				int positionq1int = (int) positionq1;
				double leftover = ((positionq1 * 100) % 100) / 100;
				q1 = (tab[positionq1int - 1] + (leftover * (tab[positionq1int] - tab[positionq1int - 1])));
				return q1;
			}
		}
	}
	
	public static double Q2(double[] tab) {
		double positionq2;
		int n = tab.length;

		Arrays.sort(tab);
		if (tab == null || n == 0) {
			throw new IllegalArgumentException(
					"The data array is null or does not contain any data.");
		} else {
			if (n % 2 == 0) {
				positionq2 = (n + 1) * 0.5;
				int positionq2int = (int) positionq2;
				double leftover = ((positionq2 * 100) % 100) / 100;

				q2 = (tab[positionq2int - 1] + (leftover * (tab[positionq2int] - tab[positionq2int - 1])));

				return q2;

			} else {
				positionq2 = n * 0.5;
				int positionq2int = (int) positionq2;
				double leftover = ((positionq2 * 100) % 100) / 100;

				q2 = (tab[positionq2int - 1] + (leftover * (tab[positionq2int] - tab[positionq2int - 1])));

				return q2;
			}

		}

	}
	
	public static double Q3(double[] tab) {
		double positionq3;
		int n = tab.length;

		Arrays.sort(tab);
		if (tab == null || n == 0) {
			throw new IllegalArgumentException(
					"The data array is null or does not contain any data.");
		} else {
			if (n % 2 == 0) {
				positionq3 = (n + 1) * 0.75;
				int positionq3int = (int) positionq3;
				double leftover = ((positionq3 * 100) % 100) / 100;

				q3 = (tab[positionq3int - 1] + (leftover * (tab[positionq3int] - tab[positionq3int - 1])));

				return q3;

			} else {
				positionq3 = n * 0.75;
				int positionq3int = (int) positionq3;
				double leftover = ((positionq3 * 100) % 100) / 100;

				q3 = (tab[positionq3int - 1] + (leftover * (tab[positionq3int] - tab[positionq3int - 1])));

				return q3;
			}
		}
	}
	
	public static double Q4(double[] tab) {
		int n = tab.length;
		Arrays.sort(tab);
		q4 = tab[n-1];
		
		return q4;

	}
	
}
