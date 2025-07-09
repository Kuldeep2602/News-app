# 📊 News App - Data Flow & Architecture Diagrams

## 🏗️ Application Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                           NEWS APP                              │
├─────────────────────────────────────────────────────────────────┤
│                    AUTHENTICATION LAYER                        │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │  Firebase Auth  │    │   User State    │                    │
│  │   - Login       │◄──►│   Management    │                    │
│  │   - Signup      │    │   - App.js      │                    │
│  │   - Logout      │    │   - useEffect   │                    │
│  └─────────────────┘    └─────────────────┘                    │
├─────────────────────────────────────────────────────────────────┤
│                      NAVIGATION LAYER                          │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │  Stack Navigator│    │ Drawer Navigator│                    │
│  │   - Auth Flow   │◄──►│   - Categories  │                    │
│  │   - Main App    │    │   - Home Screen │                    │
│  └─────────────────┘    └─────────────────┘                    │
├─────────────────────────────────────────────────────────────────┤
│                        SCREEN LAYER                            │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │   HomeScreen    │ │ CategoryScreen  │ │  LoginScreen    │   │
│  │   - Headlines   │ │ - Sports News   │ │ - Authentication│   │
│  │   - Top News    │ │ - Tech News     │ │ - Form Handling │   │
│  │   - API Calls   │ │ - Business etc. │ │ - Validation    │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                       COMPONENT LAYER                          │
│  ┌─────────────────────────────────────────────────────────────┤
│  │                     NewsCard                                │
│  │   - Article Image   - Title   - Description   - Author      │
│  │   - Reusable Component for all news displays                │
│  └─────────────────────────────────────────────────────────────┤
├─────────────────────────────────────────────────────────────────┤
│                          DATA LAYER                            │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │    NewsAPI      │◄──►│   Axios HTTP    │                    │
│  │   - Headlines   │    │   - GET Request │                    │
│  │   - Categories  │    │   - Error Handle│                    │
│  │   - Countries   │    │   - Response    │                    │
│  └─────────────────┘    └─────────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagram

### 1. App Initialization Flow
```
App Start
    ↓
Firebase Auth Check
    ↓
┌─────────────────┐    ┌─────────────────┐
│   User Exists   │    │  No User Found  │
│       ↓         │    │       ↓         │
│  HomeScreen     │    │  LoginScreen    │
│       ↓         │    │       ↓         │
│  Fetch News     │    │  Auth Process   │
│       ↓         │    │       ↓         │
│  Display News   │    │  Navigate Home  │
└─────────────────┘    └─────────────────┘
```

### 2. News Fetching Flow
```
Screen Component (HomeScreen/CategoryScreen)
    ↓
useEffect Hook Triggered
    ↓
fetchNews() Function Called
    ↓
┌─────────────────────────────────────┐
│  API URL Construction               │
│  https://newsapi.org/v2/            │
│  + endpoints + parameters           │
└─────────────────────────────────────┘
    ↓
Axios GET Request
    ↓
┌─────────────────┐    ┌─────────────────┐
│   Success       │    │     Error       │
│      ↓          │    │       ↓         │
│ setNews(data)   │    │ console.error() │
│      ↓          │    │       ↓         │
│ setLoading(false)│   │ Handle Gracefully│
└─────────────────┘    └─────────────────┘
    ↓
FlatList Renders NewsCard Components
    ↓
News Articles Displayed to User
```

### 3. Navigation Flow
```
Authenticated User
    ↓
Drawer Navigator Loaded
    ↓
┌─────────────────────────────────────────────────────────────┐
│                     Drawer Menu                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │    Home     │ │   Sports    │ │  Business   │  ...      │
│  │  (Default)  │ │ (Category)  │ │ (Category)  │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
    ↓
User Selects Category
    ↓
Navigation with Parameters
    ↓
CategoryScreen Receives {category: "sports"}
    ↓
Fetch Category-Specific News
    ↓
Display Filtered News Articles
```

## 🎯 Component Interaction Diagram

```
App.js (Root Component)
    │
    ├── Authentication State Management
    │   └── onAuthStateChanged Listener
    │
    └── Conditional Rendering
        │
        ├── User Authenticated
        │   └── DrawerNavigator
        │       ├── HomeScreen
        │       │   ├── fetchNews() → NewsAPI
        │       │   ├── FlatList
        │       │   └── NewsCard Components
        │       │
        │       └── CategoryScreen (Multiple Instances)
        │           ├── Route Parameters {category}
        │           ├── fetchNews(category) → NewsAPI
        │           ├── FlatList
        │           └── NewsCard Components
        │
        └── User Not Authenticated
            └── LoginScreen
                ├── Firebase Auth Methods
                ├── Form Handling
                └── Navigation to Home
```

## 📱 Screen Relationships

```
┌─────────────────┐
│  SplashScreen   │ (2.5s Timer)
│  (Lottie Anim)  │ ───────────────┐
└─────────────────┘                │
                                   ▼
┌─────────────────┐              ┌─────────────────┐
│   LoginScreen   │◄─────────────┤     App.js      │
│  - Email/Pass   │              │ (Auth Manager)  │
│  - Firebase     │              │                 │
│  - Validation   │              └─────────────────┘
└─────────────────┘                       │
        │                                 │ (Authenticated)
        │ (Login Success)                 ▼
        └─────────────────────────────────┐
                                         │
                                         ▼
                              ┌─────────────────┐
                              │ DrawerNavigator │
                              │                 │
                              └─────────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
        ▼                              ▼                              ▼
┌─────────────┐              ┌─────────────────┐            ┌─────────────────┐
│ HomeScreen  │              │ CategoryScreen  │            │ Other Categories│
│             │              │   (Sports)      │            │  (Business,     │
│ - Headlines │              │                 │            │   Tech, etc.)   │
│ - Top News  │              │ - Sports News   │            │                 │
│ - US News   │              │ - Category API  │            │ - Category APIs │
└─────────────┘              └─────────────────┘            └─────────────────┘
        │                              │                              │
        └──────────────────────────────┼──────────────────────────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │    NewsCard     │
                              │   (Component)   │
                              │                 │
                              │ - Image         │
                              │ - Title         │
                              │ - Description   │
                              │ - Author        │
                              └─────────────────┘
```

## 🔗 API Integration Flow

```
NewsAPI.org
     ↑
     │ HTTP GET Requests
     │
┌────┴────────────────────────────────────────────────────────┐
│                    Axios Client                             │
├─────────────────────────────────────────────────────────────┤
│                      Endpoints                              │
│  ┌─────────────────────────────────────────────────────────┤
│  │ 1. Top Headlines                                        │
│  │    /v2/top-headlines?country=us&apiKey=XXX              │
│  │    Used by: HomeScreen                                  │
│  │                                                         │
│  │ 2. Category Headlines                                   │
│  │    /v2/top-headlines?country=us&category=X&apiKey=XXX   │
│  │    Used by: CategoryScreen                              │
│  └─────────────────────────────────────────────────────────┤
├─────────────────────────────────────────────────────────────┤
│                   Response Processing                       │
│  ┌─────────────────────────────────────────────────────────┤
│  │ res.data.articles → Array of Article Objects           │
│  │                                                         │
│  │ Article Structure:                                      │
│  │ {                                                       │
│  │   title: "News Title",                                  │
│  │   description: "Article Description",                   │
│  │   urlToImage: "https://image-url.jpg",                  │
│  │   author: "Author Name",                                │
│  │   publishedAt: "2024-01-01T12:00:00Z",                  │
│  │   url: "https://full-article-url.com"                   │
│  │ }                                                       │
│  └─────────────────────────────────────────────────────────┤
└─────────────────────────────────────────────────────────────┘
     │
     ▼
React Native Components (HomeScreen/CategoryScreen)
     │
     ▼
State Management (useState)
     │
     ▼
FlatList Rendering
     │
     ▼
NewsCard Components Display
```

## 🎨 Component Hierarchy

```
App
└── NavigationContainer
    └── Stack.Navigator
        ├── LoginScreen (if not authenticated)
        └── DrawerNavigator (if authenticated)
            ├── HomeScreen
            │   ├── Header (Title + Logout)
            │   ├── ActivityIndicator (Loading)
            │   └── FlatList
            │       └── NewsCard (Multiple instances)
            │           ├── Image
            │           ├── Title Text
            │           ├── Description Text
            │           └── Author Text
            │
            ├── CategoryScreen (Sports)
            │   ├── Category Title
            │   ├── ActivityIndicator (Loading)
            │   └── FlatList
            │       └── NewsCard (Multiple instances)
            │
            ├── CategoryScreen (Business)
            ├── CategoryScreen (Technology)
            ├── CategoryScreen (Science)
            ├── CategoryScreen (Health)
            └── CategoryScreen (Entertainment)
```

This visual documentation shows exactly how data flows through the application, how components interact with each other, and how the API integration works to fetch and display news in different components.