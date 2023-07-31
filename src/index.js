import { fetchBreeds,fetchCatByBreed } from "./cat-api";
let storedBreeds = [];

let catInfo = document.querySelector(".cat-info");
let breedImage = document.createElement('img');
let breedInfo = document.createElement('div');
let breedName = document.createElement('h2');
let breedDescription = document.createElement('p');
let breedTemperamentTitle = document.createElement('h3');
breedTemperamentTitle.textContent = "Temperament";
let breedTemperament = document.createElement('p');
let breedSelect = document.querySelector('.breed-select');

catInfo.appendChild(breedImage);
catInfo.appendChild(breedInfo);
breedInfo.appendChild(breedName);
breedInfo.appendChild(breedDescription);
breedInfo.appendChild(breedTemperamentTitle);
breedInfo.appendChild(breedTemperament);

const cssStyles = `
	.cat-info {
		display: flex;
		padding: 20px;
	}

	.hidden {
    display: none;
  }

  img {
    width: 50%;
    height: 50%;
  }

	.info {
    display: flex;
		flex-direction: column;
		padding: 0 20px;
  }

	.error {
		color: red;
	}
`;

const styleHtmlTag = document.createElement('style');
styleHtmlTag.type = 'text/css';
styleHtmlTag.appendChild(document.createTextNode(cssStyles));
document.head.appendChild(styleHtmlTag);

let loader = document.querySelector(".loader");
let errorMsg = document.querySelector(".error");

loader.classList.add("hidden");
errorMsg.classList.add("hidden");
catInfo.classList.add("hidden");
breedInfo.classList.add("info");

function showLoader() {
	if (loader.classList.contains("hidden")) {
		loader.classList.remove("hidden");
	}
}

function hideLoader() {
	if (!loader.classList.contains("hidden")) {
		loader.classList.add("hidden");
	}
}

function showInfo() {
	if (catInfo.classList.contains("hidden")) {
		catInfo.classList.remove("hidden");
	}
}

function hideInfo() {
	if (!catInfo.classList.contains("hidden")) {
		catInfo.classList.add("hidden");
	}
}

function showError() {
	if (errorMsg.classList.contains("hidden")) {
		errorMsg.classList.remove("hidden");
	}
}

function hideError() {
	if (!errorMsg.classList.contains("hidden")) {
		errorMsg.classList.add("hidden");
	}
}

function showBreedImage(breedInfo) {
	breedImage.src = breedInfo.imageUrl;
	breedName.textContent = breedInfo.name;
	breedDescription.textContent = breedInfo.description;
	breedTemperament.textContent = breedInfo.temperament;
}

showLoader();
hideInfo();
hideError();

fetchBreeds()
	.then((data) => {
		hideLoader();
		showInfo();
		data = data.filter(img => img.image?.url != null)
		.map(i => ({...i, imageUrl: i.image.url}));

		storedBreeds = data;

		for (let i = 0; i < storedBreeds.length; i++) {
			const breed = storedBreeds[i];
			let option = document.createElement('option');

			if (!breed.image) continue

			option.value = `${breed.id}`;
			option.innerHTML = `${breed.name}`;
			breedSelect.appendChild(option);
		}
		showBreedImage(storedBreeds[0]);
	})
	.catch(function (error) {
		showError();
		hideLoader();
		hideInfo();
	})
	.finally(() => {
		hideLoader();
		hideInfo();
	});

breedSelect.addEventListener("change", (e) => {
	showLoader();
	hideError();
	hideInfo();
	fetchCatByBreed(e.target.value)
	.then(data => {
		hideLoader();
		showInfo();
		data = {
			imageUrl: data[0].url,
			name: data[0].breeds[0].name,
			description: data[0].breeds[0].description,
			temperament: data[0].breeds[0].temperament
		};
		showBreedImage(data);
	})
	.catch(error => {
		hideLoader();
		showError();
		hideInfo();
	});
})
