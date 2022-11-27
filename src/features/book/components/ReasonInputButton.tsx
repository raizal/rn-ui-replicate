import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Search from '@icons/Search.svg';
import Clock from '@icons/Clock.svg';
import ChevronDown from '@icons/ChevronDown.svg';
import {BodyText, Flex} from '@components/index';
import {styled} from 'nativewind';
import clsx from 'clsx';

const Container = styled(
  Flex,
  'rounded-2xl border border-1 border-neutral-100 flex-row bg-brand-bg-input',
);

const ClickableArea = styled(
  TouchableOpacity,
  'pl-4 items-center flex flex-row flex-1 rounded-2xl',
);

const SearchIcon = styled(Search, 'fill-brand-primary-400 mr-3');
const ClockIcon = styled(Clock, 'fill-white mr-2');
const ChevronDownIcon = styled(ChevronDown, 'fill-white');

const Text = styled(BodyText, 'flex-1 text-[16px] font-semibold mr-4');

const ButtonDatePicker = styled(TouchableOpacity, 'py-2 pr-4');
const DatePickerContainer = styled(
  Flex,
  'flex-row items-center py-2 px-2 bg-brand-warning-500 rounded-xl',
);
const DatePickerText = styled(
  BodyText,
  'text-[14px] font-semibold text-neutral-100 tracking-wider leading-4',
);

interface ReasonInputButtonProps {
  pickedDate?: string;
  className?: string;
  onDateClick?: () => void;
  onInputClick?: () => void;
}

const ReasonInputButton = ({
  pickedDate,
  className,
  onInputClick,
  onDateClick,
}: ReasonInputButtonProps) => {
  return (
    <Container
      tw={clsx(className)}
      style={{
        elevation: 4,
      }}>
      <ClickableArea onPress={onInputClick} activeOpacity={0.85}>
        <SearchIcon width={28} height={28} />
        <Text>Add Reasons</Text>
      </ClickableArea>
      <ButtonDatePicker onPress={onDateClick} activeOpacity={0.85}>
        <DatePickerContainer tw={clsx(pickedDate && 'bg-brand-success-500')}>
          <ClockIcon width={18} height={18} />
          <DatePickerText>{pickedDate ? pickedDate : 'Now'}</DatePickerText>
          <ChevronDownIcon width={18} height={18} />
        </DatePickerContainer>
      </ButtonDatePicker>
    </Container>
  );
};

export default ReasonInputButton;
