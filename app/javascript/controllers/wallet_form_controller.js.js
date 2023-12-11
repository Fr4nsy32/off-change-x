import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    const nameInput = this.element.querySelector('[name="wallet[name]"]');
    nameInput.addEventListener("input", this.updateCode.bind(this));
  }

  updateCode(event) {
    const currencyName = event.target.value;
    const codeInput = this.element.querySelector('[name="wallet[code]"]');
    const code = this.determineCode(currencyName);
    codeInput.value = code;
  }

  determineCode(currencyName) {
    
    return "CODE";
  }
}
