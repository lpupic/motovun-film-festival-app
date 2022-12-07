import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Grid, Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Question from './question';


function Survey() {
    const methods = useForm();
    const router = useRouter();
    const [data, setData] = useState();
    const [errors, setErrors] = useState();

    const onSubmit = async (values) => {
        const answers = Object.keys(values).map(key => (
            {
                questionId: key,
                answer: values[key]
            }
        ))

        const response = await fetch(`/api/v1/survey/${data.id}/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answers)
        });

        if (response.ok) {
            router.push('/preview')
        }
    }

    const fetchSurveyData = async () => {
        try {
            const response = await fetch('/api/v1/survey');
            const data = await response.json();
            if (!response.ok) {
                throw data.errors
            }
            setData(data)
        } catch (error) {
            setErrors(error)
        }
    }

    useEffect(() => {
        fetchSurveyData();
    }, [])

    if (!data && !errors) {
        return <span>Loading...</span>
    }

    if (errors && Array.isArray(errors)) {
        return <Fragment>
            {errors.map((err, index) => <span key={index}>Error: {err.detail}</span>)}
        </Fragment>
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
                        {data.attributes?.questions?.map(q => (
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
