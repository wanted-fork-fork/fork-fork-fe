import { Header } from 'src/shared/ui/layout/Header/Header';
import { useNavigate } from '@remix-run/react';
import { AvailableCandidateResponse, createGroupInfoList } from 'src/types';
import { SelectCandidateCard } from 'src/entities/candidates/_common/components/SelectCandidateCard/SelectCandidateCard';
import { useState } from 'react';
import Flex from 'src/shared/ui/Flex/Flex';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import styles from './AddCandidatePage.module.css';
import { Input } from 'src/shared/ui/Input/Input';
import { Button } from 'src/shared/ui/Button/Button';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { InfoBox } from 'src/shared/ui/InfoBox/InfoBox';
import { useBoolean } from 'src/shared/functions/useBoolean';
import toast from 'react-hot-toast';

export const AddCandidatePage = ({
  groupId,
  candidates,
}: {
  groupId: string;
  candidates: AvailableCandidateResponse[];
}) => {
  const navigate = useNavigate();
  const [selectedCandidates, setSelectedCandidates] = useState<Map<string, string>>(new Map());

  const { value: isConfirmOpen, setTrue: openConfirm, setFalse: closeConfirm } = useBoolean(false);

  const handleClickSubmit = async () => {
    try {
      await createGroupInfoList({
        groupInfoList: Array.from(selectedCandidates).map(([id, comment]) => ({
          infoId: id,
          groupId,
          message: comment,
        })),
      });

      closeConfirm();
      navigate(`/groups/${groupId}`);
      toast('후보자를 그룹에 공유했습니다.');
    } catch (e) {
      console.error(e);
      toast.error('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const toggleCandidate = (candidateId: string) => {
    if (selectedCandidates.has(candidateId)) {
      setSelectedCandidates((prev) => {
        const newSelectedCandidates = new Map(prev);
        newSelectedCandidates.delete(candidateId);
        return newSelectedCandidates;
      });
    } else {
      setSelectedCandidates((prev) => {
        const newSelectedCandidates = new Map(prev);
        newSelectedCandidates.set(candidateId, '');
        return newSelectedCandidates;
      });
    }
  };

  return (
    <div className={styles.Container}>
      <Header onPrev={() => navigate(`/groups/${groupId}`)}>후보 추가</Header>
      <div className={styles.TitleWrapper}>
        <h2>
          내 후보자 목록에서 <br /> 그룹에 공유할 후보자를 선택하세요.
        </h2>
        <small>한 번에 여러명을 선택할 수 있어요.</small>
      </div>
      <ScrollView viewportClassName={styles.Viewport}>
        <Flex gap={12} direction={'vertical'}>
          {candidates.map((candidate) => {
            const selectedComment = selectedCandidates.get(candidate.info.id!);
            return (
              <SelectCandidateCard
                key={candidate.info.id}
                profile={candidate.info}
                disabled={candidate.isAlreadyInGroup}
                selected={selectedComment != null}
                onClick={() => toggleCandidate(candidate.info.id ?? '')}
                footer={
                  selectedComment != null && (
                    <Input
                      className={styles.Input}
                      placeholder={'후보자에 대한 코멘트를 입력해주세요'}
                      shape={'box'}
                      value={selectedCandidates.get(candidate.info.id ?? '') ?? ''}
                      suffixSlot={<span className={styles.Suffix}>{`${selectedComment.length}/20`}</span>}
                      onKeyUp={(e) => e.preventDefault()}
                      onChange={(v) => {
                        if (v.target.value.length > 20) return;
                        setSelectedCandidates((prev) => {
                          const newMap = new Map(prev);
                          newMap.set(candidate.info.id!, v.target.value);
                          return newMap;
                        });
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )
                }
              />
            );
          })}
        </Flex>
      </ScrollView>
      <div className={styles.Footer}>
        <Button widthType={'fill'} onClick={openConfirm} disabled={selectedCandidates.size === 0}>
          추가하기 ({selectedCandidates.size}/{candidates.filter((c) => !c.isAlreadyInGroup).length})
        </Button>
      </div>
      <BottomSheet detent={'content-height'} isOpen={isConfirmOpen} onClose={closeConfirm}>
        <BottomSheet.Content className={styles.BottomSheetBody}>
          <h2>잠깐! 공유 전 확인해주세요.</h2>
          <Flex gap={8} direction={'vertical'}>
            <InfoBox className={styles.Box} radiusSize={'S'}>
              <Flex className={styles.Title}>
                <span>👀</span>
                <h3>그룹원이 공유한 후보자의 정보를 열람합니다.</h3>
              </Flex>
              <p>
                개인정보에 민감한 후보자의 정보가 있다면 <br />
                그룹에 공유하는 건 한 번 생각해주세요.
              </p>
            </InfoBox>
            <InfoBox className={styles.Box} radiusSize={'S'}>
              <Flex className={styles.Title}>
                <span>🗑️</span>
                <h3>관리자가 삭제할 수 있어요.</h3>
              </Flex>
              <p>
                관리자가 그룹 성격에 맞지 않는 후보자는
                <br />
                삭제할 수 있어요.
              </p>
            </InfoBox>
          </Flex>
          <Button widthType={'fill'} onClick={() => handleClickSubmit()}>
            확인했어요
          </Button>
        </BottomSheet.Content>
      </BottomSheet>
    </div>
  );
};
