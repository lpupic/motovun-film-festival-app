import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/system';
import Question from './question';


function Survey() {
    const router = useRouter();
    const [attributes, setAttributes] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        router.push('/preview')
    }

    useEffect(() => {
        const fetchSurveyData = async () => {
            await fetch('/api/v1/survey').then(response => response.json()).then(data => {
                setAttributes(data?.attributes)
            });
        }
        fetchSurveyData();
    }, [])

    if (!attributes) {
        return null
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
            <form onSubmit={handleSubmit}>
                <Grid container justify="center" direction="column" spacing={4}>
                    <Grid item>
                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            sx={{ width: '50%' }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            multiline
                            rows={5}
                            rowsMax={5}
                            fullWidth
                        />
                    </Grid>
                    {attributes?.questions?.map(q => (
                        <Question options={q} key={q.questionId} />
                    ))}
                    <Grid item>
                        <Button variant="contained" type="submit">Send feedback</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default Survey;
