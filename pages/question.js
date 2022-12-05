import { Grid, Rating, TextField, Typography } from "@mui/material"

const Question = (props) => {
    const { questionId, questionType, attributes, required, label } = props.options;
    if (!props.options) {
        return null;
    }

    if (questionType === 'text') {
        return (
            <Grid item>
                <TextField
                    name={questionId}
                    label={label}
                    type='text'
                    sx={{ width: '50%' }}
                    {...attributes}
                />
            </Grid>
        )
    } else if (questionType === 'rating') {
        return (
            <Grid item>
                <Typography component="legend">{label}</Typography>
                <Rating
                    name={questionId}
                    sx={{ width: '50%' }}
                    {...attributes}
                />
            </Grid>
        )
    }
}

export default Question;