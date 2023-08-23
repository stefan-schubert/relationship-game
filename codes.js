import { challenges, wrong, prefix } from '.constants.js';

customElements.define(
  'qr-codes',
  class QRCodes extends HTMLElement {
    constructor() {
      super();

      this.init();
    }

    async init() {
      for (let c of challenges) {
        const svg = await QRCode.toString(`${prefix}${c}.png`);
        const dataUrl = await QRCode.toDataURL(`${prefix}${c}.png`);
        this.innerHTML += `
          <div style="display: flex; justify-content: space-between;">
            <div style="width:50%;">
              <img style="width:100%;object-fit: cover;" src="./challenges/${c}.png">
            </div>
            <div style="width:50%;">
              <h4 style="text-align: center;">${c}</h4>
              ${svg}
              <div style="display: flex; justify-content: center;">
                <a style="margin-right:30px" href="${dataUrl}" download="${c}_qr_code.png">Download als .png</a>
                <a href="data:image/svg+xml;base64,${btoa(
                  svg
                )}" download="${c}_qr_code.svg">Download als .svg</a>
              </div>
            </div>
          </div>
        `;
      }

      this.innerHTML += `
        <div style="display: flex; justify-content: space-between;">
          <div style="width:50%;">
            <img style="width:100%;object-fit: cover;" src="./challenges/${wrong}.png">
          </div>
          <div style="width:50%;">
            <h4 style="text-align: center;">${wrong}</h4>
            <div data-svg-container style="width: 100%;"></div>
            <div style="display: flex; justify-content: center;">
                <a data-wrong-png style="margin-right:30px" href="" download="${wrong}_qr_code.png">Download als .png</a>
                <a data-wrong-svg style="margin-right:30px" href="" download="${wrong}_qr_code.svg">Download als .svg</a>
                <a data-generate href="">Neu generieren</a>
            </div>
          </div>
        </div>
      `;
      await this.regenerate();

      this.querySelector('[data-generate]').addEventListener(
        'click',
        async (event) => {
          event.preventDefault();
          await this.regenerate();
        }
      );
    }

    async regenerate() {
      const now = Date.now();
      const svg = await QRCode.toString(`${prefix}${wrong}.png?${now}`);
      const dataUrl = await QRCode.toDataURL(`${prefix}${wrong}.png?${now}`);
      this.querySelector('[data-svg-container]').innerHTML = svg;
      this.querySelector('[data-wrong-png]').href = dataUrl;
      this.querySelector(
        '[data-wrong-svg]'
      ).href = `data:image/svg+xml;base64,${btoa(svg)}`;
    }
  }
);
