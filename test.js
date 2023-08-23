customElements.define(
  'test-code',
  class TestCode extends HTMLElement {
    constructor() {
      super();

      new Html5QrcodeScanner('qr-reader', { fps: 10, qrbox: 250 }).render(
        this.onSuccess.bind(this)
      );
    }

    onSuccess(decodedText, decodedResult) {
      this.querySelector('[data-result]').textContent = decodedText;
    }
  }
);
