/**
 * Created by ggoma on 2017. 4. 5..
 */
import React, {Component} from 'react';
import {
    Animated,
    View,
    Easing,
    Dimensions,
    Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
const AnimatedIcon = Animated.createAnimatedComponent(Icon)

const {width, height} = Dimensions.get('window');

export default class HeartAnimatedView extends Component {

    state = {
        size: new Animated.Value(0),
        opacity: new Animated.Value(0)
    };

    animate() {
        this.setState({size: new Animated.Value(0), opacity: new Animated.Value(1)}, () => {
            Animated.sequence([
                Animated.timing(
                    this.state.size,
                    {
                        toValue: 120,
                        duration: 300,
                        easing: Easing.bounce
                    }
                ),
                Animated.delay(500),
                Animated.timing(
                    this.state.opacity,
                    {
                        toValue: 0,
                    }
                )
            ]).start();
        })
    }

    render () {
        const {childView} = this.props;
        const {size, opacity} = this.state;
        return (
            <View>
                {childView}
                <View style={{width, height, position: 'absolute', left: 0, top: 0,
                backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                    <AnimatedIcon name='ios-heart' color={'white'} style={{fontSize: size, opacity}}/>
                </View>
            </View>
        )
    }
}