import React from 'react';
import { translate } from 'react-i18next';

import { FormControl } from 'react-bootstrap';
import Separator from '../../../reusableComponents/separator/Separator';
import Title from '../../../reusableComponents/title/Title.jsx';
import Input from '../../../reusableComponents/input/Input';

@translate(['newPromo'])
class FoundPromo extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<div>
				<Separator className="my-3"/>

				<Title text={t('PROMO_NAME')} className="mt-5"/>
				<Input name="promoName" placeholder={t('ENTER_PROMO_NAME')} />

				<Title text={t('CITY')} className="mt-5" />
				<Input name="city" placeholder={t('ENTER_CITY')} />

				<Title text={t('FOUND_ADDRESS')} className="mt-5" />
				<Input name="foundAddress" placeholder={t('ENTER_FOUND_ADDRESS')} />

				<Title text={t('FOUND_TIME')}  className="mt-4"/>
				<Input name="foundTime" placeholder={t('ENTER_FOUND_TIME')} />

				<Title text={t('GENDER')} className="mt-4" />
				<FormControl name="gender" componentClass="select" placeholder={t('SELECT_GENDER')}>
					<option value="BOY">{t('BOY')}</option>
					<option value="GIRL">{t('GIRL')}</option>
				</FormControl>

				<Title text={t('APPROXIMATE_AGE')} className="mt-4" />
				<Input name="approximateAge" placeholder={t('ENTER_APPROXIMATE_AGE')} />

				<Title text={t('DESCRIPTION')} className="mt-4" />
				<Input name="description" placeholder={t('ENTER_DESCRIPTION')} />

				<Title text={t('YOUR_NAME')} className="mt-4" />
				<Input name="personName" placeholder={t('ENTER_YOUR_NAME')} />

				<Title text={t('YOUR_PHONE')} className="mt-4" />
				<Input name="personPhone" placeholder={t('ENTER_YOUR_PHONE')} />

			</div>
		);
	}
}

export default FoundPromo;

