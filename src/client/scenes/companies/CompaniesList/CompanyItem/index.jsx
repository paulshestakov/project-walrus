import React from 'react';
import {translate} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Grid, Button, Title, Label, Textarea, TextField, Input, Text} from 'components';
import {withStyles} from 'material-ui/styles';
import Card, {CardMedia, CardContent} from 'material-ui/Card';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import styles from './styles';
import {Paper} from "material-ui";
import ModeEditIcon from 'material-ui-icons/ModeEdit';


@translate(['companiesList'])
@withStyles(styles)
export default class CompanyItem extends React.Component {
	render() {
		const {t, classes, className, company, ...other} = this.props;
        const imageSrc = company.logo ? company.logo : '';

		return (
			<Card className={classNames(classes.card, 'mt-3', 'p-4')}>
				<Link to={`/company/${company.id}`}>
					<Paper>
						<CardMedia className={classes.cardImage} image={imageSrc} />
					</Paper>
				</Link>

				<CardContent className={classNames(classes.cardContent, 'p-0', 'pl-4')}>
					<div className={classNames(classes.flexRow, classes.spaceBetween)}>
						<Label uppercase bold fontSize="2rem">{company.name}</Label>

						<Button fab className={classes.editButton}>
							<Link to={`/company/edit/${company.id}`}>
								<ModeEditIcon className={classes.editIcon} />
							</Link>
						</Button>
					</div>

					<div className={classNames(classes.flexRow, 'mt-2')}>
						{
							company.locations.map(location => {
								return (
									<div key={location.id} className={classes.flexRow}>
										<FontAwesome name="map-marker" className={classes.icon} />
										<Text>{location.cityName + ': ' + location.address}</Text>
									</div>
								);
							})
						}
					</div>

					<div className={classNames(classes.flexRow, 'mt-2')}>
						<FontAwesome name="globe" className={classes.icon} />
						<Text>{company.websiteUrl}</Text>
					</div>

					<div className={classNames(classes.flexRow, 'mt-2')}>
						<FontAwesome name="phone" className={classes.icon} />
						<Text>{company.phones ? company.phones.map(item => item.phone).join(', ') : 'Телефонов нет'}</Text>
					</div>

					<div className={classes.buttonsBlock}>
						<Button className="mr-2 text-white" accent="white"
							onClick={this.props.handleOpenWorkingTimeDialog.bind(null, company.daysOfWeekWorkingTime)}>
							{t('WORKING_TIME')}
						</Button>
						<Button className="mr-2 text-white" accent="red">
							{t('CALL')}
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}
}
