import { Job } from 'src/types';
import { t } from 'i18next';

export const getJobText = (job: Job) => {
  if (job.jobCategory === 'ETC') {
    return job.jobName;
  }
  return t(`JOB_${job.jobCategory}`);
};
