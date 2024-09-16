import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import Favorites from "./screens/Favorites";
import User from "./screens/User";
import colors from "./utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import Options from "./screens/Options";
const Stack = createNativeStackNavigator();
const getTabBarIcon =
  (icon) =>
  ({ color }) =>
    <MaterialIcons name={icon} size={26} style={{ color }} />;

const ContactsScreens = () => (
  <Stack.Navigator
    initialRouteName="Contacts"
    screenOptions={{
      headerTintColor: "white",
      headerStyle: { backgroundColor: "tomato" },
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name="Contacts"
      component={Contacts}
      options={{ title: "Contacts" }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ route }) => {
        const { contact } = route.params;
        const { name } = contact;
        return {
          title: name.split(" ")[0],
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: colors.blue,
          },
        };
      }}
    />
  </Stack.Navigator>
);

const FavoritesScreens = () => (
  <Stack.Navigator
    initialRouteName="Favorites"
  >
    <Stack.Screen
      name="Favorites"
      component={Favorites}
      options={{ title: "Favorites" }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ title: "Profile" }}
    />
  </Stack.Navigator>
);

const UserScreens = ({ navigation }) => (
  <Stack.Navigator initialRouteName="User">
    <Stack.Screen
      name="User"
      component={User}
      options={{
        headerTitle: "Me",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: colors.blue,
        },
        headerRight: () => (
          <MaterialIcons
            name="settings"
            size={24}
            style={{ color: "white", marginRight: 10 }}
            onPress={() => navigation.navigate("Options")}
          />
        ),
      }}
    />
    <Stack.Screen
      name="Options"
      component={Options}
      options={{ title: "Options" }}
    />
  </Stack.Navigator>
);

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName="ContactsScreens"
      barStyle={{ backgroundColor: colors.blue }}
      labeled={false}
      activeTintColor={colors.greyLight}
      inactiveColor={colors.greyDark}
    >
      <Tab.Screen
        name="ContactsScreens"
        component={ContactsScreens}
        options={{
          tabBarIcon: getTabBarIcon("list"),
        }}
      />
      <Tab.Screen
        name="FavoritesScreens"
        component={FavoritesScreens}
        options={{
          tabBarIcon: getTabBarIcon("star"),
        }}
      />
      <Tab.Screen
        name="UserScreens"
        component={UserScreens}
        options={{
          tabBarIcon: getTabBarIcon("person"),
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default TabNavigator;
