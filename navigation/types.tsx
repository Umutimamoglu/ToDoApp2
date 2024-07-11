// @react-navigation/native ve @react-navigation/native-stack modüllerinden gerekli tipleri içe aktarıyoruz.
import { CompositeNavigationProp, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

// AuthStackParamList tipi, kimlik doğrulama (auth) akışı için kullanılacak ekranları tanımlar.
// Welcome, SignIn ve SignUp ekranları herhangi bir parametre almaz.
export type AuthStackParamList = {
    Welcome: undefined
    SignIn: undefined
    SignUp: undefined
}

// RootBottomTabParamList tipi, alt sekme navigasyonu (tab navigation) için kullanılacak ekranları tanımlar.
// HomeStack ve CategoriesStack ekranları kendi parametre listelerini alırken,
// Today ve Completed ekranları herhangi bir parametre almaz.
export type RootBottomTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamlist>
    Today: undefined
    Completed: undefined
    CategoriesStack: NavigatorScreenParams<CategoriesStackParamList>
}

// HomeStackParamlist tipi, ana ekran (home) yığını (stack) için kullanılacak ekranları tanımlar.
// Home ve EditTask ekranları herhangi bir parametre almaz.
export type HomeStackParamlist = {
    Home: undefined
    EditTask: undefined
}

// CategoriesStackParamList tipi, kategoriler yığını (stack) için kullanılacak ekranları tanımlar.
// Categories ekranı herhangi bir parametre almazken,
// Category ekranı bir id parametresi alır.
// CreateCategory ekranı ise isteğe bağlı bir id parametresi alır.
export type CategoriesStackParamList = {
    Categories: undefined
    Category: {
        id: string
    }
    CreateCategory: {
        id?: string
    }
}

// AppStackParamList tipi, uygulamanın genel yığını (stack) için kullanılacak ekranları tanımlar.
// Root ekranı kendi alt sekme parametre listesini alırken,
// Settings ekranı herhangi bir parametre almaz.
export type AppStackParamList = {
    Root: NavigatorScreenParams<RootBottomTabParamList>
    Settings: undefined
}

// RootStackParamList tipi, en üst düzey yığını (stack) için kullanılacak ekranları tanımlar.
// AppStack ve AuthStack ekranları kendi parametre listelerini alır.
export type RootStackParamList = {
    AppStack: NavigatorScreenParams<AppStackParamList>
    AuthStack: NavigatorScreenParams<AuthStackParamList>
}

// ReactNavigation namespace'ini genişleterek, global olarak kullanılacak RootParamList'i tanımlıyoruz.
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

// AuthScreenNavigationType tipi, kimlik doğrulama ekranlarının navigasyon tiplerini tanımlar.
// Bu, CompositeNavigationProp kullanarak iki farklı navigasyon tipini birleştirir:
// 1. AuthStackParamList için NativeStackNavigationProp
// 2. AppStackParamList içindeki "Root" için NativeStackNavigationProp
export type AuthScreenNavigationType<
    RouteName extends keyof AuthStackParamList
> = CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList, RouteName>,
    NativeStackNavigationProp<AppStackParamList, "Root">
>

export type CategoriesNavigationType =
    NativeStackNavigationProp<CategoriesStackParamList>