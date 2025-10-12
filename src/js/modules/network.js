document.addEventListener("DOMContentLoaded", () => {
  const videoWrappers = document.querySelectorAll(
    ".video-guide__video-wrapper"
  );

  videoWrappers.forEach((wrapper) => {
    const playBtn = wrapper.querySelector(".video-guide__play-btn");
    const overlay = wrapper.querySelector(".video-guide__video-overlay");
    const iframe = wrapper.querySelector("iframe");

    playBtn.addEventListener("click", () => {
      overlay.style.display = "none";
      iframe.style.display = "block";
    });
  });
});
