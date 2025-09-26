import { toString } from 'qrcode';

function printQrcode(s) {
    toString(s, { type: 'terminal' }, (err, str) => {
        if (err) throw err;
        console.log(str);
    });
}

export { printQrcode };
