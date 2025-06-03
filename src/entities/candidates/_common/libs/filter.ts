import { SearchInfoRequestDtoGender, SearchInfoRequestDtoSortBy, SearchInfoRequestDtoSortDirection } from 'src/types';
import { z } from 'zod';

export const filterGenderList: { name: string; gender: SearchInfoRequestDtoGender | undefined }[] = [
  { name: '전체', gender: undefined },
  { name: '남자', gender: 'MALE' },
  { name: '여자', gender: 'FEMALE' },
];

export const FILTER_ALIGN_KEYS = ['CREATED_ASC', 'CREATED_DESC', 'NAME_DESC', 'NAME_ASC'] as const;
export const filterAlignList: {
  name: string;
  id: (typeof FILTER_ALIGN_KEYS)[number];
  sortBy: SearchInfoRequestDtoSortBy;
  sortDirection: SearchInfoRequestDtoSortDirection;
}[] = [
  { name: '오래된 등록 순', id: 'CREATED_ASC', sortBy: 'CREATED_DATE', sortDirection: 'ASC' },
  { name: '최신 등록 순', id: 'CREATED_DESC', sortBy: 'CREATED_DATE', sortDirection: 'DESC' },
  { name: '이름 내림차순', id: 'NAME_DESC', sortBy: 'NAME', sortDirection: 'DESC' },
  { name: '이름 오름차순', id: 'NAME_ASC', sortBy: 'NAME', sortDirection: 'ASC' },
] as const;

export const filterSchema = z.object({
  alignId: z.enum(FILTER_ALIGN_KEYS).optional(),
  gender: z.enum(['MALE', 'FEMALE'] as const satisfies SearchInfoRequestDtoGender[]).optional(),
  ageFrom: z.coerce.number().optional(),
  ageTo: z.coerce.number().optional(),
  heightFrom: z.coerce.number().optional(),
  heightTo: z.coerce.number().optional(),
  townList: z.array(z.string()).optional(),
});
