import JobSingleCard from "./JobSingleCard";

const JobsCard = ({ jobs }) => {
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
