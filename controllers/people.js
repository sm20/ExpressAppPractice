var { people } = require('../data');

const newPerson = (req, res) => {
    const { id, name } = req.body;   //request payload should include these json keys
    res.status(202).json({ success: true, data: id, name }); //or just send 'data: req.body'
}

const updatePerson = (req, res) => {
    const { qid, qname } = req.query
    console.log(qid)
    const { id, name } = req.body

    if (Number(qid) !== 4)
        return res.status(200).json({ success: false, msg: 'id not on file' })
    if (qname !== 'Cynthia')
        return res.status(200).json({ success: false, msg: 'name not on file' })

    res.status(200).json({ sucess: true, msg: 'Information Updated', data: { id, name } })
}

const deletePerson = (req, res) => {
    const exists = people.find((person) => person.id === Number(req.params.pid))

    if (exists)
        return res.status(200).json({ success: true, msg: `person with id:${req.params.pid} deleted` })

    res.status(200).json({ success: false, msg: 'Person does not exist' })
}

module.exports = {
    newPerson,
    updatePerson,
    deletePerson
}