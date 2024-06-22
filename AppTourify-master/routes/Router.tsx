import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import useAuth from "../hooks/useAuth";

function Router() {
  const demo = useAuth(); // Utilizamos el hook useAuth para obtener el estado de autenticación

    return (
        <NavigationContainer>
        {demo.user != undefined ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default Router;