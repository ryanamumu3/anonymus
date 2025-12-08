import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// 🚀 Import correto do Supabase

// Telas do App
import Dashboard from "./telas/Dashboard";
import Formulario from "./telas/Formulario";
import LoginUser from "./telas/LoginUser";
import RegisterUser from "./telas/RegisterUser";

import Denuncias from "./telas/Denuncias";
import Feedback from "./telas/Feedback";
import LoginEscola from "./telas/LoginEscola";
import PainelEscola from "./telas/PainelEscola";

import Admin from "./telas/Admin";

const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{headerShown:false}} 
        initialRouteName="LoginUser"
      >

        {/* 🔥 Inicio do app */}
        <Stack.Screen name="LoginUser" component={LoginUser}/>
        <Stack.Screen name="RegisterUser" component={RegisterUser}/>

        {/* Usuário comum */}
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Formulario" component={Formulario}/>

        {/* Sistema Escola */}
        <Stack.Screen name="LoginEscola" component={LoginEscola}/>
        <Stack.Screen name="PainelEscola" component={PainelEscola}/>
        <Stack.Screen name="Feedback" component={Feedback}/>
        <Stack.Screen name="Denuncias" component={Denuncias}/>

        {/* Admin */}
        <Stack.Screen name="Admin" component={Admin}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
