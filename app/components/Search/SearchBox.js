import React, { Component, PropTypes } from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    TextInput,
    Animated,
    Dimensions,
    Keyboard,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get('window');
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const containerHeight = 50;
const contentWidth = width;
const middleHeight = 22;
const middleWidth = (width / 2) - 5;

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = { keyword: '' };

        /**
         * Animated values
         */
        this.iconSearchAnimated = new Animated.Value(middleWidth - 30);
        this.iconDeleteAnimated = new Animated.Value(0);
        this.inputFocusWidthAnimated = new Animated.Value(contentWidth - 20);
        this.inputFocusPlaceholderAnimated = new Animated.Value(middleWidth - 15);
        this.btnCancelAnimated = new Animated.Value(contentWidth);

        /**
         * functions
         */
        this.onFocus = this.onFocus.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.focus = this.focus.bind(this);
        this.expandAnimation = this.expandAnimation.bind(this);
        this.collapseAnimation = this.collapseAnimation.bind(this);

        /**
         * local variables
         */
        this.placeholder = this.props.placeholder || 'Search';
        this.cancelTitle = this.props.cancelTitle || 'Cancel';
    }

    /**
     * onSearch
     * async await
     */
    onSearch = async () => {
        this.props.beforeSearch && await this.props.beforeSearch(this.state.keyword);
        await Keyboard.dismiss();
        this.props.onSearch && await this.props.onSearch(this.state.keyword);
        this.props.afterSearch && await this.props.afterSearch(this.state.keyword);
    }

    /**
     * onChangeText
     * async await
     */
    onChangeText = async (text) => {
        await this.setState({ keyword: text });
        await new Promise((resolve, reject) => {
            Animated.timing(
                this.iconDeleteAnimated,
                {
                    toValue: (text.length > 0) ? 1 : 0,
                    duration: 200
                }
            ).start(() => resolve());
        });
        // IF THERE IS AN EXTERNAL HADLER, WAIT FOR state.jeyword
        this.props.onChangeText && await this.props.onChangeText(this.state.keyword);
    }

    /**
     * onFocus
     * async await
     */
    onFocus = async () => {
        this.props.beforeFocus && await this.props.beforeFocus();
        this.refs.input_keyword._component.isFocused && await this.refs.input_keyword._component.focus();
        await this.expandAnimation();
        this.props.onFocus && await this.props.onFocus(this.state.keyword);
        this.props.afterFocus && await this.props.afterFocus();
    }

    /**
     * focus
     * async await
     */
    focus = async (text = '') => {
        await this.setState({ keyword: text });
        await this.refs.input_keyword._component.focus();
    }

    /**
     * onDelete
     * async await
     */
    onDelete = async () => {
        this.props.beforeDelete && await this.props.beforeDelete();
        await new Promise((resolve, reject) => {
            Animated.timing(
                this.iconDeleteAnimated,
                {
                    toValue: 0,
                    duration: 200
                }
            ).start(() => resolve());
        });
        await this.setState({ keyword: '' });
        this.props.onDelete && await this.props.onDelete();
        this.props.afterDelete && await this.props.afterDelete();
    }

    /**
     * onCancel
     * async await
     */
    onCancel = async () => {
        this.props.beforeCancel && await this.props.beforeCancel();
        await this.setState({ keyword: '' });
        await this.collapseAnimation();
        this.props.onCancel && await this.props.onCancel();
        this.props.afterCancel && await this.props.afterCancel();
    }

    expandAnimation = () => {
        return new Promise((resolve, reject) => {
            Animated.parallel([
                Animated.timing(
                    this.inputFocusWidthAnimated,
                    {
                        toValue: contentWidth - 90,
                        duration: 100
                    }
                ).start(),
                Animated.timing(
                    this.btnCancelAnimated,
                    {
                        toValue: 10,
                        duration: 100
                    }
                ).start(),
                Animated.timing(
                    this.inputFocusPlaceholderAnimated,
                    {
                        toValue: 25,
                        duration: 100
                    }
                ).start(),
                Animated.timing(
                    this.iconSearchAnimated,
                    {
                        toValue: 10,
                        duration: 100
                    }
                ).start(),
                Animated.timing(
                    this.iconDeleteAnimated,
                    {
                        toValue: (this.state.keyword.length > 0) ? 1 : 0,
                        duration: 100
                    }
                ).start()
            ]);
            resolve();
        });
    }

    collapseAnimation = () => {
        return new Promise((resolve, reject) => {
            Animated.parallel([
                Keyboard.dismiss(),
                Animated.timing(
                    this.inputFocusWidthAnimated,
                    {
                        toValue: contentWidth - 20,
                        duration: 100
                    }
                ).start(),
                Animated.timing(
                    this.btnCancelAnimated,
                    {
                        toValue: contentWidth,
                        duration: 100
                    }
                ).start(),
                Animated.timing(
                    this.inputFocusPlaceholderAnimated,
                    {
                        toValue: middleWidth - 15,
                        duration: 100
                    }
                ).start(),
                Animated.timing(
                    this.iconSearchAnimated,
                    {
                        toValue: middleWidth - 30,
                        duration: 100
                    }
                ).start(),
                Animated.timing(
                    this.iconDeleteAnimated,
                    {
                        toValue: 0,
                        duration: 100
                    }
                ).start(),
            ]);
            resolve();
        });
    }

    render() {
        return (
            <Animated.View
                ref="searchContainer"
                style={
                    [
                        styles.container,
                        this.props.backgroundColor && { backgroundColor: this.props.backgroundColor }
                    ]}
            >
                <AnimatedTextInput
                    ref="input_keyword"
                    style={[
                        styles.input,
                        this.props.placeholderTextColor && { color: this.props.placeholderTextColor },
                        {
                            width: this.inputFocusWidthAnimated,
                            paddingLeft: this.inputFocusPlaceholderAnimated
                        }
                    ]}
                    value={this.state.keyword}
                    onChangeText={this.onChangeText}
                    placeholder={this.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor || styles.placeholderColor}
                    onSubmitEditing={this.onSearch}
                    autoCorrect={false}
                    blurOnSubmit={false}
                    returnKeyType={this.props.returnKeyType || 'search'}
                    keyboardType={this.props.keyboardType || 'default'}
                    onFocus={this.onFocus}
                    underlineColorAndroid="transparent"
                />
                <TouchableWithoutFeedback onPress={this.onFocus}>
                    <Animated.View

                        style={[
                            styles.iconSearch,
                            {
                                left: this.iconSearchAnimated,
                            }
                        ]}
                    >
                       <Icon
                        style={styles.icon}
                        name='ios-search'
                        size={20}
                        color={'#999'}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onDelete}>
                    <Animated.View
                        style={[
                            styles.iconDelete,
                            { opacity: this.iconDeleteAnimated }
                        ]}
                    >
                      <Icon
                        style={styles.icon}
                        name='ios-close-circle'
                        size={20}
                        color={'#999'}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onCancel}>
                    <Animated.View
                        style={[
                            styles.cancelButton,
                            { left: this.btnCancelAnimated }
                        ]}
                    >
                        <Text style={[styles.cancelButtonText, this.props.titleCancelColor && { color: this.props.titleCancelColor }]}>
                            {this.cancelTitle}
                        </Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Animated.View >
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#fff',
        height: containerHeight,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        overflow: 'hidden'
    },
    input: {

        fontFamily: 'AvenirNextLTW01RegularRegular',
        height: containerHeight - 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        borderColor: '#000',
        backgroundColor: '#f3f3f3',
        borderRadius: 4,
        fontSize: 13,
    },
    placeholderColor: 'grey',
    icon:{
      width: 30,
      backgroundColor: 'transparent'
    },
    iconSearch: {
        flex: 1,
        position: 'absolute',
        top: middleHeight - 7,
        marginLeft: 4,
        height: 20,
        width: 20,
    },
    iconDelete: {
        position: 'absolute',
        right: 80,
        top: middleHeight - 7,
        height: 20,
        width: 20,
    },
    cancelButton: {
        alignItems: 'center',
        paddingTop: 8,
        width: 60,
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 30,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#333',
        borderRadius: 4,
    },
    cancelButtonText: {
        fontSize: 10,
        fontFamily: 'AvenirNextLTW01RegularRegular',
        color: '#fff'
    }
};

SearchBox.propTypes = {
    /**
     * onFocus
     * return a Promise
     * beforeFocus, onFocus, afterFocus
     */
    beforeFocus: PropTypes.func,
    onFocus: PropTypes.func,
    afterFocus: PropTypes.func,

    /**
     * onSearch
     * return a Promise
     */
    beforeSearch: PropTypes.func,
    onSearch: PropTypes.func,
    afterSearch: PropTypes.func,

    /**
     * onChangeText
     * return a Promise
     */
    onChangeText: PropTypes.func,

    /**
     * onCancel
     * return a Promise
     */
    beforeCancel: PropTypes.func,
    onCancel: PropTypes.func,
    afterCancel: PropTypes.func,

    /**
     * async await
     * return a Promise
     * beforeDelete, onDelete, afterDelete
     */
    beforeDelete: PropTypes.func,
    onDelete: PropTypes.func,
    afterDelete: PropTypes.func,

    /**
     * styles
     */
    backgroundColor: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    titleCancelColor: PropTypes.string,
    tintColorSearch: PropTypes.string,
    tintColorDelete: PropTypes.string,

    /**
     * text input
     */
    placeholder: PropTypes.string,
    cancelTitle: PropTypes.string,
    returnKeyType: PropTypes.string,
    keyboardType: PropTypes.string,
};

export default SearchBox;
