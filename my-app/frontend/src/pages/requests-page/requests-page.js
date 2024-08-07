import { Alert, Box, Collapse, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import {SERVER, PORT} from '../../consts'
import {useNavigate} from 'react-router-dom'

const columns = [
	{
		field: 'date',
		headerName: 'Дата отправки',
		width: 200,
		headerClassName: 'super-app-theme--header',
		align: 'center',
		headerAlign: 'center'
	},
	{
		field: 'name',
		headerName: 'ФИО',
		width: 250,
		headerClassName: 'super-app-theme--header',
		align: 'center',
		headerAlign: 'center'
	},
	{
		field: 'phone',
		headerName: 'Телефон',
		width: 150,
		headerClassName: 'super-app-theme--header',
		align: 'center',
		headerAlign: 'center'
	},
	{
		field: 'request',
		headerName: 'Проблема',
		sortable: false,
		width: 300,
		headerClassName: 'super-app-theme--header',
		align: 'center',
		headerAlign: 'center'
	},
];




export const RequestsPage = () => {
	const [requests, setRequests] = useState([])
	const [error, setError] = useState(false)
	const navigate = useNavigate()


	useEffect(() => {
		fetch(`${SERVER}${PORT}/requests`,{
      credentials: 'include',
    })
			.then(resp => {
				if (!resp.ok) {
					setError(true)
					return;
				}
				return resp.json();
			})
			.then(data => {
				if (data.error) {
					setError(true)
					return navigate('/login');;
				}
				setRequests(data);
			})
			.catch((e)=>console.log(e));
	}, [navigate]);


	return (
		<div className="App">
			<Box
				height={500}
				width={900}
				my={4}
				display="flex"
				alignItems="center"
				flexDirection="column"
				justifyContent="center"
				gap={4}
				p={2}
				sx={{
					border: '2px solid grey',
					borderRadius: '15px',
					'& .super-app-theme--header': {
						backgroundColor: '#282c34',
					},
				}}
			>
				{error ? 	<Collapse in={error} unmountOnExit>
					<Alert severity="error" variant="outlined" sx={{ color: 'red' }}>
						Ошибка загрузки списка
					</Alert>
				</Collapse> : requests.length !== 0 ? <DataGrid
					sx={{ width: '900px', color: 'grey' }}
					rows={requests}
					getRowId={(row) => row.id || row._id}
					columns={columns}
					alignItems="center"
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 10 },
						},
					}}
				/> : <Typography color="grey">Заявок нет</Typography>}
			</Box>
		</div>
	);
};
