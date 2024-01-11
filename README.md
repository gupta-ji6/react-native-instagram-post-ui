# react-native-instagram-post-ui

An attempt to recreate the instagram feed post item UI in `react-native` with `react-native-reanimated` animations.

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
</p>

## Features

### 1. ❤️ Double Tap to Like

https://github.com/gupta-ji6/react-native-instagram-post-ui/assets/21218732/36e3be19-c9cf-433a-b9fe-5d1d016c2da4

- [x] handle both single & double tap
- [x] scale with spring
- [ ] rotate while scaling (currently it rotates after scaling)
- [x] rotation angle should be random
- [x] translate to top after scale & rotate

### 2. 🏷️ Show Tags on Single Tap

https://github.com/gupta-ji6/react-native-instagram-post-ui/assets/21218732/755b1051-21d2-454b-b430-485f97c7ff4e

- [x] show user icon at bottom left on single tap
- [x] show multiple user tags on single tap
- [x] animate tags & icon opacity
- [ ] add arrow in tags component

## Contributing

> [!NOTE]
> The project was created with command `npx create-expo-app@latest react-native-instagram-post-ui -e with-reanimated`

- Run `yarn` or `npm install`
- Run `yarn start` or `npm run start` to try it out.

## 📝 Notes

- [`react-native-reanimated` docs](https://docs.swmansion.com/react-native-reanimated/)
