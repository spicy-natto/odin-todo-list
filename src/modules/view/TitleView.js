class TitleView {
  title = document.getElementById("filter-title");

  render({ name, description }) {
    this.title.innerHTML = "";

    const h1 = document.createElement("h1");
    h1.textContent = name;
    this.title.appendChild(h1);

    if (description) {
      const p = document.createElement("p");
      p.textContent = description;
      this.title.appendChild(p);
    }
  }
}

export default TitleView;
