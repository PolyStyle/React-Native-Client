import React, { Component } from 'react';
import {
  Animated,
  View,
} from 'react-native';

class FadeInImage extends Component {
  static propTypes = {
    source: React.PropTypes.object.isRequired,
    style: React.PropTypes.any,
  };

  static defaultProps = {
    style: {},
  };

  constructor() {
    super();

    this.onLoad = this.onLoad.bind(this);

    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  onLoad() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 250,
    }).start();
  }

  render() {
    const style = [this.props.style, { opacity: this.state.opacity}];

    return (
        <Animated.Image
          style={style}
          source={this.props.source}
          onLoad={this.onLoad}
        />
    );
  }
}

export default FadeInImage;
