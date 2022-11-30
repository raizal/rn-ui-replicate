import React, {useCallback, useMemo} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native';
import {BodyText, Flex, H1, H2} from '@components/index';
import {styled} from 'nativewind';
import {BottomSheetDefaultFooterProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types';
import {
  formatDateForPicker,
  generateRangeOfDates,
  getDateFromPickerFormat,
  timeRanges,
} from '@features/book/components/utils';
import ScrollPicker from '@components/ScrollPicker';
import clsx from 'clsx';
import {useBookAppointment} from '@features/book/stores';

const FooterButton = styled(
  TouchableOpacity,
  'flex flex-col bg-white border border-0.5 border-neutral-200 items-center py-4 rounded-2xl',
);

const ContentContainer = styled(
  Flex,
  'flex flex-col py-8 rounded-t-2xl border-t-1',
);

interface AppointmentDialogProps {
  onChange?: (index: number) => void;
  onSubmit?: () => void;
}

const AppointmentDialog = React.forwardRef<BottomSheet, AppointmentDialogProps>(
  ({onChange, onSubmit}, ref) => {
    const initialSnapPoints = useMemo(() => ['65%', '65%'], []);

    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
    const [selectedTimeStr, setSelectedTime] = React.useState<string>('Now');

    const setAppointmentDate = useBookAppointment(
      state => state.setAppointmentDate,
    );
    const setAppointmentTime = useBookAppointment(
      state => state.setAppointmentTime,
    );

    const dates = useMemo(
      () => generateRangeOfDates(30).map(day => formatDateForPicker(day)),
      [],
    );
    const times = useMemo(timeRanges, []);

    const handleDialogSubmit = useCallback(() => {
      if (selectedDate) {
        setAppointmentDate(selectedDate);
        setAppointmentTime(selectedTimeStr);
        onSubmit && onSubmit();
      }
    }, [
      onSubmit,
      selectedDate,
      selectedTimeStr,
      setAppointmentDate,
      setAppointmentTime,
    ]);

    const handleChangeDate = (value: string) => {
      const date = getDateFromPickerFormat(value);
      if (date) {
        setSelectedDate(date);
      }
    };

    const handleChangeTime = (value: string) => {
      setSelectedTime(value);
    };

    const onClose = useCallback(() => {
      onChange && onChange(-1);
    }, [onChange]);

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={1} />
      ),
      [],
    );

    const renderFooter = useCallback(
      (props: BottomSheetDefaultFooterProps) => {
        return (
          <BottomSheetFooter {...props} bottomInset={24}>
            <Flex tw="px-4">
              <FooterButton
                onPress={handleDialogSubmit}
                tw="bg-brand-primary-500"
                activeOpacity={0.9}
                style={{
                  elevation: 4,
                }}>
                <H1 tw="leading-6 text-white">Done</H1>
              </FooterButton>
            </Flex>
          </BottomSheetFooter>
        );
      },
      [handleDialogSubmit],
    );

    const renderItem = (data: string, index: number, isSelected: boolean) => {
      return (
        <Flex>
          <BodyText
            tw={clsx(
              'text-[16px] text-center leading-6 text-neutral-400',
              isSelected && 'text-brand-primary-400',
            )}>
            {data}
          </BodyText>
        </Flex>
      );
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={initialSnapPoints}
        enablePanDownToClose={true}
        handleComponent={null}
        backdropComponent={renderBackdrop}
        onChange={onChange}
        onClose={onClose}
        footerComponent={renderFooter}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize">
        <ContentContainer tw="pb-[15px]">
          <Flex tw="px-4">
            <H1 tw="text-neutral-800 opacity-70">Schedule appointment</H1>
            <H2 tw="text-neutral-600 opacity-70 font-medium">
              Please select date and time window:
            </H2>
            <Flex tw={'h-[332px] flex-row py-4 mt-4'}>
              <ScrollPicker
                dataSource={dates}
                selectedIndex={0}
                itemHeight={60}
                wrapperHeight={280}
                wrapperColor={'#ffffff'}
                containerClassNames="bg-white flex-1"
                highlighClassNames="border border-x-0 border-brand-primary-500"
                onValueChange={value => handleChangeDate(value)}
                renderItem={renderItem}
              />
              <ScrollPicker
                dataSource={times}
                selectedIndex={0}
                itemHeight={60}
                wrapperHeight={280}
                wrapperColor={'#ffffff'}
                containerClassNames="bg-white flex-1"
                highlighClassNames="border border-x-0 border-brand-primary-500"
                onValueChange={value => handleChangeTime(value)}
                renderItem={renderItem}
              />
            </Flex>
          </Flex>
        </ContentContainer>
      </BottomSheet>
    );
  },
);

export default AppointmentDialog;
