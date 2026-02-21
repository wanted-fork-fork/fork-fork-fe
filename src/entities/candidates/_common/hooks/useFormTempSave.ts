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
  disabled = false,
  setStep,
  onSaveDetected,
}: {
  key: string;
  step: number;
  disabled?: boolean;
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

  // 임시저장된 데이터를 스토어에 덮어쓰기
  const handleOverride = useCallback(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
      const parsed = tempSaveScheme.parse(saved);

      setStep(parsed.step);
      setMyProfileStepIdx(parsed.myProfileStep);
      setIdealStepIdx(parsed.idealStep);
      overrideMyProfile(saved.myProfile as MyProfile);
      overrideIdealPartner(saved.idealPartner as IdealPartner);
    } catch (e) {
      console.error(e);
      localStorage.removeItem(storageKey);
      toast('덮어씌우는 중 에러가 발생했어요.');
    }
  }, [overrideIdealPartner, overrideMyProfile, setIdealStepIdx, setMyProfileStepIdx, setStep, storageKey]);

  // 임시저장된 데이터 제거
  const handleReset = useCallback(() => {
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  // 폼 작성 여부 업데이트
  useEffect(() => {
    touchedKeysRef.current = touchedProfileKeys + touchedIdealKeys;
  }, [touchedIdealKeys, touchedProfileKeys]);

  useEffect(() => {
    if (disabled) {
      handleReset();
    }
  }, []);

  // 현재 폼 데이터 상태에 따라 임시저장 트리거
  useEffect(() => {
    const saveInfo = () => {
      if (disabled || step === 0 || touchedKeysRef.current === prevTouchedKeysRef.current) {
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

  // 임시저장된 데이터 존재하는지 체크
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
