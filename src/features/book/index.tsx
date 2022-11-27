import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'moti';
import {Flex} from '@components/index';
import Header from '@components/composition/Header';
import HeaderSwitch from './components/HeaderSwitch';
import SymptomSection from '@features/book/components/SymptomSection';
import ChoosePatientSection from '@features/book/components/ChoosePatientSection';
import ReasonInputButton from './components/ReasonInputButton';

const BookDoctor = () => {
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

  return (
    <SafeAreaView>
      <Header />
      <Flex tw={'h-full w-full bg-white'}>
        <HeaderSwitch />
        <ChoosePatientSection
          items={['Rere', 'Testing', 'Edo', 'Raizal Islami N.P.']}
          onSelect={onSelectPatients}
          selected={selectedPatients}
        />
        <Flex tw="px-4 mt-5 mb-2">
          <ReasonInputButton pickedDate={selectedDate} />
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
          items={symptomList.filter(item => selectedSymptom.indexOf(item) < 0)}
          onSelect={onSelectSymptom}
        />
      </Flex>
    </SafeAreaView>
  );
};

export default BookDoctor;
