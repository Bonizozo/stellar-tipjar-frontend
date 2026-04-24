# Stellar Tip Jar — Mobile App

React Native (Expo) mobile app for iOS and Android.

## Setup

```bash
cd mobile
npm install
npm start        # Expo dev server
npm run ios      # iOS simulator
npm run android  # Android emulator
```

## Structure

```
mobile/
  App.tsx                        # Entry point
  src/
    navigation/AppNavigator.tsx  # Stack navigator
    screens/
      HomeScreen.tsx             # Landing / hero
      ExploreScreen.tsx          # Browse creators
      CreatorScreen.tsx          # Creator profile
      TipScreen.tsx              # Send a tip
```

## Push Notifications

Uses `expo-notifications`. Request permission on first launch and handle incoming tip alerts.

## Wallet Integration

Wallet connection is prepared via the `Tip` screen flow. Native wallet deep-link support can be added via `expo-linking`.
