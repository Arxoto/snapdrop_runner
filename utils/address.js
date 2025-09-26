// const os = require('os');
import os from 'os';

function getAddressList() {
    let result = [];
    const interfaces = os.networkInterfaces();

    for (const devName in interfaces) {
        if (!Object.hasOwn(interfaces, devName)) continue;
        const iface = interfaces[devName];

        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];

            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                result.push(alias.address);
            }
        }
    }

    return result;
}

export { getAddressList };
