import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {ScrollView as RNGHScrollView} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import {styled} from 'nativewind';

const deviceWidth = Dimensions.get('window').width;

const HightlightView = styled(View, 'absolute');
const Container = styled(View, 'flex-1 overflow-hidden');
const ScrollView = styled(RNGHScrollView, 'flex-1 grow');

interface ScrollPickerProps extends ScrollViewProps {
  dataSource: string[];
  selectedIndex?: number;
  animateToSelectedIndex?: boolean;
  itemHeight?: number;
  wrapperHeight?: number;
  wrapperColor?: string;
  onValueChange?: (value: string, selectedIndex: number) => void;
  renderItem?: (
    data: string,
    index: number,
    isSelected: boolean,
  ) => React.ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
  containerClassNames?: string;
  highlightStyle?: StyleProp<ViewStyle>;
  highlighClassNames?: string;
}

const ScrollPicker = (props: ScrollPickerProps) => {
  const {
    dataSource,
    animateToSelectedIndex = true,
    onValueChange,
    renderItem,
    highlightStyle,
    highlighClassNames,
    itemHeight = 30,
    wrapperHeight = itemHeight * 5,
    wrapperColor,
    containerStyle,
    containerClassNames,
    ...etcProps
  } = props;

  const scrollViewRef = useRef<RNGHScrollView>(null);

  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex || 0);

  const momentumStarted = useSharedValue<boolean>(false);
  const isScrollTo = useSharedValue<boolean>(false);
  const dragStarted = useSharedValue<boolean>(false);
  const timer = useSharedValue<number | null>(null);

  const scrollToIndex = (index: number, animated = true) => {
    setSelectedIndex(index);
    const y = itemHeight * index;
    scrollViewRef?.current?.scrollTo({y: y, animated});
  };

  const _scrollFix = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let y = 0;
    let h = itemHeight;
    if (e.nativeEvent.contentOffset) {
      y = e.nativeEvent.contentOffset.y;
    }
    const _selectedIndex = Math.round(y / h);
    let _y = _selectedIndex * h;
    if (_y !== y) {
      // using scrollTo in ios, onMomentumScrollEnd will be invoked
      if (Platform.OS === 'ios') {
        isScrollTo.value = true;
      }
      scrollViewRef.current?.scrollTo({y: _y});
    }
    if (selectedIndex === _selectedIndex) {
      return;
    }
    setSelectedIndex(_selectedIndex);
    if (onValueChange) {
      const selectedValue = dataSource[_selectedIndex];
      onValueChange(selectedValue, _selectedIndex);
    }
  };
  const _onScrollBeginDrag = () => {
    dragStarted.value = true;
    if (Platform.OS === 'ios') {
      isScrollTo.value = false;
    }
    timer.value && clearTimeout(timer.value);
  };
  const _onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    dragStarted.value = false;
    let _e: NativeSyntheticEvent<NativeScrollEvent> = {
      ...e,
      nativeEvent: {
        ...e.nativeEvent,
        contentOffset: {
          ...e.nativeEvent.contentOffset,
          y: e.nativeEvent.contentOffset.y,
        },
      },
    };
    timer.value && clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      if (!momentumStarted.value && !dragStarted.value) {
        _scrollFix(_e);
      }
    }, 10);
  };

  const _onMomentumScrollBegin = () => {
    momentumStarted.value = true;
    timer.value && clearTimeout(timer.value);
  };

  const _onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    momentumStarted.value = false;
    if (!isScrollTo.value && !momentumStarted.value && !dragStarted.value) {
      _scrollFix(e);
    }
  };

  useEffect(() => {
    if (selectedIndex) {
      setTimeout(() => {
        scrollToIndex(selectedIndex, animateToSelectedIndex);
      }, 0);
    }
  });

  const _renderItem = useCallback(
    (data: string, index: number) => {
      let isSelected = index === selectedIndex;
      const item = renderItem ? (
        renderItem(data, index, isSelected)
      ) : (
        <Text
          style={
            isSelected
              ? [styles.itemText, styles.itemTextSelected]
              : styles.itemText
          }>
          {data}
        </Text>
      );

      return (
        <View style={[styles.itemWrapper, {height: itemHeight}]} key={index}>
          {item}
        </View>
      );
    },
    [itemHeight, renderItem, selectedIndex],
  );

  const _renderPlaceHolder = () => {
    let h = (wrapperHeight - itemHeight) / 2;
    let header = <View style={{height: h, flex: 1}} />;
    let footer = <View style={{height: h, flex: 1}} />;
    return {header, footer};
  };

  let {header, footer} = _renderPlaceHolder();
  let highlightWidth =
    (props.style && 'width' in props.style ? props.style.width : 0) ||
    deviceWidth;

  let wrapperStyle: StyleProp<ViewStyle> = {
    height: wrapperHeight,
    backgroundColor: wrapperColor || '#fafafa',
  };

  const _highlightStyle: StyleProp<ViewStyle> = {
    top: (wrapperHeight - itemHeight) / 2,
    height: itemHeight,
    width: highlightWidth,
  };

  return (
    <Container
      tw={`${containerClassNames}`}
      style={[wrapperStyle, containerStyle]}>
      <HightlightView
        style={[_highlightStyle, highlightStyle]}
        tw={`${highlighClassNames}`}
      />
      <ScrollView
        ref={scrollViewRef}
        bounces={false}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        onMomentumScrollBegin={_onMomentumScrollBegin}
        onMomentumScrollEnd={_onMomentumScrollEnd}
        onScrollBeginDrag={_onScrollBeginDrag}
        onScrollEndDrag={_onScrollEndDrag}
        {...etcProps}>
        {header}
        {dataSource.map(_renderItem)}
        {footer}
      </ScrollView>
    </Container>
  );
};

let styles = StyleSheet.create({
  itemWrapper: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: '#999',
  },
  itemTextSelected: {
    color: '#333',
  },
});

export default ScrollPicker;
