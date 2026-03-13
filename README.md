# 🌟 Lumiq — Daily Knowledge App

> *One thing. Every day.*

A beautifully crafted mobile app that delivers one mind-expanding fact per day across 5 categories. Swipe right to save, swipe left to skip, build your streak, and grow your personal knowledge library.

---

## ✨ Features

- **Daily Fact Card** — one curated fact per day, swipeable with spring physics
- **50 hand-written facts** across Science, History, Philosophy, Tech & Psychology  
- **Swipe to save / skip** — gesture-driven with tilt animation and colour overlays
- **Saved Library** — masonry grid with category filters and detail bottom sheet
- **Streak tracking** — animated SVG ring that draws itself on mount
- **12-week heatmap** — GitHub-style activity calendar
- **Achievements** — 5 unlockable badges
- **Floating Tab Bar** — pill-shaped, raised centre button, amber glow when active
- **Particle background** — 40+ twinkling stars + 4 ambient floating orbs
- **Onboarding** — animated category picker with stagger bounce-in chips
- **AsyncStorage persistence** — all data stored locally, no backend needed

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Expo | ~52.0.0 | App framework |
| Expo Router | ~4.0.0 | File-based navigation |
| NativeWind | ^4.1.23 | Tailwind CSS styling |
| React Native Reanimated | ~3.16.0 | Animations & gestures |
| React Native Gesture Handler | ~2.20.0 | Swipe gestures |
| React Native SVG | 15.8.0 | Streak ring |
| AsyncStorage | ^2.1.0 | Local data persistence |
| Expo Linear Gradient | ~14.0.0 | Card & button gradients |
| Expo Haptics | ~14.0.0 | Touch feedback |

---

## 📁 Project Structure

```
lumiq/
├── app/
│   ├── _layout.tsx                  # Root: fonts, gesture handler, safe area
│   ├── index.tsx                    # Entry: onboarding check → redirect
│   ├── (onboarding)/
│   │   └── index.tsx                # Category picker with stagger animations
│   └── (tabs)/
│       ├── _layout.tsx              # Tab navigator with FloatingTabBar
│       ├── today.tsx                # Swipeable daily fact card
│       ├── saved.tsx                # Saved facts grid + category filters
│       └── streak.tsx               # Streak ring + heatmap + achievements
│
├── components/
│   ├── FactCard.tsx                 # Core swipeable card with gesture physics
│   ├── CategoryChip.tsx             # Animated interest category pill
│   ├── FloatingTabBar.tsx           # Pill-shaped floating nav with raised centre
│   ├── ParticleBackground.tsx       # Stars + ambient orb animations
│   ├── StreakRing.tsx               # SVG animated ring with gradient stroke
│   └── HeatmapCalendar.tsx         # 12-week activity grid
│
├── hooks/
│   ├── useFacts.ts                  # Daily fact selection + queue
│   ├── useSaved.ts                  # Save/remove/toggle facts
│   └── useStreak.ts                 # Streak + activity + total lessons
│
├── data/
│   └── facts.ts                     # 50 facts × 5 categories
│
├── constants/
│   ├── colors.ts                    # Design tokens
│   └── categories.ts                # Category metadata
│
└── utils/
    └── storage.ts                   # AsyncStorage CRUD helpers
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- iOS: Xcode (Mac) or Expo Go app
- Android: Android Studio or Expo Go app

### 1. Install dependencies

```bash
cd lumiq
npm install
```

### 2. Start the development server

```bash
npx expo start
```

### 3. Run on your device

```bash
# iOS Simulator (Mac only)
npx expo start --ios

# Android Emulator
npx expo start --android

# Physical device
# Scan the QR code with the Expo Go app
```

---

## 🎨 Design System

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| `bg.primary` | `#0A0E1A` | Main background |
| `bg.elevated` | `#161D2E` | Cards, modals, sheets |
| `amber.DEFAULT` | `#F5A623` | Brand accent, active states |
| `cat-science` | `#F5A623` | Science category |
| `cat-history` | `#2DD4BF` | History category |
| `cat-philosophy` | `#A78BFA` | Philosophy category |
| `cat-tech` | `#60A5FA` | Tech category |
| `cat-psychology` | `#F472B6` | Psychology category |
| `text.primary` | `#F0F4FF` | Main text |
| `text.secondary` | `#8892A4` | Muted text |
| `save` | `#34D399` | Swipe right overlay |
| `skip` | `#F87171` | Swipe left overlay |

### Typography

- **Display / Titles**: Playfair Display 700 Bold (serif)
- **Display Italic**: Playfair Display 700 Bold Italic
- **Body / UI**: DM Sans 400 Regular
- **Labels / Buttons**: DM Sans 500 Medium, 700 Bold

---

## 💫 Animation Moments

| Interaction | Implementation |
|-------------|---------------|
| App launch | Particle orbs fade in, stars pulse |
| Onboarding entrance | Logo → title → subtitle → chips stagger |
| Category chips | Staggered spring bounce-in (90ms delay each) |
| Card entrance | Slide up + fade + scale from 0.94 |
| Swipe drag | Rotation interpolated ±14° from translateX |
| Save/skip overlay | Opacity interpolated from drag distance |
| Card exit | Spring fly-out with gesture velocity |
| Streak ring | SVG stroke draws on mount (1.6s ease-out) |
| Tab switch | Active pill amber glow + dot indicator |
| Achievement cards | Staggered FadeInDown |

---

## ➕ Adding More Facts

Edit `data/facts.ts` — add an object to the `FACTS` array:

```typescript
{
  id: "sci-011",           // Unique ID: category prefix + number
  category: "science",     // "science" | "history" | "philosophy" | "tech" | "psychology"
  title: "Your Title Here",
  body: "2–3 sentences describing the fact in an engaging, editorial tone.",
  readTime: 3,             // Estimated minutes to read
}
```

---

## 📦 Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli
eas login

# Configure project
eas build:configure

# Build preview APK (Android)
eas build --platform android --profile preview

# Build for App Store (iOS)
eas build --platform ios --profile production

# Build for both
eas build --platform all --profile production
```

---

## 🔮 Future Ideas

- [ ] AI-generated daily facts via Anthropic API
- [ ] Daily reminder notifications at chosen time
- [ ] Fact sharing (screenshot card export)
- [ ] Collections / folders in Saved
- [ ] Offline mode with cached fact batches
- [ ] User accounts with cloud sync
- [ ] More categories: Art, Space, Economics

---

Built with ❤️ — *Lumiq. One thing. Every day.*
