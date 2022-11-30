# rn-ui-replicate

![ios](https://user-images.githubusercontent.com/1001563/204782427-c98eec09-d13f-4c5a-8651-fc0b2cf26601.gif)
![android](https://user-images.githubusercontent.com/1001563/204782607-d03554f9-8f47-4955-97cc-fae3bd73dfe4.gif)


### What's used
- React Native 0.70.6
- Typescript
- [Tailwind](https://tailwindcss.com/) via [Nativewind](https://www.nativewind.dev/)
- [Reanimated v2](https://docs.swmansion.com/react-native-reanimated/)
- [React Navigation](https://reactnavigation.org/)
- [react-native-bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/)
- [Zustand](https://zustand-demo.pmnd.rs/) for state management

## How to run
install react-native depedencies first with
`yarn install`

#### Run specific platform
##### Android
- Debug mode
`yarn android`
- Release mode
`yarn android --variant=release`
- create apk through gradle
move to android dir first: `cd android`
create debug apk: `./gradlew assembleDebug`
create release apk: `./gradlew assembleRelease`
- create aab for playstore
`./gradlew bundleRelease`


##### IOS
- Run this command one-by-one in project root to install ios depedencies
`bundle install`
`npx pod-install`
- Debug config
`yarn ios`
- Release config
`yarn ios --configuration Release`
