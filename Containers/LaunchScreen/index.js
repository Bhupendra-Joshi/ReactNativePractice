import React, { Component } from 'react';
import {
    SafeAreaView,
    Animated,
    Easing,
} from 'react-native';

import styles from './style'


export default class LaunchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rotate: new Animated.Value(0),
            // value: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.spin(1);
    }

    spin = (value) => {
        Animated.timing(
            this.state.rotate,
            {
                toValue: value,
                easing: Easing.linear,
                duration: 1000,
                useNativeDriver: true,
            }
        ).start((animation) => {
            console.log(animation.finished, value);
            if (animation.finished) {
                this.setState({
                    rotate: new Animated.Value(0),
                })
                this.spin(1);
            }
        });
    }

    render() {
        const {
            value,
            rotate,
        } = this.state;

        var rotateProp = rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"]
        })

        return (
            <SafeAreaView style={styles.container}>
                <Animated.Image
                    style={{
                        height: 200,
                        width: 200,
                        transform: [
                            // { scale: this.state.scale },
                            // { rotateY: rotateProp },
                            // { rotateY: rotateProp },
                            { rotate: rotateProp },
                            { perspective: 2 }, // without this line this Animation will not render on Android while working fine on iOS
                        ],
                    }}

                    source={require('../../assets/images/Loader_Fixed_01.png')} />
            </SafeAreaView>
        );
    }
}
