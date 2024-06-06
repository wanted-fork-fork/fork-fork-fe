import { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Typography',
};

export default meta;

export const Default = {
  render: () => (
    <>
      <h2>h2 텍스트</h2>
      <h3>h3 텍스트</h3>
      <p>p 텍스트</p>
      <strong>strong 텍스트</strong>
      <br />
      <small>small 텍스트</small>
      <br />
      <label htmlFor={'null'}>label 텍스트</label>
      <br />
      <label className={'strong'} htmlFor={'null'}>
        strong label 텍스트
      </label>
      <br />
      <ul>
        <li>li 1</li>
        <li>li 2</li>
        <li>li 3</li>
      </ul>
      <hr />
      <h2>
        당신에 대해 알려주세요!
        <br />
        이름이 어떻게 되시나요?
      </h2>
      <small>* 정확한 나이 계산을 위해 생년월일을 입력받고 있습니다.</small>
      <hr />
      <p>
        여기 작성한 내용은 <strong>소개 받는 분에게만 보여져요.</strong>
        <br />
        앞에 내용이 부족하다면 글로 더 어필해주세요!
      </p>
      <hr />
      <h3>사진 업로드 TIP!</h3>
      <ul>
        <li>옷 스타일을 참고할 수 있는 전신사진</li>
        <li>정면 사진 (잘나온 증명사진, 배경이 깔끔한 사진 등)</li>
        <li>
          개인정보 처리방침 관련하여
          <br />더 자세한 내용이 궁금하다면 <a>여기서</a> 확인해주세요.
        </li>
      </ul>
      <hr />
      <div>
        <label>
          이름 (연한 레이블)
          <input />
        </label>
      </div>
      <div>
        <label className={'strong'}>
          술자리 빈도 (진한 레이블)
          <input />
        </label>
      </div>
    </>
  ),
};
