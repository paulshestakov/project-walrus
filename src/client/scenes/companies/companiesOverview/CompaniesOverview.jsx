import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import { Pets, Extension, ShoppingCart, Healing, Favorite, Assignment } from 'material-ui-icons';
import SwipeableViews from 'react-swipeable-views';
import styles from './styles';
import Category from "./Type";
import {Paper} from "material-ui";


@translate(['common'])
@withStyles(styles)
export default class CompaniesOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTabIndex: 0
		}
	}

	componentDidMount() {
		this.props.loadCompaniesTypes();
	}

    componentWillReceiveProps(nextProps) {
        const params = new URLSearchParams(nextProps.location.search);
        const category = params.get('category');
        let categoryIndex = 0;
        if (category && nextProps.common.companiesTypes) {
        	nextProps.common.companiesTypes.forEach((type, index) => {
        		if (type.companyTypeId === category) {
                    categoryIndex = index;
				}
			});
		}
		this.setState({ selectedTabIndex: categoryIndex });
	}

	handleTabPress = (event, index) => {
        const params = new URLSearchParams(this.props.location.search);
        params.set('category', this.props.common.companiesTypes[index].companyTypeId);
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: params.toString()
        });
	};

	render() {
		const {t, classes, match, common, ...other} = this.props;

		return (
			<Card className="mt-4">
				<Paper>
					<Tabs
						indicatorColor="primary"
						textColor="primary"
						value={this.state.selectedTabIndex}
						onChange={this.handleTabPress}
						fullWidth>
                        {
                            common.companiesTypes && common.companiesTypes.map((type, index) => {
                                let icon;
                                if (index === 0) {
                                    icon = <Healing />;
                                } else if (index === 1) {
                                    icon = <Favorite />;
                                } else if (index === 2) {
                                    icon = <ShoppingCart />
                                } else if (index === 3) {
                                    icon = <Pets/>;
                                } else if (index === 4) {
                                    icon = <Assignment />;
                                } else {
                                    icon = <Extension />
                                }
                                return (
									<Tab label={type.companyTypeName} icon={icon} />
                                );
                            })
                        }
					</Tabs>
				</Paper>
				<SwipeableViews index={this.state.selectedTabIndex} onChangeIndex={this.handleChangeIndex}>
				{
                    common.companiesTypes && common.companiesTypes.map(type => {
						return (
							<Category type={type} location={location}/>
						);
                    })
				}
				</SwipeableViews>
			</Card>
		);
	}
}