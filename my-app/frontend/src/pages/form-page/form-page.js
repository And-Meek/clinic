import { Button, Box, Stack, TextField, Typography, Collapse } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

const fieldSchema = yup.object().shape({
	phone: yup
		.string()

		.matches(/^\+?[\d\s\-()]{7,}$/, 'Неверный номер телефона.'),
});

export const FormPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSucsess] = useState(false);
	const [isError, setIsError] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			phone: '+ ',
			request: '',
		},
		resolver: yupResolver(fieldSchema),
	});

	const sendFormData = (data) => {
		setIsLoading(true);
		fetch('http://localhost:3001/form', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(data),
		})
			.then((resp) => {
				console.log(resp);
				if (resp.ok) {
					setIsSucsess(true);
					setTimeout(() => setIsSucsess(false), 3000);
					reset();
				} else {
					setIsError(true);
					setTimeout(() => setIsError(false), 3000);
				}
			})
			.then(() => {
				setIsLoading(false);
			});
	};

	const phoneError = errors.phone?.message;

	return (
		<div className="App">
			<Box
				height={600}
				width={400}
				my={4}
				display="flex"
				alignItems="center"
				flexDirection="column"
				justifyContent="center"
				gap={4}
				p={2}
				sx={{ border: '2px solid grey', borderRadius: '15px' }}
			>
				<Collapse in={isSuccess} unmountOnExit>
					<Alert severity="success" variant="outlined" sx={{ color: 'green' }}>
						Форма успешно отправлена
					</Alert>
				</Collapse>
				<Collapse in={isError} unmountOnExit>
					<Alert severity="error" variant="outlined" sx={{ color: 'red' }}>
						Форма не отправлена
					</Alert>
				</Collapse>
				<form
					method="POST"
					action="/form"
					className="form"
					onSubmit={handleSubmit(sendFormData)}
				>
					<Stack spacing={5} width="350px">
						<Typography variant="h5" component="h2" color="grey">
							Запись к врачу
						</Typography>
						<TextField
							sx={{ input: { color: 'grey' }, borderColor: 'grey.500' }}
							required
							fullWidth
							color="primary"
							focused
							id="outlined-required"
							label="Обязательно"
							placeholder="ФИО"
							name="name"
							type="text"
							{...register('name')}
						/>
						<TextField
							sx={{ input: { color: 'grey' } }}
							fullWidth
							required
							color="primary"
							focused
							id="outlined-required"
							label="Обязательно"
							placeholder="Номер телефона"
							name="phone"
							type="text"
							{...register('phone')}
							error={!!phoneError}
							helperText={phoneError ? phoneError : ''}
						/>
						<TextField
							inputProps={{ style: { color: 'grey' } }}
							focused
							minRows="3"
							maxRows="8"
							multiline
							color="primary"
							id="outlined-required"
							resise="none"
							placeholder="Опишите вашу проблему"
							name="request"
							type="text"
							{...register('request')}
						/>
						<Button
							style={{ fontSize: '18px' }}
							type="submit"
							variant="contained"
							disabled={!!phoneError || isLoading}
						>
							Отправить
						</Button>
					</Stack>
				</form>
			</Box>
		</div>
	);
};
