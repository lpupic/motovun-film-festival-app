import { useRouter } from 'next/router'
import { Container, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";

function Preview() {
    const router = useRouter();
    let answers;
    try {
        answers = JSON.parse(router.query.answers)
    } catch (err) {
        answers = [];
    }

    return (
        <Container fixed>
            <Grid container alignItems="center">
                {answers.length > 0 ? <Box sx={{ my: 3 }}>
                    <Typography gutterBottom variant="h4" component="div">
                        Thank you for your feedback!
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ mt: 6 }}>
                        Answers:
                    </Typography>
                    <List>
                        {answers?.map((elem, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`Question: ${elem.questionId}`}
                                    secondary={`Your answer: ${elem.answer}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box> : <Typography gutterBottom variant="h4" component="div">
                    Something went wrong!
                </Typography>}
            </Grid>
        </Container>
    )
}

export default Preview;