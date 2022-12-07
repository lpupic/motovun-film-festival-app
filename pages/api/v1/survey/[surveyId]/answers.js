import {v4 as uuidv4} from 'uuid';

function handler(req, res) {
    const surveyId = req.query.surveyId;

    const validateFilm = (value) => {
        if (!value || value.trim() === '') {
            return false;
        }
        return true;
    }

    const validateReview = (value) => {
        if (!value || isNaN(value)) {
            return false;
        }
        return true;
    }

    if (req.method === 'POST') {
        // simple server side validation
        const { answers } = req.body.attributes;
        let errors = [];

        if (!answers && !Array.isArray(answers)) {
            //return 406 or other method;
        }

        answers.forEach(elem => {
            const { questionId, answer } = elem;
            switch (questionId) {
                case 'film':
                    const isValidFilm = validateFilm(answer);
                    if (!isValidFilm) {
                        errors.push({
                            source: { pointer: `data/attributes/answers/film` },
                            detail: "The value is required"
                        })
                    }
                    break
                case 'review':
                    const isValidReview = validateReview(answer);
                    if (!isValidReview) {
                        errors.push({
                            source: { pointer: `data/attributes/answers/review` },
                            detail: "The value is required"
                        })
                    }
                    break
                default:
                    break
            }
        });
        
        if (errors.length > 0) {
            res.status(422).json({ "errors": errors });
            return;
        }

        res.status(201).json({
            "data": {
                "type": "surveyAnswers",
                "id": uuidv4(),
                "attributes": {
                    "answers": answers
                },
                "relationships": {
                    "survey": {
                        "data": {
                            "type": "surveys",
                            "id": surveyId
                        }
                    }
                }
            }
        })
    }
}

export default handler;