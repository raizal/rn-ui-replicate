import React, {useCallback, useRef, useState} from 'react';
import {Flex} from '@components/index';
import Header from '@components/composition/Header';
import HeaderSwitch from './components/HeaderSwitch';
import SymptomSection from '@features/book/components/SymptomSection';
import ChoosePatientSection from '@features/book/components/ChoosePatientSection';
import ReasonInputButton from './components/ReasonInputButton';
import SymptomDialog from '@features/book/components/SymptomDialog';
import BottomSheet from '@gorhom/bottom-sheet';
import {ScrollView as RNScrollView} from 'react-native';
import {styled} from 'nativewind';
import {useBackHandler} from '@react-native-community/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';

const ScrollView = styled(RNScrollView, 'bg-white h-full');
const Container = styled(SafeAreaView, 'flex-1 grow');

const BookDoctor = () => {
  const symptomDialog = useRef<BottomSheet>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [symptomList] = useState<string[]>([
    'sympt1',
    'symptom2',
    'sy3',
    'symptom4',
    'symp5',
    'symptom6',
  ]);
  const [selectedSymptom, setSelectedSymptom] = useState<string[]>([]);
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [selectedDate] = useState<undefined | string>();

  useBackHandler(() => {
    if (dialogOpen) {
      symptomDialog?.current?.close();
      return true;
    }
    return false;
  });

  const onSelectPatients = useCallback(
    (patient: string) => {
      const indexPatient = selectedPatients.indexOf(patient);
      if (indexPatient >= 0) {
        setSelectedPatients(
          selectedPatients.filter((_, index) => index !== indexPatient),
        );
      } else {
        setSelectedPatients([...selectedPatients, patient]);
      }
    },
    [selectedPatients],
  );

  const onSelectSymptom = useCallback(
    (symptom: string) => {
      setSelectedSymptom([...selectedSymptom, symptom]);
    },
    [selectedSymptom],
  );

  const onSelectActiveSymptom = useCallback(
    (symptom: string) => {
      setSelectedSymptom([
        ...selectedSymptom.filter(active => active !== symptom),
      ]);
    },
    [selectedSymptom],
  );

  const showSymptomDialog = useCallback(() => {
    symptomDialog?.current?.expand();
  }, []);

  const onSubmitSymptomDialog = useCallback((selected: string[]) => {
    setSelectedSymptom(selected);
    symptomDialog?.current?.close();
  }, []);

  return (
    <Container>
      <Header />
      <ScrollView>
        <Flex>
          <HeaderSwitch />
          <ChoosePatientSection
            items={['Rere', 'Testing', 'Edo', 'Raizal Islami N.P.']}
            onSelect={onSelectPatients}
            selected={selectedPatients}
          />
          <Flex tw="px-4 mt-5 mb-2">
            <ReasonInputButton
              onInputClick={showSymptomDialog}
              pickedDate={selectedDate}
            />
          </Flex>
          {selectedSymptom && selectedSymptom.length > 0 && (
            <SymptomSection
              title="Selected symptoms and reasons:"
              items={selectedSymptom}
              onSelect={onSelectActiveSymptom}
              variant="active"
            />
          )}
          <SymptomSection
            title="Choose your symptoms and reasons:"
            items={symptomList.filter(
              item => selectedSymptom.indexOf(item) < 0,
            )}
            onSelect={onSelectSymptom}
          />
        </Flex>
      </ScrollView>
      <SymptomDialog
        ref={symptomDialog}
        symptomList={symptomList}
        selectedSymptom={selectedSymptom}
        onChange={index => {
          setDialogOpen(index >= 0);
        }}
        onSubmit={onSubmitSymptomDialog}
      />
    </Container>
  );
};

export default BookDoctor;
