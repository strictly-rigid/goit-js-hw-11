export function scroll() {
    const { height: cardHeight } = document
      .querySelector(".gallery")
      .firstElementChild.getBoundingClientRect();
    
    window.scrollBy({
      top: cardHeight,
      behavior: "smooth",
    });
};
