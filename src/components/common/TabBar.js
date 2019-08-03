import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    SafeAreaView
} from "react-native";
import posed from "react-native-pose";
import LinearGradient from "react-native-linear-gradient";

const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 5;
const SpotLight = posed.View({
    route0: {x: 0},
    route1: {x: tabWidth},
    route2: {x: tabWidth * 2},
    route3: {x: tabWidth * 3},
    route4: {x: tabWidth * 4}
});

const Scaler = posed.View({
    active: {scale: 1.25},
    inactive: {scale: 1}
});

const S = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 65,
        elevation: 2,
        alignItems: "center"
    },
    tabButton: {flex: 1},
    spotLight: {
        width: tabWidth,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    spotLightInner: {
        width: tabWidth,
        height: "70%",
        borderRadius: 24
    },
    scaler: {flex: 1, alignItems: "center", justifyContent: "center"}
});

const TabBar = props => {
    const {
        renderIcon,
        activeTintColor,
        inactiveTintColor,
        onTabPress,
        onTabLongPress,
        getAccessibilityLabel,
        navigation
    } = props;

    const {routes, index: activeRouteIndex} = navigation.state;

    return (
        <SafeAreaView>
            <View style={S.container}>
                <View style={StyleSheet.absoluteFillObject}>
                    <SpotLight style={S.spotLight} pose={`route${activeRouteIndex}`}>
                        <LinearGradient colors={['#E26800', '#E00000']} style={S.spotLightInner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                            <View style={S.spotLightInner}/>
                        </LinearGradient>
                    </SpotLight>
                </View>

                {routes.map((route, routeIndex) => {
                    const isRouteActive = routeIndex === activeRouteIndex;
                    const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

                    return (
                        <TouchableOpacity
                            key={routeIndex}
                            style={S.tabButton}
                            onPress={() => {
                                onTabPress({route});
                            }}
                            onLongPress={() => {
                                onTabLongPress({route});
                            }}
                            accessibilityLabel={getAccessibilityLabel({route})}
                        >
                            <Scaler
                                pose={isRouteActive ? "active" : "inactive"}
                                style={S.scaler}
                            >
                                {renderIcon({route, focused: isRouteActive, tintColor})}
                            </Scaler>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
};

export default TabBar;