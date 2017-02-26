import React, { PropTypes, Component } from 'react'
import { Text, Image, View, Dimensions, PixelRatio } from 'react-native'
const { height,width } = Dimensions.get('window');

class ScaledImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      debug: 'init',
    };
  }
  static defaultProps = {
    styles: {}
  }


  static propTypes = {
    id: PropTypes.number,
    width: PropTypes.number,
  }

  componentDidMount() {
        this.setState({
          debug: this.state.debug + ' DM{'+this.props.id+','+this.props.width+'}'
        });
    if (this.props.id && this.props.width) {
      this.renderImage(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
          debug: this.state.debug + ' RP:{'+nextProps.id+','+nextProps.width+'}'
        });
    if (nextProps.id && nextProps.width) {
      if (nextProps.id !== this.props.id) {
        this.renderImage(nextProps);
      }
    }
  }

  renderImage(props) {
    const postRetinaWidth = Math.floor(props.width * PixelRatio.get());
    const url = 'http://192.168.0.5:3000/images/' + props.id +'/' + postRetinaWidth ;
    const self = this;
        this.setState({
          debug: this.state.debug + ' REQ{'+props.id+','+props.width+'}'
        });
    fetch(url,{method: 'GET'}).then((response) => {
        self.setState({
          debug: this.state.debug + ' RES{'+props.id+','+props.width+'}'
        });
        return response.json()
        }
      )
      .then((responseJson) => {
        const pictureWidth = responseJson.width;
        const pictureHeight = responseJson.height;
        const pictureRatio = pictureHeight/pictureWidth;

        self.setState({
          url: responseJson.url,
          width: props.width,
          height: props.width*pictureRatio,
          debug: this.state.debug + ' RV '
        });
      })
  }





  render() {
    if(this.state.url){
      return (
          <Image
            shouldRasterizeIOS={true}
            renderToHardwareTextureAndroid={true}
            style={[{'width': this.state.width, 'height': this.state.height},this.props.styles]}
            source={{uri:this.state.url}}
          />
      );
    }
    return (<Text style={{color: '#ffffff'}}>Loading {this.props.width} {this.props.id} {this.state.debug}</Text>)
  }
}

export default ScaledImage
