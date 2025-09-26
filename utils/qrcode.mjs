import { toString as qrToString } from 'qrcode';

function printQrcode(s) {
    qrToString(s, { type: 'terminal' }, (err, str) => {
        if (err) throw err;
        console.log(str);
    });
}

export { printQrcode };
