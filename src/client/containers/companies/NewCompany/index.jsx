import React from 'react';
import {connect} from 'react-redux';

import {postCompany, updateCompany, loadCompany} from "./actions";

import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';

import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map, ConfirmDialog } from "components";

import styles from './styles';
import {Divider, Typography, Paper} from "material-ui";

import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import Location from "./components/Location/index";
import Animals from "./components/Animals/index";


@translate(['common'])
@withStyles(styles)
@reduxForm({form: 'company', enableReinitialize: true})
class NewCompanyContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			imageObjects: [],
			categories: [],
			subcategories: [],
			renderAnimals: false,
			renderBreeds: false,
			selectedAddress: 0,
			showConfirm: false,
		};
	}

	componentDidMount() {
		if (this.props.editMode) {
			const companyId = this.props.match.params.companyId;
			this.props.loadCompany(companyId);
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			categories: nextProps.common.companiesCategories,
			cities: nextProps.common.cities,
            renderAnimals: this.isAnimalAvailable(nextProps),
            renderBreeds: this.isBreedAvailable(nextProps)
		});
	}

	handleCategoryChange = (selected) => {
		const category = this.state.categories.find((category) => {
			return category.value === selected.value;
		});
		this.props.change('subcategoryId', null);
        this.props.change('animals', []);
		this.setState({
			subcategories: category.subcategories,
		});
	};

	handleSubcategoryChange = () => {
        this.props.change('animals', []);
    };

	onCancelPressed = () => {
		this.props.history.goBack();
	};

	openConfirmDialog = () => {
		this.setState({ showConfirm: true });
	};

	saveAction = (values) => {
		const { imageObjects } = this.state;
		values.image = imageObjects && imageObjects.length > 0 ? this.state.imageObjects[0].file : null;
		values.locations.forEach(location => {
		    delete location.label;
        });

		if (this.props.editMode) {
			this.props.updateCompany(this.props.match.params.companyId, values, this.props.history);
		} else {
			this.props.postCompany(values, this.props.history);
		}
	};

	isAnimalAvailable = (props) => {
	    return ['ZOO_NURSERIES', 'ZOO_SHOPS'].includes(props.selectedSubCategory)
            || ['SERVICES'].includes(props.selectedCategory);
    };

	isBreedAvailable = (props) => {
	    return ['ZOO_NURSERIES', 'ZOO_SHOPS'].includes(props.selectedSubCategory);
    };

	render() {
		const { t, classes, common, handleSubmit } = this.props;

		return (
            <form className="d-flex-column align-items-center my-4">
                <Card raised>
                    <Grid container justify="center" spacing={24}>

                        <Grid item xs={11}>
                            <Typography type="headline" component="h1" className="mt-4">
                                Основная информация
                            </Typography>
                        </Grid>

                        <Grid item xs={11}>
                            <Title>Название</Title>
                            <Field name="name"
                                   component={Input}
                                   fullWidth
                                   placeholder="Название компании"/>
                        </Grid>
                        <Grid item xs={11}>
                            <Title>Категория</Title>
                            <Field name="categoryId"
                                   component={Dropdown}
                                   options={this.state.categories}
                                   onChange={this.handleCategoryChange}
                                   format={value => this.state.categories.find(x => x.value === value)}
                                   normalize={value => value.value}
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <Title>Подкатегория</Title>
                            <Field name="subcategoryId"
                                   component={Dropdown}
                                   options={this.state.subcategories}
                                   onChange={this.handleSubcategoryChange}
                                   format={value => this.state.subcategories.find(x => x.value === value)}
                                   normalize={value => value.value}
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <FieldArray
                                name="animals"
                                animals={this.props.common.animals}
                                renderAnimals={this.state.renderAnimals}
                                renderBreeds={this.state.renderBreeds}
                                component={Animals}/>
                        </Grid>
                        <Grid item xs={11}>
                            <Title>Картинка лого</Title>
                            <Field name="image"
                                   type="file"
                                   component={ImageUploader}
                                   imageObjects={this.state.imageObjects}
                                   onImageAdd={(object) => this.setState({ imageObjects: [object] })}
                                   onImageDelete={() => this.setState({ imageObjects: [] })} />
                        </Grid>

                        <Grid item xs={11}>
                            <Title>Описание</Title>
                            <Field name="description"
                                   component={Input}
                                   multiline
                                   rowsMax="20"
                                   placeholder="Описание"
                                   fullWidth/>
                        </Grid>
                        <Grid item xs={11}>
                            <Title>Сайт компании</Title>
                            <Field name="url"
                                   component={Input}
                                   placeholder="Сайт"
                                   fullWidth/>
                        </Grid>
                        <Grid item xs={11}>
                            <Title>Email</Title>
                            <Field name="email"
                                   component={Input}
                                   placeholder="Email"
                                   fullWidth/>
                        </Grid>

                        <Grid item xs={11}>
                            <FieldArray
                                name="locations"
								{...common}
                                component={Location}/>
                        </Grid>

                        <Grid container justify="center" className="my-3">
                            <Grid item xs={4} className="text-center">
                                <Button type="button"
                                        onClick={this.openConfirmDialog}
                                        className="my-4 text-white w-100"
                                        accent="blue">
									{t('Сохранить')}
                                </Button>
                            </Grid>
                            <Grid item xs={4} className="text-center">
                                <Button className="my-4 text-white w-100"
                                        onClick={this.onCancelPressed}
                                        accent="red">
									{t('Отмена')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
                <ConfirmDialog
                    open={this.state.showConfirm}
                    message="Вы действительно хотите сохранить введенные данные?"
                    title="Сохранение компании"
                    okCallback={handleSubmit(this.saveAction)}
                    closeCallback={() => this.setState({ showConfirm: false })}/>
            </form>
		);
	}
}

const NewCompany = connect(
    state => ({
        common: state.common,
        // new: state.newCompany,
        initialValues: state.newCompany.company,
        selectedCategory: formValueSelector('company')(state, 'categoryId'),
        selectedSubCategory: formValueSelector('company')(state, 'subcategoryId'),
    }),
    {
        postCompany,
        updateCompany,
        loadCompany
    }
)(NewCompanyContainer);

export default NewCompany;