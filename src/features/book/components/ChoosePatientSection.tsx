import React from 'react';
import {BodyText, Flex} from '@src/common/components';
import {TouchableOpacity} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import clsx from 'clsx';
import Button from '@components/Button';
import {styled} from 'nativewind';
import Plus from '@icons/Plus.svg';

interface SymptomSectionProps {
  items: string[];
  selected?: string[];
  onSelect: (selected: string) => void;
  classNames?: string;
}

const Touchable = styled(
  TouchableOpacity,
  'flex items-center w-full h-full justify-center',
);
const ButtonContainer = styled(
  Animated.View,
  'absolute top-[6px] bottom-[6px] left-[16px] w-[120px] rounded-2xl bg-white overflow-hidden',
);
const List = styled(Animated.FlatList<string>);
const Text = styled(
  Animated.Text,
  'text-[18px] leading-5 text-neutral-500 font-medium text-center',
);

const PlusIconContainer = styled(
  Animated.View,
  'absolute bottom-[-16] left-[-16]',
);
const PlusIcon = styled(Plus, 'fill-neutral-300');

const SymptomSection = ({
  items,
  selected = [],
  onSelect,
  classNames,
}: SymptomSectionProps) => {
  const prevX = useSharedValue(0);
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const diff = event.contentOffset.x - prevX.value;
      scrollX.value = withTiming(
        Math.min(Math.max(0, scrollX.value + diff), 70),
        {
          duration: 300,
        },
      );
    },
    onBeginDrag: event => {
      prevX.value = event.contentOffset.x;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const buttonWidth = interpolate(
      scrollX.value,
      [0, 70],
      [100, 50],
      Extrapolation.CLAMP,
    );
    return {
      width: buttonWidth,
    };
  });

  const plusIconAnimatedStyle = useAnimatedStyle(() => {
    const bottom = interpolate(
      scrollX.value,
      [0, 70],
      [-16, -6],
      Extrapolation.CLAMP,
    );
    const left = interpolate(
      scrollX.value,
      [0, 70],
      [-16, -2],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      scrollX.value,
      [0, 70],
      [1, 0.7],
      Extrapolation.CLAMP,
    );

    return {
      bottom,
      left,
      scaleX: scale,
      scaleY: scale,
    };
  });

  const textOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [0, 70],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
    };
  });

  return (
    <Flex tw={clsx(classNames)}>
      <BodyText tw="ml-4 mt-4 mb-2 tracking-wide text-neutral-500 text-[16px]">
        Choose Patient:
      </BodyText>
      <Flex>
        <List
          tw={'flex-wrap flex-row pr-4 pl-1'}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <Button
              text={item}
              active={selected?.indexOf(item) >= 0}
              onPress={() => onSelect(item)}
            />
          )}
          contentContainerStyle={{
            paddingVertical: 6,
            paddingRight: 12,
            paddingLeft: 112,
          }}
          data={items}
        />
        <ButtonContainer style={[{elevation: 6}, animatedStyle]}>
          <Touchable activeOpacity={0.85}>
            <Text style={textOpacity}>Add</Text>
            <PlusIconContainer style={plusIconAnimatedStyle}>
              <PlusIcon width={56} height={56} />
            </PlusIconContainer>
          </Touchable>
        </ButtonContainer>
      </Flex>
    </Flex>
  );
};

export default SymptomSection;
