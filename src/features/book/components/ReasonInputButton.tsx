import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import Search from '@icons/Search.svg';
import Clock from '@icons/Clock.svg';
import ChevronDown from '@icons/ChevronDown.svg';
import {BodyText, Flex} from '@components/index';
import {styled} from 'nativewind';
import clsx from 'clsx';
import {useBookAppointment} from '@features/book/stores';
import {formatDateForResult} from '@features/book/components/utils';

const Container = styled(
  Flex,
  'rounded-2xl border border-1 border-neutral-100 flex-row bg-brand-bg-input',
);

const ClickableArea = styled(
  TouchableOpacity,
  'pl-2 items-center flex flex-row flex-1 rounded-2xl',
);

const SearchIcon = styled(Search, 'fill-brand-primary-400 mr-2');
const ClockIcon = styled(Clock, 'fill-white mr-2');
const ChevronDownIcon = styled(ChevronDown, 'fill-white');

const Text = styled(
  BodyText,
  'flex-1 text-[14px] font-semibold text-neutral-600 mr-2',
);

const ButtonDatePicker = styled(TouchableOpacity, 'py-2 pr-4');
const DatePickerContainer = styled(
  Flex,
  'flex-row items-center py-2 px-2 bg-brand-warning-500 rounded-xl',
);
const DatePickerText = styled(
  BodyText,
  'text-[14px] text-neutral-100 tracking-wider leading-4',
);

interface ReasonInputButtonProps {
  pickedDate?: string;
  className?: string;
  onDateClick?: () => void;
  onInputClick?: () => void;
}

const ReasonInputButton = ({
  className,
  onInputClick,
  onDateClick,
}: ReasonInputButtonProps) => {
  const pickedDate = useBookAppointment(state => state.appointmentDate);
  const pickedTime = useBookAppointment(state => state.appointmentTime);

  const pickedDateTime = pickedDate
    ? `${formatDateForResult(pickedDate)} ${
        pickedDate && pickedTime !== 'Now' ? pickedTime : ''
      }`
    : null;

  return (
    <Container
      tw={clsx(className, Platform.OS === 'ios' && 'shadow-sm')}
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
          <DatePickerText>
            {pickedDateTime ? pickedDateTime : 'Now'}
          </DatePickerText>
          <ChevronDownIcon width={18} height={18} />
        </DatePickerContainer>
      </ButtonDatePicker>
    </Container>
  );
};
export default ReasonInputButton;
