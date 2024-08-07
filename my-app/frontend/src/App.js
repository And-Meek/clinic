// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
import '@fontsource/roboto/300.css';
//import { Button, Box, Stack, TextField, Typography } from '@mui/material';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { FormPage, LoginPage, RequestsPage } from './pages';

// const fieldSchema = yup.object().shape({
// 	email: yup
// 		.string()

// 		.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Неверный email.')

// 		.min(5, 'Неверный email. Должно быть не меньше 5 символов')

// 		.max(30, 'Неверный email. Должно быть не больше 30 символов'),

// 	password: yup
// 		.string()

// 		.min(5, 'Неверный пароль. Должно быть не меньше 5 символов')

// 		.max(30, 'Неверный пароль. Должно быть не больше 30 символов'),
// });

export const App = () => {
	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm({
	// 	defaultValues: {
	// 		email: '',
	// 		password: '',
	// 	},
	// 	resolver: yupResolver(fieldSchema),
	// });

	// const sendFormData = (data) => console.log(data);
	// const emailError = errors.email?.message;
	// const passwordError = errors.password?.message;

	return (
		<div className="App">
			{/* <Box
				height={400}
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
				<form className="form" onSubmit={handleSubmit(sendFormData)}>
					<Stack spacing={5} width="350px">
						<Typography variant="h5" component="h2" color="grey">
							Login
						</Typography>
						<TextField
							sx={{ input: { color: 'grey' }, borderColor: 'grey.500' }}
							required
							fullWidth
							color="primary"
							focused
							id="outlined-required"
							label="Required"
							placeholder="Email"
							name="email"
							type="text"
							{...register('email')}
							error={!!emailError}
							helperText={emailError ? emailError : ''}
						/>
						<TextField
							sx={{ input: { color: 'grey' } }}
							fullWidth
							required
							color="primary"
							focused
							id="outlined-required"
							label="Required"
							placeholder="Password"
							name="password"
							type="password"
							{...register('password')}
							error={!!passwordError}
							helperText={passwordError ? passwordError : ''}
						/>
						<Button
							style={{ fontSize: '18px' }}
							type="submit"
							variant="contained"
							disabled={emailError || passwordError}
						>
							Send
						</Button>
					</Stack>
				</form>
			</Box> */}
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/form" element={<FormPage />} />
				<Route path="/requests" element={<RequestsPage />} />
			</Routes>
		</div>
	);
};
