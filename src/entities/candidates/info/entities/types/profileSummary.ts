import { ArchivedInfoResponse } from 'src/types';

export type Gender = 'FEMALE' | 'MALE';

const JobTypeList = ['STUDENT', 'OFFICE_WORKER', 'FREELANCER', 'ETC'];
export type JobType = (typeof JobTypeList)[number];

const ReligionTypeList = ['NONE', 'CHRISTIAN', 'BUDDHISM', 'CATHOLIC', 'WON_BUDDHISM', 'ETC'];
export type ReligionType = (typeof ReligionTypeList)[number];

export type ProfileSummary = ArchivedInfoResponse;
