const playButton = document.querySelector(".about-video__play-btn");
const iframeContainer = document.querySelector(".about-video__iframe");
const iframe = iframeContainer.querySelector("iframe");

playButton.addEventListener("click", () => {
  iframe.src = "https://www.youtube.com/embed/CNkvwsml8Oc?si=zb0BA-Cz09nPelJ7";
  iframeContainer.style.display = "block";
  playButton.style.display = "none";
});
