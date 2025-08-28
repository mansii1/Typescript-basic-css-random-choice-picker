import "./style.css";

const tagsEl = document.getElementById("tags") as HTMLDivElement;
const textarea = document.getElementById("textarea") as HTMLDivElement;

textarea.focus();

function createTags(input: string) {
  const tags = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());

  tagsEl.innerHTML = "";

  tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.classList.add("tag");
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
}
textarea.addEventListener("keyup", (e) => {
  const target = e.target as HTMLTextAreaElement;
  createTags(target.value);

  if (e.key == "Enter") {
    setTimeout(() => {
      target.value = "";
    }, 10);

    randomSelect();
  }
});

function randomSelect() {
  const times = 30;
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    highlight(randomTag);

    setTimeout(() => {
      unHighlight(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlight(randomTag);
    }, 100);
  }, times * 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlight(tag: any) {
  tag.classList.add("highlight");
}

function unHighlight(tag: any) {
  tag.classList.remove("highlight");
}
