import { Carousel } from 'src/shared/ui/Carousel/Carousel';
import { useEffect, useRef } from 'react';

import styles from './OnboardingPage.module.css';
import { Button } from 'src/shared/ui/Button/Button';
import type Slider from 'react-slick';
import { useStep } from 'src/shared/functions/useStep';

const OnboardingStep = [
  {
    image: '/images/onboarding_1.png',
    description: (
      <h2 className={styles.Description} key={1}>
        1.
        <br />
        소개를 원하는 지인에게
        <br />
        정보 입력 링크를 전달하세요.
      </h2>
    ),
  },
  {
    image: '/images/onboarding_2.png',
    description: (
      <h2 className={styles.Description} key={2}>
        2.
        <br />
        정보 소개 입력이 끝나면
        <br />
        다른 사람에게 정보를 공유하세요.
      </h2>
    ),
  },
  {
    image: '/images/onboarding_3.png',
    description: (
      <h2 className={styles.Description} key={3}>
        3.
        <br />
        두 사람의 의견이 일치한다면
        <br />
        대화 자리를 마련해주세요.
      </h2>
    ),
  },
];

export const OnboardingPage = ({ onClickNextPage }: { onClickNextPage: () => void }) => {
  const sliderRef = useRef<Slider>(null);
  const { step, increase, setStep } = useStep({ max: OnboardingStep.length });

  useEffect(() => {
    sliderRef.current?.slickGoTo(step);
  }, [step]);

  return (
    <div className={styles.Wrapper}>
      <Carousel
        className={styles.CarouselWrapper}
        infinite={false}
        arrows={false}
        ref={sliderRef}
        beforeChange={(_, next) => setStep(next)}
      >
        {OnboardingStep.map(({ image }, idx) => (
          <div className={styles.ContentWrapper} key={image}>
            <div className={styles.ImageWrapper}>
              <img src={image} alt="구구 설명 이미지 1" />
            </div>
            <ol className={styles.Dots}>
              {OnboardingStep.map((_, index) => (
                <li key={index} data-selected={idx === index} />
              ))}
            </ol>
            {OnboardingStep[idx].description}
          </div>
        ))}
      </Carousel>
      <div className={styles.ButtonWrapper}>
        {step === OnboardingStep.length - 1 ? (
          <Button
            className={styles.Button}
            color={'primary'}
            variant={'filled'}
            widthType={'fill'}
            onClick={onClickNextPage}
          >
            시작하기
          </Button>
        ) : (
          <Button className={styles.Button} color={'primary'} variant={'filled'} widthType={'fill'} onClick={increase}>
            다음
          </Button>
        )}
      </div>
    </div>
  );
};
