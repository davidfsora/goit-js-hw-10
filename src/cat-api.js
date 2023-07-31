import axios from "axios";

// const axios = require('axios')

const api_key = "live_bhJOs1wV8iLJ1xYobAYWPqV9wHT0wjvd1E4zAjM72wpSRwYLxRA6qBRKcLBfvysR";

axios.defaults.headers.common["x-api-key"] = api_key;

function fetchBreeds() {
	return axios.get(`https://api.thecatapi.com/v1/breeds`)
	.then(response => response.data);
}

function fetchCatByBreed(breedId) {
	return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
		.then(response => response.data);
}

export { fetchBreeds, fetchCatByBreed };