import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const firebaseConfig = {
  apiKey: "AIzaSyCI5mONAceyFiplibqtwGg_7q8H6VcwTSM",
  authDomain: "hello-chat-e0586.firebaseapp.com",
  projectId: "hello-chat-e0586",
  storageBucket: "hello-chat-e0586.appspot.com",
  messagingSenderId: "599946540113",
  appId: "1:599946540113:web:14e42df1e7defbc6163470",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const connectionStatus = useNetInfo();  // Network connection status using useNetInfo hook
  
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start' screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name='Start' component={Start} options={{ headerShown: false }} />
        <Stack.Screen name="Chat">
          {(props) => (<Chat isConnected={connectionStatus.isConnected} db={db} {...props} />)}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;