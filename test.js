import { challenges, wrong, prefix } from './constants.js';

const validUrls = [...challenges, wrong].map((i) => `${prefix}${i}.png`);

customElements.define(
  'test-code',
  class TestCode extends HTMLElement {
    constructor() {
      super();

      this.init();
    }

    async init() {
      //   const devices = await Html5Qrcode.getCameras();
      //   const device =
      //     devices.find((d) => d.label.toLowerCase().includes('back')) ??
      //     devices[devices.length - 1];
      this.querySelector('[data-toggle]').addEventListener('click', () => {
        this.querySelector('#reader').hidden = false;
        this.querySelector('[data-toggle]').hidden = true;
        this.querySelector('[data-result]').hidden = true;
      });
      try {
        await new Html5Qrcode('reader').start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          this.render.bind(this)
        );
      } catch {
        this.render(`${window.location.origin}/challenges/leider_falsch.png`);
      }
    }

    render(decodedText) {
      const [url] = decodedText.split('?');
      if (validUrls.includes(url)) {
        this.querySelector('#reader').hidden = true;
        this.querySelector('[data-toggle]').hidden = false;
        const resultCnt = this.querySelector('[data-result]');
        resultCnt.innerHTML = `<img style="width:100%;object-fit: cover;" src="${decodedText}">`;
        resultCnt.hidden = false;
      }
    }
  }
);
