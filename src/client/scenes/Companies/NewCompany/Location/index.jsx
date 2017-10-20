import React from 'react';
import { Add } from 'material-ui-icons';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import styles from './styles';
import { PlusOne } from 'material-ui-icons';
import SwipeableViews from 'react-swipeable-views';
import {Divider, Typography, Paper} from "material-ui";

import { Field, Fields, FieldArray } from 'redux-form'
import WorkingTimes from "./WorkingTimes/index";
import Phones from "./Phones/index";


@translate(['common'])
@withStyles(styles)
export default class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            subways: [],
            selectedAddress: 0,
            markers: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cities: nextProps.cities
        });
    }

    handleTabPress = (event, index) => {
        this.setState({ selectedAddress: index });
    };

    handleMapLocation = (location) => {
        if (location) {
            this.state.markers.splice(0, 1, location[0]);
            this.props.fields.get(this.state.selectedAddress).location = location[0].position;
        }
    };

    handleCityChange = (event, item) => {
        this.setState({
            subways: this.state.cities.find(i => i.value === item.value).subways
        });
    };

    render() {
        const {t, classes, fields, daysOfWeek, ...other} = this.props;
        return (
            <div>
                <Grid item xs={8}>
                    <Grid item className="d-flex align-items-center">
                        <Typography type="headline" component="h1" className="mt-4 mr-4">
                            Местоположение
                        </Typography>
                        <Button fab onClick={() => fields.push({label: `Адрес ${fields.length + 1}`})}
                                color="primary" aria-label="add">
                            <Add />
                        </Button>
                    </Grid>
                </Grid>

                <Tabs
                    value={this.state.selectedAddress}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollable
                    onChange={this.handleTabPress}
                    fullWidth>
                    {
                        fields.map((field, index, fields) => {
                            const curField = fields.get(index);
                            return (
                                <Tab
                                    className={classes.tab}
                                    key={field}
                                    label={curField.label}
                                    value={index}/>
                            );
                        })
                    }
                </Tabs>
                <SwipeableViews
                    index={this.state.selectedAddress}
                    onChangeIndex={this.handleTabPress}>
                    {
                        fields.map((member, index) => (
                            <Grid container spacing={0} className="p-2">
                                <Grid item xs={12} className="my-2">
                                    <Title>Город</Title>
                                    <Field name={`${member}.city`}
                                           component={Dropdown}
                                           onChange={this.handleCityChange}
                                           options={this.state.cities}/>
                                </Grid>
                                <Grid item xs={12} className="my-2">
                                    <Title>Метро</Title>
                                    <Field name={`${member}.subway`}
                                           component={Dropdown}
                                           options={this.state.subways}/>
                                </Grid>

                                <Grid item xs={12} className="my-2">
                                    <Title>Адрес</Title>
                                    <Field
                                        name={`${member}.address`}
                                        component={Input}
                                        placeholder="Адрес"
                                        fullWidth/>
                               </Grid>

                                <Grid item xs={12} className="my-2">
                                    <Title className="mb-2">Карта</Title>
                                    <Map search
                                         markers={this.state.markers}
                                         center={{lat: 53.9, lng: 27.5 }}
                                         onMarkersChanged={this.handleMapLocation}/>
                                </Grid>

                                <FieldArray
                                    name={`${member}.phones`}
                                    component={Phones}
                                    fullWidth/>

                                <Grid item xs={12} className="my-2">
                                    <Typography type="headline" component="h1" className="mt-4">
                                        Время работы
                                    </Typography>
                                </Grid>

                                <FieldArray
                                    name={`${member}.workingTimes`}
                                    daysOfWeek={daysOfWeek}
                                    component={WorkingTimes}/>

                            </Grid>
                        ))
                    }
                </SwipeableViews>
            </div>
        );
    }
}