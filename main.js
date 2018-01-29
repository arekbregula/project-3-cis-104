/**
 *   @author Bregula, Arkadiusz (bregulaa@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Generates an average movie score based on user inputu :: created: 01.15.2018
 */

"use strict";
const PROMPT = require("readline-sync");

const MIN_MOVIE_RATING = 0,
	  MAX_MOVIE_RATING = 5,
	  MAX_INVALID_RATINGS = 3,
	  QUIT_VALUE = 999;

let movieTitle,
	movieRatings,
	invalidRatings,
	averageRating,
	wantsToQuit = false;

/**
 * The dispatch method for this program
 * @return {null}
 */
function main() {
	setMovieTitle();

	setInvalidRatings();

	while(invalidRatings <= MAX_INVALID_RATINGS && wantsToQuit == false) {
		setMovieRating();
	}

	setAverageRating();
	showAverageRating();
}

main();

/**
 * Ask for the movie title.
 * @return {null}
 */
function setMovieTitle() {
	movieTitle = PROMPT.question("Please enter the movie title: ");
}

/**
 * Reset invalidRatings to 0
 */
function setInvalidRatings() {
	invalidRatings = 0;
}

/**
 * Ask for movie rating and add to movieRatings array if valid
 */
function setMovieRating() {
	let rating = PROMPT.questionInt("Please enter a rating for this movie (" + MIN_MOVIE_RATING + " - " + MAX_MOVIE_RATING + " or " + QUIT_VALUE + " to show the average and exit): ");

	if(movieRatings == undefined) { movieRatings = []; }

	if(rating == QUIT_VALUE) {
		wantsToQuit = true;
		return;
	}

	if(isRatingValid(rating)) {
		setInvalidRatings();
		movieRatings.push(rating);
	} else {
		invalidRatings += 1;
	}
}

/**
 * Determine whether the entered movie rating is valid
 * @param  {Integer}
 * @return {Boolean}
 */
function isRatingValid(rating) {
	if((rating >= MIN_MOVIE_RATING) && (rating <= MAX_MOVIE_RATING)) {
		return true;
	} else {
		console.log("\nThis entry was invalid. Try again. (You have " + (MAX_INVALID_RATINGS - invalidRatings) + " tries left.)");
		return false;
	}
}

/**
 * Calculate average movie rating based on previous entries
 */
function setAverageRating() {
	let total = movieRatings.reduce((a, b) => a+b, 0);
	averageRating = total/movieRatings.length;
}

/**
 * Display movie rating
 */
function showAverageRating() {
	console.log("\n\nThe average rating for '" + movieTitle + "' is: " + averageRating);
}