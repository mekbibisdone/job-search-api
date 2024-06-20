const job_post_router = require("express").Router();
const axios = require("axios");

job_post_router.get("/", async (req, res, next) => {
  const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.adzuna_app_id}&app_key=${process.env.adzuna_app_key}&results_per_page=20&category=it-jobs`;
  const response = await axios.get(url);
  const jobs = response.data.results.map((job) => {
    return {
      company: job.company.display_name,
      title: job.title,
      description: job.description,
      salary: (job.salary_min + job.salary_max) / 2,
    };
  });
  res.json(jobs);
});
module.exports = job_post_router;
