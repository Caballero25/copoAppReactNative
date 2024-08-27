import { View, StyleSheet } from "react-native";
import { ReactNode } from "react";

export function Screen({ children }: { children: ReactNode }) {
  return <View style={styles.screenContainer}>{children}</View>;
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        paddingTop: 4,
        paddingLeft: 4,
        paddingRight: 4,
        alignItems: "center",
    }
})