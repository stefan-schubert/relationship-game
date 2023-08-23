import { challenges, wrong, prefix } from './constants.js';

const validUrls = [...challenges, wrong].map((i) => `${prefix}${i}.png`);

customElements.define(
  'test-code',
  class TestCode extends HTMLElement {
    constructor() {
      super();

      this.scanner = new Html5Qrcode('reader');
      this.init();
    }

    async init() {
      this.querySelector('[data-toggle]').addEventListener('click', () => {
        this.scanner.resume();
        this.querySelector('[data-scanner]').hidden = false;
        this.querySelector('[data-toggle]').hidden = true;
        this.querySelector('[data-result]').hidden = true;
      });
      try {
        await this.scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          this.render.bind(this)
        );
      } catch {
        // ignore
      }
    }

    render(decodedText) {
      const [url] = decodedText.split('?');
      if (validUrls.includes(url)) {
        this.scanner.pause(true);
        this.querySelector('[data-scanner]').hidden = true;
        this.querySelector('[data-toggle]').hidden = false;
        const resultCnt = this.querySelector('[data-result]');
        resultCnt.innerHTML = `<img style="width:100%;object-fit: cover;" src="${decodedText}">`;
        resultCnt.hidden = false;
      }
    }
  }
);
