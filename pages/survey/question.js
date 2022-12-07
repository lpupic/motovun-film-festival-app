import { Rating, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";

const Question = (props) => {
    const { questionId, questionType, attributes, label } = props.options;
    const { register, control, formState: { errors } } = useFormContext();
    const isError = Boolean(errors?.[questionId]?.type)

    if (!props.options) {
        return null;
    }

    if (questionType === 'text') {
        return (
            <Box>
                <TextField
                    {...register(questionId, { required: "The field is required" })}
                    name={questionId}
                    label={label}
                    type='text'
                    error={isError}
                    sx={{ width: '50%' }}
                    {...attributes}
                />
                {isError && <Box sx={{ color: 'red', mt: 1 }}>
                    {errors[questionId].message}
                </Box>}
            </Box>
        )
    } else if (questionType === 'rating') {
        return (
            <Box>
                <Typography component="legend">{label}</Typography>
                <Controller
                    name={"review"}
                    control={control}
                    rules={{ setValueAs: (v) => parseInt(v), required: "The field is required" }}
                    render={({ field }) => <Rating
                        onChange={(_, value) => field.onChange(parseInt(value))}
                        sx={{ width: '50%' }}
                    />
                    }
                />
                {isError && <Box sx={{ color: 'red', mt: 1 }}>
                    {errors[questionId].message}
                </Box>}
            </Box>
        )
    }
}

export default Question;