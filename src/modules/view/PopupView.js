class PopupView {
    popupAndDim = document.getElementById("popup-and-dim");

      #createDom() {
        const popupDiv = document.createElement("div");
        popupDiv.classList.add("popup");
        popupDiv.setAttribute("id", "popup");

        const popupForm = document.createElement("form");
        popupForm.classList.add("popup-form");
        popupDiv.appendChild(popupForm);

        popupForm.appendChild(this.#createPopupNameAndDescr());
      }

      #createPopupNameAndDescr() {
        const div = document.createElement("div");
        div.classList.append("popup-name-descr");

        const input = document.createElement("input");
        input.classList.add("popup-name");
        input.setAttribute("type", "text");
        input.setAttribute("value", "Text Task 1");
        div.appendChild(input);

        const textArea = document.createElement("textarea");
        textArea.classList.append("popup-descr");
        textArea.textContent="Test Task 1";
      }

      render() {
        this.popupAndDim.innerHTML = "";
        this.popupAndDim.appendChild(this.#createDom());
      }
}

export default PopupView;