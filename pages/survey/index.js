import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Grid, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Box, Container } from '@mui/system';
import Question from './question';


function Survey() {
    const methods = useForm();
    const [surveyData, setSurveyData] = useState();
    const [errors, setErrors] = useState();

    const onSubmit = async (values) => {
        const answers = Object.keys(values).map(key => (
            {
                questionId: key,
                answer: values[key]
            }
        ))

        const payload = {
            type: "surveyAnswers",
            attributes: { answers }
        }

        const response = await fetch(`/api/v1/survey/${surveyData.id}/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (!response.ok) {
            data.errors.forEach(elem => {
                const name = elem.source.pointer.split('/').pop();
                methods.setError(name, { type: 'serverValidation', message: elem.detail })
            });
            return
        }
       
        Router.push({
            pathname: '/preview',
            query: { answers: JSON.stringify(answers) }
        })
    }

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                const response = await fetch('/api/v1/survey');
                const data = await response.json();
                if (!response.ok) {
                    throw data.errors
                }
                setSurveyData(data)
            } catch (error) {
                setErrors(error)
            }
        }

        fetchSurveyData();
    }, [])

    if (!surveyData && !errors) {
        return <span>Loading...</span>
    }

    if (errors && Array.isArray(errors)) {
        return <Container fixed>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Errors
                    </Typography>
                    <List>
                        {errors.map((err, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={err.title}
                                    secondary={err.detail}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Container>
    }

    return (
        <Container fixed>
            <Grid container alignItems="center">
                <Box sx={{ my: 3 }}>
                    <Typography gutterBottom variant="h4" component="div">
                        Film feedback
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        Thank you for participating in the film festival!
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        Please fill out this short survey so we can record your feedback.
                    </Typography>
                </Box>
            </Grid>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid container justify="center" direction="column" spacing={4}>
                        {surveyData.attributes?.questions?.map(q => (
                            <Grid item key={q.questionId}>
                                <Question options={q} />
                            </Grid>
                        ))}
                        <Grid item>
                            <Button variant="contained" type="submit">Send feedback</Button>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </Container>
    );
}

export default Survey;
