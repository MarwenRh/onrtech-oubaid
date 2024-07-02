import { JobOffer } from "../../../types/types";
import JobSingleCard from "./JobSingleCard";
type Prop = {
  jobs: JobOffer[];
};
const JobsCard = ({ jobs }: Prop) => {
  return (
    <div>
      <div className="flex flex-wrap  mx-auto justify-center">
        {jobs.map((job) => (
          <JobSingleCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobsCard;
