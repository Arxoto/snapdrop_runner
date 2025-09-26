# snapdrop_runner

## How To Build

use [gitwarp](https://www.gitwarp.com/) if cannot visit GitHub

```shell
git clone https://github.com/Arxoto/snapdrop_runner.git # or use gitwarp

cd ./snapdrop_runner
pnpm install

cd ./snapdrop
git clone https://github.com/SnapDrop/snapdrop.git # or use gitwarp

cd ../
npm start # try run first time
```

## How To Run

```shell
export NOT_QRCODE=1 # donot print url qr_code
node ./snapdrop_runner/index.cjs # see npm start script
```

## P.S.

依赖项目 SnapDrop `git submodule add git@github.com:SnapDrop/snapdrop.git`
