import React from 'react';
import { translate } from 'react-i18next';

import { FormControl } from 'react-bootstrap';
import Separator from '../../../components/separator/Separator';
import Title from '../../../components/title/Title.jsx';
import Input from '../../../components/input/Input';
import ImageUploader from 'imageUploader/ImageUploader';
import DateTimePicker from "../../../components/input/DateTimePicker";

@translate(['newPromo'])
class FoundPromo extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<div>
				<Title text={t('FOUND_ADDRESS')} className="mt-5" />
				<Input name="address" placeholder={t('ENTER_FOUND_ADDRESS')} />

				<Title text={t('FOUND_TIME')}  className="mt-4"/>
				<DateTimePicker name="date" locale="ru" placeholder={t('ENTER_FOUND_TIME')} />


				<Title text={t('GENDER')} className="mt-4" />
				<FormControl name="gender" componentClass="select" placeholder={t('SELECT_GENDER')}>
					<option value="m">{t('BOY')}</option>
					<option value="f">{t('GIRL')}</option>
				</FormControl>

				<Title text={t('APPROXIMATE_AGE')} className="mt-4" />
				<Input name="age" placeholder={t('ENTER_APPROXIMATE_AGE')} />

                {/*
				 	<Input name="date" placeholder={t('ENTER_FOUND_TIME')} />
					<Title text={t('YOUR_NAME')} className="mt-4"/>
                    < Input name="personName" placeholder={t('ENTER_YOUR_NAME')} />

                    <Title text={t('YOUR_PHONE')} className="mt-4" />
                    <Input name="personPhone" placeholder={t('ENTER_YOUR_PHONE')} />
                */}
			</div>
		);
	}
}

export default FoundPromo;

