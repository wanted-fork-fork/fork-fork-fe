import { useCallback, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { MyProfile, useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { IdealPartner, useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { useMyProfileFormProcessStore } from 'src/entities/candidates/info/processes/_store/myProfileFormProcessStore';
import { useIdealPartnerFormProcessStore } from 'src/entities/candidates/ideal_partner/processes/_store/idealPartnerFormProcessStore';
import toast from 'react-hot-toast';
import { TempFormSave, tempSaveScheme } from 'src/entities/candidates/_common/libs/tempSaveScheme';

export const useFormTempSave = ({
  key,
  step,
  setStep,
  onSaveDetected,
}: {
  key: string;
  step: number;
  setStep: (step: number) => void;
  onSaveDetected: () => void;
}) => {
  const storageKey = `form_${key}`;

  const overrideMyProfile = useMyProfileStore((state) => state.override);
  const overrideIdealPartner = useIdealPartnerStore((state) => state.override);

  const myProfileStore = useMyProfileStore(
    (state) =>
      Object.fromEntries(
        Object.entries(state).filter(([entryKey, value]) => typeof value !== 'function' && entryKey !== 'images'),
      ) as MyProfile,
  );
  const idealPartnerStore = useIdealPartnerStore(
    (state) =>
      Object.fromEntries(
        Object.entries(state).filter(([entryKey, value]) => typeof value !== 'function' && entryKey !== 'images'),
      ) as IdealPartner,
  );

  const myProfileStepIdx = useMyProfileFormProcessStore((state) => state.currentStepIdx);
  const setMyProfileStepIdx = useMyProfileFormProcessStore((state) => state.setStepIdx);
  const idealStepIdx = useIdealPartnerFormProcessStore((state) => state.currentStepIdx);
  const setIdealStepIdx = useIdealPartnerFormProcessStore((state) => state.setStepIdx);
  const touchedProfileKeys = useMyProfileFormProcessStore((state) =>
    JSON.stringify(Array.from(state.touchedSteps.keys())),
  );
  const touchedIdealKeys = useIdealPartnerFormProcessStore((state) =>
    JSON.stringify(Array.from(state.touchedSteps.keys())),
  );

  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const touchedKeysRef = useRef(touchedProfileKeys + touchedIdealKeys);
  const prevTouchedKeysRef = useRef(touchedProfileKeys + touchedIdealKeys);

  const handleOverride = useCallback(() => {
    try {
      const saved = tempSaveScheme.parse(JSON.parse(localStorage.getItem(storageKey) ?? '{}'));

      setStep(saved.step);
      setMyProfileStepIdx(saved.myProfileStep);
      setIdealStepIdx(saved.idealStep);
      overrideMyProfile(saved.myProfile as MyProfile);
      overrideIdealPartner(saved.idealPartner as IdealPartner);
    } catch (e) {
      console.error(e);
      localStorage.removeItem(storageKey);
      toast('덮어씌우는 중 에러가 발생했어요.');
    }
  }, [overrideIdealPartner, overrideMyProfile, setIdealStepIdx, setMyProfileStepIdx, setStep, storageKey]);

  const handleReset = useCallback(() => {
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  useEffect(() => {
    touchedKeysRef.current = touchedProfileKeys + touchedIdealKeys;
  }, [touchedIdealKeys, touchedProfileKeys]);

  useEffect(() => {
    const saveInfo = () => {
      if (touchedKeysRef.current === prevTouchedKeysRef.current) {
        return;
      }
      prevTouchedKeysRef.current = touchedKeysRef.current;
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          myProfile: myProfileStore,
          idealPartner: idealPartnerStore,
          expiredAt: dayjs().add(3, 'hours').toDate(),
          step,
          myProfileStep: myProfileStepIdx,
          idealStep: idealStepIdx,
        } satisfies TempFormSave),
      );
    };

    saveInfo();

    timerRef.current = setInterval(saveInfo, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [idealPartnerStore, storageKey, myProfileStore, step, myProfileStepIdx, idealStepIdx]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
      if (!saved || Object.keys(saved).length === 0 || dayjs().isAfter(dayjs(saved.expiredAt))) {
        return;
      }

      onSaveDetected();
    } catch (e) {
      console.error(e);
    }
  }, [storageKey]);

  return {
    handleOverride,
    handleReset,
  };
};
