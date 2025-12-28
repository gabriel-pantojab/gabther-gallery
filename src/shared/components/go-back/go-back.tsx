import BackIcon from '@/components/icons/BackIcon';
import style from './go-back.module.css';
import { useNavigate } from 'react-router-dom';

export function GoBack(): JSX.Element {
	const navigate = useNavigate();

	const goBack = (): void => {
		navigate(-1);
	};

	return (
		<button onClick={goBack} className={style.goBack}>
			<BackIcon />
		</button>
	);
}
