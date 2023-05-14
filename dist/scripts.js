let pokemonRepository = (function () {
		let e = [];
		function t(t) {
			"object" == typeof t
				? Object.keys(t).includes("name")
					? e.push(t)
					: alert('"Name" is required to add a new pokemon to the Pokedex')
				: alert("You can only add Objects to the list.");
		}
		async function a(e) {
			try {
				let t = await (await fetch(e.detailsUrl)).json();
				(e.imageUrl = t.sprites.front_default),
					(e.imageUrlBack = t.sprites.back_default),
					(e.number = t.id),
					(e.height = t.height),
					(e.weight = t.weight),
					(e.types = t.types.map((e) => e.type.name).join(", "));
			} catch (a) {
				console.error(a);
			}
		}
		function n(e) {
			pokemonRepository.loadDetails(e).then(function () {
				showModal(e);
			});
		}
		function o() {
			return e;
		}
		return {
			add: t,
			getAll: o,
			addListItem: function e(t) {
				let a = document.createElement("li");
				a.classList.add("group-list-item"),
					a.classList.add("col-12"),
					a.classList.add("col-md-6"),
					a.classList.add("col-lg-4");
				let o = document.querySelector(".pokemon-list"),
					i = document.createElement("div");
				i.classList.add("list-item"), i.classList.add("group-list-item");
				let s = document.createElement("img");
				s.classList.add("pokemon-image"),
					(s.alt = "Image of front of " + t.name),
					(s.src = t.imageUrl);
				let l = document.createElement("div");
				l.classList.add("card-body");
				let d = document.createElement("h3");
				d.classList.add("card-head"), (d.innerText = t.number);
				let r = document.createElement("h3");
				r.classList.add("card-head"), (r.innerText = t.name);
				let c = document.createElement("button");
				(c.innerText = "View Details"),
					c.classList.add("card-btn"),
					c.setAttribute("data-toggle", "modal"),
					c.setAttribute("data-target", "#modal-container"),
					(function e(t, a) {
						t.addEventListener("click", function () {
							n(a);
						});
					})(c, t),
					l.appendChild(d),
					l.appendChild(r),
					l.appendChild(c),
					i.appendChild(s),
					i.appendChild(l),
					a.appendChild(i),
					o.appendChild(a);
			},
			loadList: function e() {
				return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
					.then(function (e) {
						return e.json();
					})
					.then(function (e) {
						e.results.forEach(function (e) {
							t({ name: e.name, detailsUrl: e.url });
						});
					})
					.catch(function (e) {
						console.error(e);
					});
			},
			loadDetails: a,
			showDetails: n,
		};
	})(),
	loadingMessage = document.querySelector("#loading-message");
function showLoadingMessage() {
	"complete" !== document.readyState && loadingMessage.classList.add("loading");
}
function hideLoadingMessage() {
	"complete" === document.readyState && loadingMessage.classList.remove("loading");
}
let pokeArray = [];
function showModal(e) {
	let t = document.querySelector(".modal-body");
	t.innerText = "";
	let a = document.querySelector(".modal-title");
	a.innerText = "";
	let n = document.createElement("h1");
	n.innerText = e.name.toUpperCase();
	let o = document.createElement("img");
	o.classList.add("modal-img"), (o.alt = "Image of front of " + e.name), (o.src = e.imageUrl);
	let i = document.createElement("img");
	i.classList.add("modal-img"), (i.alt = "Image of back of " + e.name), (i.src = e.imageUrlBack);
	let s = document.createElement("p");
	s.innerText = "Type: " + e.types;
	let l = document.createElement("p");
	l.innerText = "Height: " + e.height;
	let d = document.createElement("p");
	(d.innerText = "Weight: " + e.weight),
		a.appendChild(n),
		t.appendChild(o),
		t.appendChild(i),
		t.appendChild(s),
		t.appendChild(l),
		t.appendChild(d);
}
function navBarSearch(e) {
	e.preventDefault();
	let t = document.getElementById("nav-search"),
		a = t.value.toLowerCase(),
		n = document.getElementById("dropdown-list"),
		o = document.getElementById("result-dropdown");
	n.innerText = "";
	let i = pokemonRepository.getAll(),
		s = i.filter((e) => e.name.toLowerCase().includes(a));
	!(function e(t) {
		if (t.length <= 0 || 150 === t.length) {
			let a = document.createElement("li");
			(a.innerText = "No matching Pokemon...You gotta go catch 'em!"),
				a.classList.add("error-list-item"),
				a.classList.add("search-list-item"),
				a.classList.add("group-list-item"),
				a.classList.add("col-12"),
				n.appendChild(a);
		}
	})(s),
		s.forEach(function e(a) {
			if (s.length > 0 && 150 != s.length) {
				let o = document.createElement("li");
				o.classList.add("group-list-item"), o.classList.add("col-12");
				let i = document.createElement("button");
				(i.innerText = a.name.toUpperCase()),
					i.classList.add("search-list-item"),
					i.classList.add("group-list-item"),
					i.classList.add("col-12"),
					i.setAttribute("data-toggle", "modal"),
					i.setAttribute("data-target", "#modal-container"),
					(function e(a, n) {
						a.addEventListener("click", function (e) {
							e.preventDefault(),
								pokemonRepository.showDetails(n),
								document.getElementById("result-dropdown").classList.remove("dropdown-show"),
								(t.value = ""),
								$("#result-dropdown button").remove();
						});
					})(i, a),
					n.appendChild(o),
					o.appendChild(i);
			}
		}),
		window.addEventListener("keydown", (e) => {
			"Escape" === e.key &&
				o.classList.contains("dropdown-show") &&
				(o.classList.remove("dropdown-show"), $("#result-dropdown button").remove());
		});
	let l;
	(l = document.createElement("button")).classList.add("btn"),
		l.classList.add("close-button"),
		(l.innerText = "Close"),
		o.appendChild(l),
		l.addEventListener("click", function (e) {
			e.preventDefault(), (t.value = ""), o.classList.remove("dropdown-show"), o.removeChild(l);
		}),
		o.classList.add("dropdown-show");
}
pokemonRepository.loadList().then(function () {
	showLoadingMessage(),
		pokemonRepository.getAll().forEach(async function (e) {
			await pokemonRepository.loadDetails(e).then(function () {
				pokeArray.push(e),
					pokeArray.sort((e, t) => e.number - t.number),
					150 === pokeArray.length &&
						(console.log("it is time!"),
						pokeArray.forEach(function (e) {
							pokemonRepository.addListItem(e);
						}),
						hideLoadingMessage());
			});
		});
}),
	showLoadingMessage(),
	document.getElementById("nav-button").addEventListener("click", (e) => navBarSearch(e));
