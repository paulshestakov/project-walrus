import React from 'react';
import DropdownLib from "react-dropdown";

import './styles.scss';

class Dropdown extends React.Component {

    constructor(props) {
        super(props);
        let selected = this.props.selectedOption;
        this.state = {
          selected : selected ? selected : {}
        };
    }

    adjustOptions() {
        let options;
        if (this.props.options) {
            options = this.props.options.map(option => {
                return {
                    value: option.id,
                    label: option.name
                }
            });
        } else {
            options = [];
        }
        if (this.props.pushAll) {
            options.unshift({value: 'ALL', label: 'Все'});
        }
        return options;
    }

    onChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        this.setState({selected: e});
    };

    render() {
        let options = this.adjustOptions();

        let selected = this.state.selected.value;
        let selectedOptionLabel = options.find(item => item.value === (selected ? selected : this.state.selected));
        selectedOptionLabel = selectedOptionLabel ? selectedOptionLabel : options[0];


        return (
            <div className={this.props.className}>
                <DropdownLib
                    options={options}
                    name={this.props.name}
                    onChange={this.onChange.bind(this)}
                    value={selectedOptionLabel} />
            </div>
        );
    }
}

export default Dropdown;