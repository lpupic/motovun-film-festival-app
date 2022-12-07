function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body.data;
        let errors = [];

        data.attributes.answers.forEach(answer => {
            if (!answer || answer.trim() === '') {
                errors.push({
                    source: { pointer: `data/attributes/answers/${answer.questionId}` },
                })
            }
        })

        if (errors.length > 0) {
            res.status(422).json(errors);
        }
    }

    if (req.method === 'GET') {
        // TODO: delete these two line
        const rndInt = Math.floor(Math.random() * 2);
        let statusCode = Math.floor(Math.random() * 2) === 0 ? 500 : 200;

        // TODO: change statusCode into res.statusCode
        if (res.statusCode === 500) {
            res.status(500).json({
                "errors": [
                    {
                        "title": "Internal Server Error",
                        "detail": "Something went wrong. We're working on it!"
                    }
                ]
            });
            return;
        }

        res.status(200).json({
            "type": "surveys",
            "id": "2660dd24-e2db-42c1-8093-284b1df2664c",
            "attributes": {
                "title": "Film feedback form",
                "description": "<p>Thank you for participating in the film festival!</p> <p>Please fill out this short survey so we can record your feedback.</p>",
                "questions": [
                    {
                        "questionId": "film",
                        "questionType": "text",
                        "label": "What film did you watch?",
                        "required": true,
                        "attributes": null
                    },
                    {
                        "questionId": "review",
                        "questionType": "rating",
                        "label": "How would you rate the film? (1 - Very bad, 5 - Very good)",
                        "required": true,
                        "attributes": {
                            "min": 1,
                            "max": 5
                        }
                    }
                ]
            }
        })
    }

   ;
}

export default handler;