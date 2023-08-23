const challenges = [
  '01_treppenhaus',
  '02_flur',
  '03_toiletten',
  '04_kueche',
  '05_lounge',
  '06_maxi_kids',
  '07_midi_kids',
  '08_saal',
];
const prefix =
  `${window.location.origin}/relationship-game/challenges/`;

customElements.define(
  'qr-codes',
  class QRCodes extends HTMLElement {
    constructor() {
      super();

      let content = '';
      challenges.forEach(async (c) => {
        const svg = await QRCode.toString(`${prefix}${c}.png`);
        const dataUrl = await QRCode.toDataURL(`${prefix}${c}.png`);
        content += `
        <div style="display: flex; justify-content: space-between;">
            <div style="width:50%;"><img style="width:100%;object-fit: cover;" src="../challenges/${c}.png"></div>
            <div style="width:50%;">
                ${svg}
                <div style="display: flex; justify-content: center;">
                    <a style="margin-right:30px" href="${dataUrl}" download="${c}_qr_code.png">Download als .png</a>
                    <a href="data:image/svg+xml;base64,${btoa(svg)}" download="${c}_qr_code.svg">Download als .svg</a>
                </div>
            </div>
        </div>
        `;
        this.innerHTML = content;
      });
    }
  }
);
