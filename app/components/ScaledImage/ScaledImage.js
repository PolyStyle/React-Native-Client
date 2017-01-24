import React, { PropTypes, Component } from 'react'
import { Text, Image, View, Dimensions } from 'react-native'
const { height,width } = Dimensions.get('window');

class ScaledImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }
  static propTypes = {
    styles: PropTypes.string,
    id: PropTypes.number,
    width: PropTypes.number,
  }


  componentDidMount() {
    console.log(this.props.id && this.props.width);
    if (this.props.id && this.props.width) {
      this.renderImage(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id && nextProps.width) {
      if (nextProps.id !== this.props.id) {
        this.renderImage(nextProps);
      }
    }
  }

  renderImage(props) {
    const url = `http://localhost:3000/images/${props.id}/${props.width}`;
    const fetchImage = fetch(url);
    const self = this;
    fetchImage.then((response) => response.json())
      .then((responseJson) => {
        
        const pictureWidth = responseJson.width;
        const pictureHeight = responseJson.height;
        const pictureRatio = pictureHeight/pictureWidth;

        self.setState({
          url: responseJson.url,
          width: width,
          height: width*pictureRatio,
        });
      })
  }





  render() {
    if(this.state.url){
      return (
          <Image  style={{width: this.state.width, height: this.state.height}} className={this.props.styles} source={{uri:this.state.url}} />
      );
    }
    return (<Text>Loading</Text>)
  }
}

export default ScaledImage