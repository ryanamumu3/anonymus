import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Admin from "./Admin.js";
import Dashboard from "./Dashboard.js";
import Denuncias from "./Denuncias.js";
import Feedback from "./Feedback.js";
import Formulario from "./Formulario.js";
import LoginEscola from "./LoginEscola.js";
import PainelEscola from "./PainelEscola.js";

const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>

        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Formulario" component={Formulario}/>
        <Stack.Screen name="LoginEscola" component={LoginEscola}/>   
        <Stack.Screen name="PainelEscola" component={PainelEscola}/>
        <Stack.Screen name="Feedback" component={Feedback}/>
        <Stack.Screen name="Denuncias" component={Denuncias}/>
        <Stack.Screen name="Admin" component={Admin}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}
