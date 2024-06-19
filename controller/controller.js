const Job = require('../models/Jobs')
const mongoose = require('mongoose')

//get all jobs
const getJobs = async (req, res) => {
    const jobs = await Job.find({}).sort({ createdAt: -1 })

    res.status(200).json(jobs)
}


//get a single job
const getSingleJob = async (req, res) => {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
        return res.status(404).json({ error: 'Job not found ' })
    }

    res.status(200).json({ job: job })
}


//create a new job
const createNewJob = async (req, res) => {
    const { positionName, companyName, location, platform, gotAnReply , googleName} = req.body;

    try {
        const job = await Job.create
            ({ positionName, companyName, location, Date, platform, gotAnReply , googleName});

        res.status(201).send(job)

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


//delete a  job
const deleteJob = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such job' })
    }

    const job = await Job.findOneAndDelete({ _id: id })

    if (!job) {
        return res.status(400).json({ error: 'No such job' })
    }

    res.status(200).json(job);
}

//update a  job

const updateJob = async (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Job not found' })
    }

    const job = await Job.findOneAndUpdate({ _id: id }, {
        ...req.body
    })


    if (!job) {
        return res.status(404).json({ error: 'Job not found ' })
    }

    res.status(200).json(job)
}

module.exports = {
    createNewJob,
    getJobs,
    getSingleJob,
    deleteJob,
    updateJob
}