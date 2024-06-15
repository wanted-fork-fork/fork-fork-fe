import { describe, expect, test } from 'vitest';
import { useMultiSelectToggle } from 'src/shared/functions/useMultiSelectToggle';
import { act, renderHook } from '@testing-library/react';

describe('useMultiSelectToggle', () => {
  test('리스트에 없는 특정 값에 대하여 toggle을 호출하면, 리스트에 그 값이 추가된다', () => {
    const { result } = renderHook(() => useMultiSelectToggle());

    act(() => {
      result.current.toggle('a');
    });

    expect(result.current.list).toEqual(['a']);
  });

  test('리스트에 있는 특정 값에 대하여 toggle을 호출하면, 리스트에서 그 값이 삭제된다', () => {
    const { result } = renderHook(() => useMultiSelectToggle(['a', 'b', 'c']));

    act(() => {
      result.current.toggle('a');
    });

    expect(result.current.list).toEqual(['b', 'c']);
  });
});
